'use strict'


const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gIsDown = false;
var gTextClicked = true;

function onInit() {
    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');
    renderCanvas();
    renderPicturesToGallery();
    addListeners();
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function setSearchText(keywords) {
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

// SET NEW LINE IN THE POS AND VAL GIVEN AND CREATE NEW LINE.

function setNewTextLine(val = 'Lorem ipsum dolor sit amet') {
    gPos = { x: gPos.x, y: gPos.y + 150 };
    if (!checkBorders() === true) gPos = { x: 0, y: 50 };
    insertNewLine(val, gPos);
}

// CHECK BORDERS OF LINES IN THE TEXT.
function checkBorders() {
    return gElCanvas.width > gPos.x && gElCanvas.height > gPos.y;
}
