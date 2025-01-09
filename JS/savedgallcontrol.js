'use strict'

function onSavedGallclick(elSaved) {
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.saved-gallery').classList.remove('hidden')
console.log(gSavedMemes)
     gSavedMemes.forEach(meme => {
        var url = meme.url.
        url.revokeObjectURL(objectURL)
    });
    console.log(strHtml)
    document.querySelector('.saved-gallery').innerHTML = strHtml
}