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
                x: 0,
                y: 0
    
            }
        ]
    }
    gMemes.push(meme)
    return meme
}

function modifyLine(meme, text) {
    console.log(meme.selectedLineIdx)
    var line = meme.lines[meme.selectedLineIdx]
    line.txt = text
    console.log(text)
    console.log(meme.lines[meme.selectedLineIdx])
}

function addLine() {
    selectedLineIdx =  gcurrmeme.lines.length + 1
        gcurrmeme.lines.push({
            txt: '',
            size: 100,
            color: null,
            x: 0,
            y: gElCanvas.height - 100

        })
    
    switchLine()
    
}
function switchLine(){
    gcurrmeme.selectedLineIdx ++
    if (gcurrmeme.selectedLineIdx > gcurrmeme.lines.length - 1){
        gcurrmeme.selectedLineIdx =  0
    }

}