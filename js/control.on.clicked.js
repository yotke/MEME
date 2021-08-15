'use strict'

// ON CLICKED BUTTONS OR INPUT INSERT.

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
    gCtx.fillStyle = color;
    gCtx.strokeStyle = color;
    gCtx.stroke()
}
