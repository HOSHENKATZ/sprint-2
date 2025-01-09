const MEMES_KEY = 'memesDB'
const SAVED_KEY = 'savedDB'
function loadFromStorage(key) {
    var json = localStorage.getItem(key)
    return JSON.parse(json)
}

function saveToStorage(key, value) {
    var json = JSON.stringify(value)
    localStorage.setItem(key, json)
}