'use strict'


const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gIsDown = false;
var gTextClicked = true;

var gElImg;
var gSavedImg = [];

var gPos = { x: 0, y: 50 };
var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');
    renderPicturesToGallery();
    addListeners();
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function renderCanvas() {
    gCtx.save()
    gCtx.fillStyle = "white"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.restore()
}


function renderSaves() {
    var elSavedContainer = document.querySelector('.saved-memes-container');
    var elCanvas = document.querySelector('#canvas-saved');
    var ctx = elCanvas.getContext('2d');
    ctx.fillStyle = '#e3e3e3';
    ctx.fillRect(0, 0, elCanvas.width, elCanvas.height)
    var placeIdx = 1;
    gSavedImg.forEach(img => {
        ctx.putImageData(img, 20 * placeIdx, 30);
        placeIdx += 30;
    });


}


// RENDER ALL KIND OF PICTURE TO OUR GALLERY.
function renderPicturesToGallery(imgsGl) {
    var imgs;
    if (imgsGl) {
        console.log('imgsGl',imgsGl);
        imgs = imgsGl;
    }
    else {
        imgs = getImgs()
    }
    var elImgContainer = document.querySelector('.photo-container');
    elImgContainer.innerHTML = '';
    for (let i = 0; i < imgs.length; i++) {
        elImgContainer.innerHTML += `<a href="#editor" class="photo" onclick="onSetPicInCanvas(this,${imgs[i].id})"><img src="${imgs[i].url}" alt=""></a>`
    }
}

function setSearchText(keywords) {
    console.log('yes it is');

    var imgs = setSearchTextService(keywords);
    console.log('imgs', imgs);
    renderPicturesToGallery(imgs);
}




// ACTIVE MODE CHANGES BETWEEN GALLERY EDITOR SAVE.

function changeActive(el) {
    var elLinks = document.querySelectorAll('.nav-bar a');
    elLinks.forEach(elLink => {
        elLink.classList.remove('active');
    });
    console.log('el', el);
    el.classList.add('active');
    const elSections = document.querySelectorAll('section');
    elSections.forEach(elSection => {
        elSection.classList.add('hidde')
    });
    const elSection = document.querySelector(`#${el.name}`);
    elSection.classList.remove('hidde');
}





// WHEN ONE OF THE PICTURES IS CLICKED WE CHANGE THE ACTIVE SCREEN TO 
// EDIT SCREEN AND START OUR GAME FOR REAL. ;)

function onSetPicInCanvas(el_a, imgId) {
    var elLink = document.querySelector('[name=editor]');
    gElImg = el_a.firstChild;
    changeActive(elLink);
    renderCanvas();
    gCtx.drawImage(gElImg, 0, 0, gElCanvas.width, gElCanvas.height)
    setMeme(imgId, 'Lorem ipsum dolor sit amet');
    renderCleanCanvas();
    renderTexts();
}


// WHEN A LINE IS INSERT WE CHANGE THE LINE TO NEW KIND OF LINE.

function onChangeCanTxtInput(val) {
    var meme = getMeme();
    if (!meme || meme.lines === []) {
        setMeme(imgId, val);
    }
    if (gTextClicked === true) {
        var currLine = getCurrLine();
        //CLEAR JUST THIS CANVAS TEXT
        renderCleanCanvas();
        meme.lines[currLine].txt = val;
        gTextClicked = false;
    }
    else {
        setNewTextLine(val)
    }

    renderTexts();
}

// RENDER CLEAN CANVAS AND INSERT THE PHOTO WITCH THE USER CHOOSED LAST.
function renderCleanCanvas() {
    gCtx.save()
    gCtx.fillStyle = "white"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(gElImg, 0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.restore()
}


// RENDER ALL TEXTS WITCH IS IN THE LINES ARRAY.

function renderTexts() {
    let meme = getMeme();
    meme.lines.forEach(line => {
        renderLine(line);
    });
}


// SET NEW LINE IN THE POS AND VAL GIVEN AND CREATE NEW LINE.

function setNewTextLine(val = 'Lorem ipsum dolor sit amet') {
    gPos = { x: gPos.x, y: gPos.y + 150 };
    if (!checkBorders() === true) gPos = { x: 0, y: 50 };
    insertNewLine(val, gPos);
}



// RENDER GIVEN LINE.
function renderLine(line) {
    gCtx.font = line.size + 'px' + ' ' + line.style;
    gCtx.fillStyle = line.color;
    var y = line.pos.y;
    var x;
    var textWidth = gCtx.measureText(line.txt).width;
    if (line.align === 'left') x = line.pos.x;
    else if (line.align === 'middle') x = line.pos.x + 400 - textWidth;
    else if (line.align === 'right') x = line.pos.x + 540 - textWidth;
    gCtx.fillText(line.txt, x, y)
    var textWidth = gCtx.measureText(line.txt).width;
    updateTextWidth(line, textWidth);
}


// CHECK BORDERS OF LINES IN THE TEXT.
function checkBorders() {
    return gElCanvas.width > gPos.x && gElCanvas.height > gPos.y;
}


function onFontMagnifing() {
    var meme = getMeme();
    var idx = getCurrLine();
    meme.lines[idx].size += 1;
    renderCleanCanvas();
    renderTexts();

}


function onFontReduce() {
    var meme = getMeme();
    var idx = getCurrLine();
    meme.lines[idx].size -= 1;
    renderCleanCanvas();
    renderTexts();
}



function onFontLeft() {
    let meme = getMeme();
    let idx = getCurrLine();
    meme.lines[idx].align = 'left';
    renderCleanCanvas();
    renderTexts();

}

function onFontMid() {
    let meme = getMeme();
    let idx = getCurrLine();
    meme.lines[idx].align = 'middle';
    renderCleanCanvas();
    renderTexts();
}

function onFontRight() {
    let meme = getMeme();
    let idx = getCurrLine();
    meme.lines[idx].align = 'right';
    renderCleanCanvas();
    renderTexts();
}

function onMoveUp() {
    let meme = getMeme();
    let idx = getCurrLine();
    meme.lines[idx].pos.y -= 1;
    renderCleanCanvas();
    renderTexts();
}
function onMoveDown() {
    let meme = getMeme();
    let idx = getCurrLine();
    meme.lines[idx].pos.y += 1;
    renderCleanCanvas();
    renderTexts();
}

function onChooseColor(color) {
    let meme = getMeme();
    let idx = getCurrLine();
    meme.lines[idx].color = color;
    renderCleanCanvas();
    renderTexts();


}

function onTrashPush() {
    let meme = getMeme();
    let idx = getCurrLine();

    meme.lines.splice(idx, 1);
    renderCleanCanvas();
    renderTexts();
}

function onPlasPush() {
    let meme = getMeme();
    setNewTextLine();
    renderCleanCanvas();
    renderTexts();
}

function onSave() {
    save();
    // renderSaves();
    var saved_rect = gCtx.getImageData(0, 0, 550, 550);
    console.log('saved_rect', saved_rect);
    gSavedImg.push(saved_rect);
    renderSaves()
}


function onDownload(elLink) {
    elLink.download = `saved-imgs/${++gCountImg}`;
    console.log('okkk you try to save');
    downloadImg(elLink)
}



function onPushSearchesBtn(elBtn){
    if(!elBtn.style.fontSize){
        elBtn.style.fontSize ='2rem'
    }
    else{
        console.log('elBtn.style.fontSize',parseInt(elBtn.style.fontSize));
        var size =parseInt(elBtn.style.fontSize)+1;
        elBtn.style.fontSize = size+'rem'
    }
    setSearchText(elBtn.innerText);
}


function downloadImg(elLink) {
    console.log('elLink', elLink);
    var imgContent = gElCanvas.toDataURL('')
    elLink.href = imgContent
}

// HELPER TO CREATE BOX AROUND TEXT LINES.
function drawRectangle(pos, color = 'white', pattern = [20, 3, 3, 3, 3, 3, 3, 3]) {
    gCtx.beginPath();
    gCtx.lineWidth = 6;
    gCtx.setLineDash(pattern);
    gCtx.moveTo(pos.p1.x1, pos.p1.y1);
    gCtx.lineTo(pos.p2.x1, pos.p2.y2);
    gCtx.lineTo(pos.p3.x2, pos.p3.y2)
    gCtx.lineTo(pos.p4.x2, pos.p4.y1)
    gCtx.lineTo(pos.p1.x1, pos.p1.y1)
    // gCtx.closePath()
    gCtx.fillStyle = color;

    // gCtx.fill();
    gCtx.strokeStyle = color;
    gCtx.stroke()
}







// function renderSaves(){
//     var elSavedContainer = document.querySelector('.saved-memes-container');
//     // elSavedContainer

//     var savedMemes = laod()
//     savedMemes.forEach(meme=>{
//         var elImg = '<div class="saved-img">'
//         meme.lines.forEach(line=>{
//             elImg+=`<tr><td></td>`
//         });
//         elSavedContainer.innerHTML += ``
//     });
//     var img = getImgByID()


//     elImg.style.backgroundImage = `url(${img.url})`;


// }