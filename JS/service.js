const gMemes = []

function creatMeme(imgId) {

    var meme = {
        imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 100,
                outlineColor: null,
                fillColor: null,
                isDrag: false,
                pos: {
                    x: 0,
                    y: 0,
                    height: null,
                    width: null
                }
            }
        ]
    }
    gMemes.push(meme)
    saveToStorage(STORAGE_KEY, gMemes)
    return meme
}

function getMeme() {
    return gcurrmeme
}

function isLineClicked(clickedPos) {
    const { pos } = gcurrmeme.lines[gcurrmeme.selectedLineIdx]
    console.log('before:');

    if (clickedPos.x >= pos.x && clickedPos.y >= pos.y &&
        clickedPos.x <= pos.width && clickedPos.y <= pos.height) {
        console.log('hey')
        return true
    } else {
        return false
    }
}


function modifyLine(meme, text) {
    console.log(meme.selectedLineIdx)
    var line = meme.lines[meme.selectedLineIdx]
    line.txt = text
}

function saveLineCoords(height, width) {
    line = gcurrmeme.lines[gcurrmeme.selectedLineIdx]
    line.pos.height = line.pos.y + height
    line.pos.width = line.pos.x + width
    console.log('line from save coord', line)
}

function setLineDrag(isDrag) {
    gcurrmeme.isDrag = isDrag
}

function moveLine(dx, dy) {
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].pos.x += dx
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].pos.y += dy
console.log(gcurrmeme.lines[gcurrImg.selectedLineIdx])
}


function addLine() {
    selectedLineIdx = gcurrmeme.lines.length + 1
    gcurrmeme.lines.push({
        txt: '',
        size: 100,
        color: null,
        pos: {
            x: 0,
            y: gElCanvas.height - 100,
            height: null,
            width: null
        }
    })
    switchLine()
    renderMeme()
}
function switchLine() {
    gcurrmeme.selectedLineIdx++
    if (gcurrmeme.selectedLineIdx > gcurrmeme.lines.length - 1) {
        gcurrmeme.selectedLineIdx = 0
    }

}

function deleteLine(){
    gcurrmeme.lines.splice(gcurrmeme.lines[gcurrmeme.selectedLineIdx], 1)
}
