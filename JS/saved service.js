'use strict'
let gSavedMemes

function getSavedMemes() {
    gSavedMemes = loadFromStorage(SAVED_KEY)
    if (!gSavedMemes) gSavedMemes = []
    console.log('saved',gSavedMemes)
}

function saveRenderedMeme(url, id) {
    
    var meme = {
        url,
        id
    }
    console.log(meme)
    gSavedMemes.push(meme)

    saveToStorage(SAVED_KEY, gSavedMemes)
}