'use strict'

var gTextWidth;
var gNumOfLines = 0;
var gborderSelected;
var gCurrLine = 0;
var gImgs = [{
    id: 1,
    url: 'imgs/1.jpg',
    keywords: ['idiot']
},
{
    id: 2,
    url: 'imgs/2.jpg',
    keywords: ['cute']
},
{
    id: 3,
    url: 'imgs/3.jpg',
    keywords: ['baby']
},
{
    id: 4,
    url: 'imgs/4.jpg',
    keywords: ['tired']
},
{
    id: 5,
    url: 'imgs/5.jpg',
    keywords: ['yes']
},
{
    id: 6,
    url: 'imgs/6.jpg',
    keywords: ['know']
},
{
    id: 7,
    url: 'imgs/7.jpg',
    keywords: ['wow']
},
{
    id: 8,
    url: 'imgs/8.jpg',
    keywords: ['funny']
},
{
    id: 9,
    url: 'imgs/9.jpg',
    keywords: ['funny']
},
{
    id: 10,
    url: 'imgs/10.jpg',
    keywords: ['happey']
},
{
    id: 12,
    url: 'imgs/12.jpg',
    keywords: ['happey']
},
{
    id: 13,
    url: 'imgs/13.jpg',
    keywords: ['happey']
},
{
    id: 14,
    url: 'imgs/14.jpg',
    keywords: ['happey']
},
{
    id: 15,
    url: 'imgs/15.jpg',
    keywords: ['happey']
},
{
    id: 16,
    url: 'imgs/16.jpg',
    keywords: ['happey']
},
{
    id: 17,
    url: 'imgs/17.jpg',
    keywords: ['happey']
},
{
    id: 18,
    url: 'imgs/18.jpg',
    keywords: ['happey']
},
];

var gMeme;

function getKeywords() {
    return gKeywords;
}

function getImgs() {
    return gImgs;

}

function getMeme() {
    return gMeme;
}

function getLinesNum() {
    return gNumOfLines;
}

function getCurrLine() {
    return gCurrLine;
}

function getBoderBoxPos() {
    return gborderSelected;
}


function getImgByID(id) {
    gImgs.filter(img => {
        return img.id === id
    });
}

function updateTextWidth(line, textWidth) {
    var idx = gMeme.lines.findIndex(curLine => {
        return curLine === line;
    });
    gMeme.lines[idx].textWidth = textWidth;
}


function setSearchTextService(keywords) {
    if(keywords==='all'){
        return gImgs;
    }
    var imgs = gImgs.filter(img => {
        console.log('img.keywords[0]',img.keywords[0]);
        return img.keywords[0] === keywords;
    });
    console.log('imgs',imgs);
    if (imgs.length === 0 && keywords === '')
        return;
    return imgs;
}


function setMeme(id, txt = '',) {
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [
            {
                pos: { x: 0, y: 50 },
                txt: txt,
                size: 30,
                Style: 'Arial',
                textWidth: '',
                align: 'left',
                color: 'white'
            }
        ]
    }
}

function updateSelectedLine(val, field) {
    gMeme.lines[gMeme.selectedLineIdx][field] = val
}

function setTextWidth(textWidth, idx) {
    gMeme.lines[idx].textWidth = textWidth;
}



function insertNewLine(val, pos) {
    var newLine = {
        pos: pos,
        txt: val,
        size: 30,
        Style: 'Arial',
        textWidth: '',
        align: 'left',
        color: 'white'
    }
    gMeme.selectedLineIdx = ++gNumOfLines;
    gMeme.lines.push(newLine);
}




function isTextClicked(pos) {
    var lineIdx = gMeme.lines.findIndex(line => {
        return (pos.x >= line.pos.x && pos.x <= line.pos.x + line.textWidth) &&
            (pos.y > line.pos.y - 50 && pos.y < line.pos.y + 50)

    });
    if (lineIdx != -1) {
        gMeme.selectedLineIdx = lineIdx;
        SetborderSelectedItem();
        return true;
    }
    gMeme.selectedLineIdx='';
    return false;
}

function SetborderSelectedItem() {
    const line =gMeme.lines[gMeme.selectedLineIdx];
    let x1 = line.pos.x;
    let x2 = line.pos.x + line.textWidth + 5;
    let y1 = line.pos.y + 50;
    let y2 = line.pos.y - 50;
    let p1 = { x1, y1 }
    let p2 = { x1, y2 }
    let p3 = { x2, y2 }
    let p4 = { x2, y1 }
    gborderSelected = { p1, p2, p3, p4 };
}

// MOVE TEXT TO PLACE + dx dy LOCATION.
function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx;
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy;
}



function save() {
    saveToStorage('Memes', gMeme);
}

function laod() {
    loadFromStorage('Memes')
}