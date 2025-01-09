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
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].size = newSize
    var selectedLine = gcurrmeme.lines[gcurrmeme.selectedLineIdx]
    drawRect(selectedLine.pos.x, selectedLine.pos.y)
    renderMeme()
}

// rendering meme components//

function renderMeme(meme = gcurrmeme) {
    drawImgEdit(gcurrmeme.imgId)
    var txt = document.getElementById('line').value
    if (line.length === 0) return
    modifyLine(meme, txt)
}

function drawImgEdit(id) {

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

function renderMemeForDownload(meme = gcurrmeme) {
    drawImgDownload(gcurrmeme.imgId)
    var txt = document.getElementById('line').value
    if (line.length === 0) return
    modifyLine(meme, txt)
}
function drawImgDownload(id) {

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
        gCtx.lineWidth = 2
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
   
    var txt = gCtx.measureText(text)
    
    if (txt.width === 0) return
    gCtx.strokeStyle = 'orange'
    
    saveLineCoords(y + +(gcurrmeme.lines[gcurrmeme.selectedLineIdx].size), txt.width)
    gCtx.strokeRect(x, y, txt.width, gcurrmeme.lines[gcurrmeme.selectedLineIdx].size)

}

// drag and drop //

function onDown(ev) {
    console.log('onDown')

    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log('pos:', pos)
    // console.log('pos', pos)
    if (isLineClicked(pos) === false) {
        return
    } else {

        setLineDrag(true)
        
        //Save the pos we start from
        gStartPos = pos
        console.log(gStartPos)
        document.body.style.cursor = 'grabbing'
    }
}

function onMove(ev) {
    

    const { isDrag } = getMeme()
   
    if (isDrag === false) {
        return
    } else {
        
        const position = getEvPos(ev)
        // console.log('pos:', pos)
        // Calc the delta, the diff we moved
        const dx = position.x - gcurrmeme.lines[gcurrmeme.selectedLineIdx].pos.x
        const dy = position.y - gcurrmeme.lines[gcurrmeme.selectedLineIdx].pos.y

        moveLine(dx, dy)
        // Save the last pos, we remember where we`ve been and move accordingly
        gStartPos = position
       
        // The canvas is render again after every move
        renderMeme()
    }
}

function onUp() {
   

    setLineDrag(false)
    document.body.style.cursor = 'grab'
}


// adding / switching lines  //

function onAddLine() {

    addLine()
    document.getElementById('line').value = 'insert text'
    renderMeme()
}
function onDownloadImg(elLink) {
    renderMemeForDownload(gcurrmeme)
setTimeout(() => {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}, 200);
    
}

function onSwitchLine() {
    switchLine()
    var elInput = document.getElementById('line')
    elInput.value = gcurrmeme.lines[gcurrmeme.selectedLineIdx].txt
    renderMeme()
}

// delete line //

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

// save a meme //
// function onSave(){
//     renderMemeForDownload(gcurrmeme)
//     saveToStorage(MEMES_KEY, gMemes)
//     setTimeout(() => {
//         const canvasData = gElCanvas.toDataURL('image/jpeg')
    
        
//         var memeContent = uploadImg(canvasData)
//         console.log(memeContent)
//         saveRenderedMeme(memeContent, gcurrmeme.id)
//     }, 1000);
    
// }
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

// upload meme //
function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a succesful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)

        // document.querySelector('.share-container').innerHTML = `
        // <a href="${uploadedImgUrl}">Uploaded picture</a>
        // <p>Image url: ${uploadedImgUrl}</p>
        // <button class="btn-facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}')">
        //    Share on Facebook  
        // </button>`
    }

    uploadImg(canvasData, onSuccess)
}