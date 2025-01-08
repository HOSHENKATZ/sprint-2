'use strict'
let gcurrmeme
let gcurrImg

function renderMeme(meme){
    drawImg(gcurrmeme.imgId)
    var txt = document.getElementById('line').value
    if(line.length === 0)return
    creatLine(meme,txt)
    drawText(meme.lines)
}

function drawImg(id) {
    console.log(id)
    const elImg = new Image()
    elImg.src = `img/${id}.jpg`

    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(lines) {
    lines.forEach(element => {
        gCtx.lineWidth = 10
        gCtx.strokeStyle = 'red'
        gCtx.font = '100px arial'
        gCtx.textAlign = 'left'
        gCtx.textBaseline = 'top'
        
        gCtx.strokeText(text, 0, 0)
    });

}

