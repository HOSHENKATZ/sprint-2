'use strict'
let gElCanvas
let gCtx 

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    onResize()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}


// main gallery //

function onMemePicked(elImage) {
    console.log('picked')
    console.dir(elImage)
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.meme-editor').classList.remove('hidden')
    drawImg(elImage.id)
}

function drawImg(id) {
    console.log(id)
    const elImg = new Image()
    elImg.src = `img/${id}.jpg`

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    }
}