'use strict'

let gcurrmeme
let gcurrImg

function getMemeSenttings(elForm) {

    console.dir(elForm);
    var newClr = document.getElementById('color').value
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].color = newClr
    var newSize = document.getElementById('size').value
    console.log(newClr,newSize)
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].size = newSize
    renderMeme()
}
function renderMeme(meme = gcurrmeme) {
    drawImg(gcurrmeme.imgId)
    var txt = document.getElementById('line').value
    if (line.length === 0) return
    creatLine(meme, txt)


}

function drawImg(id) {
    console.log(id)
    const elImg = new Image()
    elImg.src = `img/${id}.jpg`

    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gcurrmeme.lines)
    }
}

function drawText(lines) {
    lines.forEach(line => {
        console.log(line)
        gCtx.lineWidth = 10
        gCtx.strokeStyle = line.color
        gCtx.font = `${line.size}px arial`
        console.log(line.size);
        
        gCtx.textAlign = 'left'
        gCtx.textBaseline = 'top'

        gCtx.strokeText(line.txt, 0, 0)
    });
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

