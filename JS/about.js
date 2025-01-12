'use strict'

function openModal() {
    var backDrop = document.querySelector('.backdrop')
    var modal = document.querySelector('.modal')
    var body = document.querySelector('body')
    console.dir(body)
    body.classList.remove('menu-open')
    backDrop.style.opacity = '6'
    backDrop.style.zIndex = '5'
    modal.style.opacity = '10'
    modal.style.zIndex = '6'
    console.dir(backDrop)

}

function closeModal() {
    var backDrop = document.querySelector('.backdrop')
    var modal = document.querySelector('.modal')
    backDrop.style.opacity = '0'
    backDrop.style.zIndex = '-1'
   
   
}