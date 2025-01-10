'use strict'

function onSavedGallclick(elSaved) {
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
    document.querySelector('.saved-gallery').classList.remove('hidden')
    console.log(gSavedMemes)
    var strHtml = ''
    gSavedMemes.forEach(meme => {
        strHtml += `<img src="${meme.url}" alt="" onclick=" onSavedMemeclick(this)" id='${meme.id}'></img>`
        document.querySelector('.saved-content').innerHTML = strHtml
    });
    console.log(strHtml)

}
function onSavedMemeclick(elImg) {
    console.log('elImg:', elImg.id);
    elImg
    var selectedIdx = gMemes.findIndex((meme) => meme.id === elImg.id );
    // console.log(selected)
    document.querySelector('.saved-gallery').classList.add('hidden')
    document.querySelector('.meme-editor').classList.remove('hidden')
    gcurrmeme = gMemes[selectedIdx]
    console.log(gcurrmeme)
    renderMemeForDownload()
}