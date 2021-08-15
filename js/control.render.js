'use strict'

var gElImg;
var gSavedImg = [];

var gPos = { x: 0, y: 50 };
var gElCanvas;
var gCtx;

function renderCanvas() {
    gCtx.save()
    gCtx.fillStyle = "white"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.restore()
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

// RENDER ALL KIND OF PICTURE TO OUR GALLERY.
function renderPicturesToGallery(imgsGl) {
    var imgs;
    if (imgsGl) {
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


// RENDER GIVEN LINE.s
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
