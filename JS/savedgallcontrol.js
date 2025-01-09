'use strict'

function onSavedGallclick(elSaved){
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.saved-gallery').classList.remove('hidden')
   loadFromStorage(STORAGE_KEY)
  
   array.forEach(meme => {
    var memeIdx = 0
    elSaved.innerHtml += `<div class="canvas-container${memeIdx}">

    <canvas width="400" height="400"  onmousedown="onDown(event)" onmousemove="onMove(event)" onmouseup="onUp()"
    ontouchstart="onDown(event)" ontouchmove="onMove(event)" ontouchend="onUp()">
    </canvas>
    </div>`
       renderMeme(meme)
   });
}