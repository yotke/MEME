'use strict'


var gSavedImg=[];
var gElCanvas;
var gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gIsDown = false;
var gTextClicked = true;
var gPos = { x: 0, y: 50 };


function toggleMenu() {
    document.body.classList.toggle('menu-open');
}


function onInit() {
    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');
    var imgs = getImgs();
    renderPicturesToGallery(imgs);

}
// RENDER CLEAN CANVAS AND INSERT THE PHOTO WITCH THE USER CHOOSED LAST.

function renderCanvas() {
    let meme = getMeme()
    gCtx.save()
    gCtx.fillStyle = "white"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    const img = new Image();
    img.src = `imgs/${meme.selectedImgId}.jpg`;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderLines();
    gCtx.restore()
}

// RENDER ALL TEXTS WITCH IS IN THE LINES ARRAY.

function renderLines() {
    let meme = getMeme();
    meme.lines.forEach(line => {
        renderLine(line);
    });
}

// RENDER GIVEN LINE.
function renderLine(line) {
    gCtx.font = line.size + 'px' + ' ' + line.style;
    gCtx.fillStyle = line.color;
    const y = line.pos.y;
    var x ;
    var textWidth = gCtx.measureText(line.txt).width;
    if (line.align === 'left') x = line.pos.x;
    else if (line.align === 'middle') x = line.pos.x + 400 - textWidth;
    else if (line.align === 'right') x = line.pos.x + 540 - textWidth;
    gCtx.fillText(line.txt, x, y)
    updateTextWidth(line, textWidth);
}


// RENDER ALL KIND OF PICTURE TO OUR GALLERY.
function renderPicturesToGallery(imgs) {
    var elImgContainer = document.querySelector('.photo-container');
    elImgContainer.innerHTML='';
    for (let i = 0; i < imgs.length; i++) {
        elImgContainer.innerHTML += `<a href="#editor" class="photo" onclick="onSetPicInCanvas(this,${imgs[i].id})"><img src="${imgs[i].url}" alt=""></a>`
    }
}


// RENDER IMOJIS TO IMOJI CONTAINER.

function renderImojis() {
    // var elImojiContainer = document.querySelector('.emoji-container')
    // var strHTML = '';
    // console.log('woww');
    // emojis.forEach(emoji => {
    //     strHTML += `<button class="button-imoji" onclick="renderEmojiToCanvas()">${emoji}</button>`
    // });
    // elImojiContainer.innerHTML = strHTML;
}

// RENDER SAVED MEMES TO SAVED GALLERY
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


// CALL RENDER AND RENDER THE PICTIRES FILTERED BY THE KEYWORD.

function setSearchText(keywords = 'all') {
    var imgs = setSearchTextService(keywords);
    renderPicturesToGallery(imgs);
}


// ACTIVE MODE CHANGES BETWEEN GALLERY EDITOR SAVE.

function changeActive(el) {
    var elLinks = document.querySelectorAll('.nav-bar a');
    elLinks.forEach(elLink => {
        elLink.classList.remove('active');
    });
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
    var elSectionLink = document.querySelector('[name=editor]');
    setMeme(imgId, 'Lorem ipsum dolor sit amet');
    changeActive(elSectionLink);
    renderCanvas();
    renderImojis();
    addListeners();
}



// WHEN A LINE IS INSERT WE CHANGE THE LINE TO NEW KIND OF LINE.

function drawInputText(elInput) {
    var meme = getMeme();
    if (!meme || meme.lines === []) {
        return;
    }
    if (gTextClicked === true) {
        //CLEAR JUST THIS CANVAS TEXT
        meme.lines[meme.selectedLineIdx].txt = elInput.value;
    }
    else {
        setNewTextLine(elInput.value)
        gTextClicked = true;
    }
    renderCanvas();
}

function onChangeCanTxtInput(elInput) {
    elInput.value = '';
    gTextClicked = false;
    const meme = getMeme();
    meme.selectedLineIdx = '';

}

// CHECK BORDERS OF LINES IN THE TEXT.
function checkBorders() {
    return gElCanvas.width > gPos.x && gElCanvas.height > gPos.y;
}


// SET NEW LINE IN THE POS AND VAL GIVEN AND CREATE NEW LINE.

function setNewTextLine(val = 'Lorem ipsum dolor sit amet') {
    gPos = { x: gPos.x, y: gPos.y + 150 };
    if (!checkBorders() === true) gPos = { x: 0, y: 50 };
    insertNewLine(val, gPos);
}


// ON CLICKED BUTTONS OR INPUT INSERT.

function onFontMagnifing() {
    const meme = getMeme();
    const idx = meme.selectedLineIdx;
    meme.lines[idx].size += 1;
    renderCanvas()
}


function onFontReduce() {
    const meme = getMeme();
    const idx = meme.selectedLineIdx;
    meme.lines[idx].size -= 1;
    renderCanvas()

}

function onFontLeft() {
    const meme = getMeme();
    const idx = meme.selectedLineIdx;
    meme.lines[idx].align = 'left';
    renderCanvas()

}

function onFontMid() {
    const meme = getMeme();
    const idx = meme.selectedLineIdx;
    meme.lines[idx].align = 'middle';
    renderCanvas()
}

function onFontRight() {
    const meme = getMeme();
    const idx = meme.selectedLineIdx;
    meme.lines[idx].align = 'right';
    renderCanvas()

}

function onMoveUp() {
    const meme = getMeme();
    const idx = meme.selectedLineIdx;
    meme.lines[idx].pos.y -= 1;
    renderCanvas()
}

function onMoveDown() {
    const meme = getMeme();
    const idx = meme.selectedLineIdx;
    meme.lines[idx].pos.y += 1;
    renderCanvas()

}

function onChooseColor(color) {
    const meme = getMeme();
    const idx = meme.selectedLineIdx;
    meme.lines[idx].color = color;
    renderCanvas()

}

function onTrashPush() {
    const meme = getMeme();
    const idx = meme.selectedLineIdx;
    meme.lines.splice(idx, 1);
    renderCanvas()

}

function onPlasPush() {
    const meme = getMeme();
    setNewTextLine();
    gTextClicked=true;
    renderCanvas()

}

function onSave() {
    save();
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

function onChangeSelect(){
    const meme = getMeme();
    !meme.selectedLineIdx?meme.selectedLineIdx=0:meme.selectedLineIdx+=1;
    SetborderSelectedItem()
    var posVec = getBoderBoxPos();
    renderCanvas();
    drawRectangle(posVec);
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
    gCtx.fillStyle = color;
    gCtx.strokeStyle = color;
    gCtx.stroke()
}

