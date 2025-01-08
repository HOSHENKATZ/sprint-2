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

function creatLine(meme, txt) {
    console.log(meme.lines)
    var line = meme.lines[selectedLineIdx]
    line.txt = txt
    console.log(line)
}