'use strict'

let gcurrmeme
let gcurrImg

function getMemeSenttings(elForm) {

    console.dir(elForm);
    var newClr = document.getElementById('color').value
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].outlineColor = newClr
    var newFillClr = document.getElementById('fill-color').value
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].fillColor = newFillClr
    var newSize = document.getElementById('size').value
    console.log(newClr,newSize)
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].size = newSize
    renderMeme()
}
function renderMeme(meme = gcurrmeme) {
    drawImg(gcurrmeme.imgId)
    var txt = document.getElementById('line').value
    if (line.length === 0) return
    modifyLine(meme, txt)
    var selectedLine = gcurrmeme.lines[gcurrmeme.selectedLineIdx]
    drawRect(selectedLine.x, selectedLine.y)

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
        gCtx.lineWidth = 3
        gCtx.fillStyle = line.fillColor
        
        gCtx.strokeStyle = line.outlineColor
        gCtx.font = `bold ${line.size}px arial `
        console.log(line.size);
        gCtx.textAlign = 'left'
        gCtx.textBaseline = 'top'
        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y) 
    });  
}
function drawRect(x, y) {
    var text = gcurrmeme.lines[gcurrmeme.selectedLineIdx].txt
    console.log(text)
    var txt = gCtx.measureText(text)
    gCtx.strokeStyle = 'orange'
    gCtx.strokeRect(x, y, gcurrmeme.lines[gcurrmeme.selectedLineIdx].size, txt.Width)
 
}

function onAddLine(){
    
    addLine()
    document.getElementById('line').value = 'insert text'
    renderMeme()
}
function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onSwitchLine(){
    switchLine()
    var elInput = document.getElementById('line')
    elInput.value = gcurrmeme.lines[gcurrmeme.selectedLineIdx].txt
    renderMeme
}