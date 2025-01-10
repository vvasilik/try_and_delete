const scroll = document.querySelector('.js-scroll');
const box = document.querySelector('.js-box');
const action = document.querySelector('.js-action');
const slider = document.querySelector('.js-slider');

box.children[0].style.opacity = 1;

let sliderWidth;
let imagesNumber;

action.addEventListener('mousedown', () => {
    document.addEventListener('mousemove', onMouseMove);
    sliderWidth = slider.offsetWidth;
    imagesNumber = box.children.length;
});

document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
});

// listen for device orientation changes
window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
    imagesNumber = box.children.length;
    const x = event.gamma;
    // handle only between -30 and 30 degrees
    if (x > 30 || x < -30) {
        return;
    }

    if (x > 0) {
        const percent = x / 30;
        const index = Math.floor(percent * imagesNumber);
        const image = box.children[index];

        if (image) {
            Array.from(box.children).forEach((child) => {
                child.style.opacity = 0;
            });
            image.style.opacity = 1;
        }

        // let left = percent * 100;

        // if (left < 0) {
        //     left = 0;
        // }

        // if (left > 100) {
        //     left = 100;
        // }

        // action.style.left = `calc(${left}% - 50px)`;
    }
    // const percent = (x + 90) / 180;
    // const index = Math.floor(percent * imagesNumber);
    // const image = box.children[index];

    // debugger

    // if (image) {
    //     Array.from(box.children).forEach((child) => {
    //         child.style.opacity = 0;
    //     });
    //     image.style.opacity = 1;
    // }

    // let left = percent * 100;

    // if (left < 0) {
    //     left = 0;
    // }

    // if (left > 100) {
    //     left = 100;
    // }

    // action.style.left = `calc(${left}% - 50px)`;
}


function onMouseMove(event) {
    const x = event.clientX - box.getBoundingClientRect().left;
    const percent = x / sliderWidth;
    const index = Math.floor(percent * imagesNumber);
    const image = box.children[index];

    if (image) {
        Array.from(box.children).forEach((child) => {
            child.style.opacity = 0;
        });
        image.style.opacity = 1;
    }

    let left = percent * 100;

    if (left < 0) {
        left = 0;
    }

    if (left > 100) {
        left = 100;
    }

    action.style.left = `calc(${left}% - 50px)`;
}