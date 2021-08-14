'use strict'

var gTextWidth;
var gKeywords = {
    'happy': 12,
    'funny puk': 1
}


var gImgs = [{
    id: 1,
    url: 'imgs/1.jpg',
    keywords: ['happy']
},
{
    id: 2,
    url: 'imgs/2.jpg',
    keywords: ['happy']
},
{
    id: 3,
    url: 'imgs/3.jpg',
    keywords: ['happy']
},
{
    id: 4,
    url: 'imgs/4.jpg',
    keywords: ['happy']
},
{
    id: 5,
    url: 'imgs/5.jpg',
    keywords: ['happy']
},
{
    id: 6,
    url: 'imgs/6.jpg',
    keywords: ['happy']
},
{
    id: 7,
    url: 'imgs/7.jpg',
    keywords: ['happy']
},
{
    id: 8,
    url: 'imgs/8.jpg',
    keywords: ['happy']
},
{
    id: 9,
    url: 'imgs/9.jpg',
    keywords: ['happy']
},
{
    id: 10,
    url: 'imgs/10.jpg',
    keywords: ['happy']
},
{
    id: 12,
    url: 'imgs/12.jpg',
    keywords: ['happy']
},
{
    id: 13,
    url: 'imgs/13.jpg',
    keywords: ['happy']
},
{
    id: 14,
    url: 'imgs/14.jpg',
    keywords: ['happy']
},
{
    id: 15,
    url: 'imgs/15.jpg',
    keywords: ['happy']
},
{
    id: 16,
    url: 'imgs/16.jpg',
    keywords: ['happy']
},
{
    id: 17,
    url: 'imgs/17.jpg',
    keywords: ['happy']
},
{
    id: 18,
    url: 'imgs/18.jpg',
    keywords: ['happy']
},
];


var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        pos: { x: 0, y: 10 },
        txt: 'Inever eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}




function getKeywords() {
    return gKeywords;
}

function getImgs() {
    return gImgs;

}

function getMeme() {
    return gMeme;
}

function setMeme(id, txt = '', elImg) {
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        elImg: elImg,
        lines: [{
            pos: { x: 0, y: 10 },
            txt: txt,
            size: 40,
            align: 'left',
            color: 'white'
        }]
    }
}


function setTextWidth(textWidth) {
    console.log('textWidth', textWidth);
    gTextWidth = textWidth;
}

function isTextClicked(pos) {
    console.log('pos', pos);
    if (pos.x >= gMeme.lines[0].pos.x && pos.x <= gMeme.lines[0].pos.x + gTextWidth) {
        if (pos.y > gMeme.lines[0].pos.y - 50 && pos.y < gMeme.lines[0].pos.y + 50) {

            return true;
        }
    }
    return false;
}

