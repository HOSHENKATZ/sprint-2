'use strict'

let gcurrmeme
let gcurrImg

let gStartPos

// meme settings //

function getMemeSenttings(elForm) {
    var newClr = document.getElementById('color').value
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].outlineColor = newClr
    var newFillClr = document.getElementById('fill-color').value
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].fillColor = newFillClr
    var newSize = document.getElementById('size').value
    console.log(newClr,newSize)
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].size = newSize
    var selectedLine = gcurrmeme.lines[gcurrmeme.selectedLineIdx]
    drawRect(selectedLine.pos.x, selectedLine.pos.y)
    renderMeme()
}

// rendering meme components//

function renderMeme(meme = gcurrmeme) {
    drawImg(gcurrmeme.imgId)
    var txt = document.getElementById('line').value
    if (line.length === 0) return
    modifyLine(meme, txt)
}

function drawImg(id) {
    
    const elImg = new Image()
    elImg.src = `img/${id}.jpg`

    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gcurrmeme.lines)
        var selectedLine = gcurrmeme.lines[gcurrmeme.selectedLineIdx]
        drawRect(selectedLine.pos.x, selectedLine.pos.y)
    }
}

function drawText(lines) {
    lines.forEach(line => {
        console.log(line)
        gCtx.lineWidth = 3
        gCtx.fillStyle = line.fillColor
        gCtx.strokeStyle = line.outlineColor
        gCtx.font = `bold ${line.size}px arial `
        gCtx.textAlign = 'left'
        gCtx.textBaseline = 'top'
        gCtx.fillText(line.txt, line.pos.x, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y) 
    });  
}
function drawRect(x, y) {
    var text = gcurrmeme.lines[gcurrmeme.selectedLineIdx].txt
    console.log(text)
    var txt = gCtx.measureText(text)
    console.log(txt.width)
    if (txt.width === 0)return
    gCtx.strokeStyle = 'orange'
    console.log(x,y,gcurrmeme.lines[gcurrmeme.selectedLineIdx].size, txt.width)
    saveLineCoords(y + gcurrmeme.lines[gcurrmeme.selectedLineIdx].size, txt.width)
    gCtx.strokeRect(x, y, txt.width,  gcurrmeme.lines[gcurrmeme.selectedLineIdx].size)
 
}

// drag and drop //

function onDown(ev) {
    console.log('onDown')
  
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log('pos:', pos)
    // console.log('pos', pos)
    if (!isMemeClicked(pos)) return
  
    setMemeDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
  }
  
  function onMove(ev) {
    console.log('onMove')
  
    const { isDrag } = getMeme()
    if (!isDrag) return
  
    const pos = getEvPos(ev)
    // console.log('pos:', pos)
    // Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveCircle(dx, dy)
    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderCanvas()
  }
  
  function onUp() {
    console.log('onUp')
  
    setCircleDrag(false)
    document.body.style.cursor = 'grab'
  }
  

// adding / switching lines  //

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
    renderMeme()
}

// def pos ev for desktop / mobile //

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
  
    let pos = {
      x: ev.offsetX,
      y: ev.offsetY,
    }
  
    if (TOUCH_EVS.includes(ev.type)) {
      // Prevent triggering the mouse ev
      ev.preventDefault()
      // Gets the first touch point
      ev = ev.changedTouches[0]
      // Calc the right pos according to the touch screen
      pos = {
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
      }
    }
    return pos
  }
  