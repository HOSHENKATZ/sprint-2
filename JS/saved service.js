'use strict'
let gSavedMemes

function getSavedMemes() {
    gSavedMemes = loadFromStorage(SAVED_KEY)
    if (!gSavedMemes) gSavedMemes = []
    console.log(gSavedMemes)
}

function saveRenderedMeme(url, id) {
    
    var meme = {
        url,
        id
    }
    gSavedMemes.push(meme)

    saveToStorage(SAVED_KEY, gSavedMemes)
}