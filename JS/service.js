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
    return meme
}

function getMeme() {
    return gcurrmeme
}

// function isMemeClicked(clickedPos) {
//     const { pos } = gCircle
//     // Calc the distance between two dots
//     const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
//     // console.log('distance', distance)
//     //If its smaller then the radius of the circle we are inside
//     return distance <= gCircle.size
// }


function modifyLine(meme, text) {
    console.log(meme.selectedLineIdx)
    var line = meme.lines[meme.selectedLineIdx]
    line.txt = text
    console.log(text)
    console.log(meme.lines[meme.selectedLineIdx])
}

function saveLineCoords(height, width){
line = gcurrmeme.lines[gcurrmeme.selectedLineIdx]
line.height = height
line.width = width
console.log(line)
}
function addLine() {
    selectedLineIdx = gcurrmeme.lines.length + 1
    gcurrmeme.lines.push({
        txt: '',
        size: 100,
        color: null,
        pos:{
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