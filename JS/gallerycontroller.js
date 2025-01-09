'use strict'

let gElCanvas
let gCtx 

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    getMemes() 
    // getSavedMemes()
    onResize()
    console.log(gCtx)
    
}

function onResize() {
    const elContainer = document.querySelector('.canvas-container')
    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth - 2

}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}


// main gallery //

function onMemePicked(elImage) {
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.meme-editor').classList.remove('hidden')
    gcurrImg = elImage
    var meme = creatMeme(elImage.id)
    gcurrmeme = meme
    renderMeme(gcurrmeme)
}

function onPhotoGallView(){
    document.querySelector('.meme-editor').classList.add('hidden')
    document.querySelector('.gallery-container').classList.remove('hidden')

}