const piano = document.querySelector('.piano');
const pianoKey = document.querySelectorAll('.piano-key');
const btn = document.querySelector('.btn-container');
const fullscreen = document.querySelector('.fullscreen');
let fullscreenFlag = false;
let mouseDownActive = false;
var mouseDownEvent;
let keyDownActive = false;


fullscreen.addEventListener('click', event => {
    if (!event.target.classList.contains('openfullscreen')) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen()
    }

})

document.addEventListener('fullscreenchange', e => {
    fullscreen.classList.toggle('openfullscreen');
})

btn.addEventListener('click', event => {
    if (!event.target.classList.contains('btn-active') &&
        event.target.classList.contains('btn')) {
        btn.querySelector('.btn-active').classList.remove('btn-active');
        event.target.classList.add('btn-active');
        pianoKey.forEach(item => {
            item.classList.toggle('piano-key-latter');
            item.classList.toggle('piano-key-note');

        })
    }
})

piano.addEventListener('mousedown', event => {
    mouseDownActive = true;
    mouseDownEvent = event;
    activateItem(event.target);
})

document.addEventListener('mouseup', event => {
    mouseDownActive = false
    deactivateItem(event.target);
})

piano.addEventListener('mouseover', event => {
    if (mouseDownActive) {
        activateItem(event.target);
    }
})

piano.addEventListener('mouseout', event => {
    deactivateItem(event.target);
})

document.addEventListener('keydown', event => {
    if (!keyDownActive) {
        pianoKey.forEach(item => {
            if (item.dataset.letter == event.code.slice(-1)) {
                activateItem(item);
                keyDownActive = true;
            }
        })
    }

})


document.addEventListener('keyup', event => {
    pianoKey.forEach(item => {
        if (item.dataset.letter == event.code.slice(-1)) {
            deactivateItem(item);
            keyDownActive = false;
        }
    })
})

function activateItem(event) {
    event.classList.add('piano-key-active');
    playAudio(event.dataset.note);

}

function deactivateItem(event) {
    event.classList.remove('piano-key-active');
}

function playAudio(src) {
    const audio = new Audio();
    audio.src = `assets/audio/${src}.mp3`;
    audio.currentTime = 0;
    audio.play();
}