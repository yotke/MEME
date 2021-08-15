
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
        renderCleanCanvas();
        renderTexts();
    });
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
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
    var posVec = getBoderBoxPos();
    drawRectangle(posVec);
    // drawRectangle(100,200);
    document.body.style.cursor = 'progress'

}


function onMove(ev) {
    if (gIsDown && gTextClicked) {
        const pos = getEvPos(ev);
        const meme = getMeme();
        const currLine = getCurrLine();
        const dx = pos.x - meme.lines[currLine].pos.x
        const dy = pos.y - meme.lines[currLine].pos.y
        SetborderSelectedItem()
        var posVec = getBoderBoxPos();
        moveText(dx, dy);
        renderCleanCanvas();
        renderTexts();
        drawRectangle(posVec);
    }
    // 

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