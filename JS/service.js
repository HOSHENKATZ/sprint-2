const gMemes = []

function creatMeme(imgId) {
  
    var meme = {
        imgId,
        selectedLineIdx: 0,
        lines: [{
            txt: null,
            size: null,
            color: 'red'
        }]
    }
    gMemes.push(meme)
    return meme
}

function creatLine(meme, text) {
    console.log(meme.selectedLineIdx)
    var line = meme.lines[meme.selectedLineIdx]
    line.txt = text
    console.log(text)
    console.log(meme.lines[meme.selectedLineIdx])
}