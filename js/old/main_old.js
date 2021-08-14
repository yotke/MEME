'use strict'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gIsDown = false;
var gTextClicked = false;
var gLines;
var gElCanvas;
var gCtx;

function onInit() {
    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');
    renderPictures();
    addListeners();
}

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



function toggleMenu() {
    document.body.classList.toggle('menu-open');
}



function renderPictures() {
    var imgs = getImgs()
    var elImgContainer = document.querySelector('.photo-container');
    elImgContainer.innerHTML = `<a href="#editor" class="photo" onclick="putToCanvas(this,${imgs[0].id})"><img src="${imgs[0].url}" alt=""></a>`
    elImgContainer.innerHTML += `<a href="#editor" class="photo" onclick="putToCanvas(this)"><img src="imgs/2.jpg" alt=""></a>`
    elImgContainer.innerHTML += `<a href="#editor" class="photo" onclick="putToCanvas(this)"><img src="imgs/3.jpg" alt=""></a>`


}


function putToCanvas(el, id) {
    var elLink = document.querySelector('[name=editor]');
    changeActive(elLink);
    paintToCanvas(el.firstChild);
    var Meme = setMeme(id, '', el.firstChild)
    // setImageText(Meme);
}


function paintToCanvas(elImg) {
    renderCanvas();
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

}


function renderCanvas() {
    gCtx.save()
    gCtx.fillStyle = "#ede5ff"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.restore()
}


function setImageText(Meme) {

}




function onClickCanvasTextInput(val) {

    var meme = getMeme(); 
    if (gTextClicked === true) {
        console.log('meme.elImg',meme.elImg);
        paintToCanvas(meme.elImg);
    }
    console.log('val', val);

    meme.lines[0].txt = val
    gCtx.font = meme.lines[0].size + 'px' + ' Arial';
    gCtx.fillStyle = meme.lines[0].color;
    gCtx.fillText(val, 0, 50)
    var textWidth = gCtx.measureText("My String").width;
    setTextWidth(textWidth * 2.1);
}





function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}


function onDown(ev) {
    const pos = getEvPos(ev)
    gIsDown = true;
    if (!isTextClicked(pos)) {
        gTextClicked = false;
        return
    }
    gTextClicked = true;
    console.log('ok you clicked on the text');

    document.body.style.cursor = 'progress'

}


function onMove(ev) {
    if (gIsDown) {
    }
}

function onUp() {
    gIsDown = false;
    // setCircleDrag(false)
    document.body.style.cursor = 'auto'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}