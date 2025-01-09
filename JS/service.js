let gMemes

function getMemes() {
    gMemes = loadFromStorage(MEMES_KEY)
    if (!gMemes) gMemes = []
    console.log(gMemes)
}

function creatMeme(imgId) {
    console.log(gMemes)
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
        ],
        id: makeId()
    }
    gMemes.push(meme)
    console.log(gMemes)
    saveToStorage(MEMES_KEY, gMemes)
    return meme
}

function getMeme() {
    return gcurrmeme
}

function isLineClicked(clickedPos) {
    const { pos } = gcurrmeme.lines[gcurrmeme.selectedLineIdx]


    if (clickedPos.x >= pos.x && clickedPos.y >= pos.y &&
        clickedPos.x <= pos.width && clickedPos.y <= pos.height) {

        return true
    } else {
        return false
    }
}


function modifyLine(meme, text) {

    var line = meme.lines[meme.selectedLineIdx]
    line.txt = text
}

function saveLineCoords(height, width) {
    line = gcurrmeme.lines[gcurrmeme.selectedLineIdx]
    line.pos.height = line.pos.y + height
    line.pos.width = line.pos.x + width

}

function setLineDrag(isDrag) {
    gcurrmeme.isDrag = isDrag
}

function moveLine(dx, dy) {
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].pos.x += dx
    gcurrmeme.lines[gcurrmeme.selectedLineIdx].pos.y += dy
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

function deleteLine() {
    gcurrmeme.lines.splice(gcurrmeme.lines[gcurrmeme.selectedLineIdx], 1)
}

async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log('Cloudinary response:', data)
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}
