import { getAllCategories } from "../Api/catch_index.js";

const carousel = document.getElementById("carousel");
const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");

let firstImageWidth;

async function loadCarousel() {
    const allCategories = await getAllCategories();

    for(let i = 0; i < allCategories.length; i++) {
        const content = document.createElement("div");
        content.classList = "content";
        carousel.appendChild(content);
        const image = document.createElement("img");
        image.src = allCategories[i].image;
        content.appendChild(image);
        const title = document.createElement("h4");
        title.innerHTML = allCategories[i].name;
        content.appendChild(title);
    }
    
    const firstImage = document.querySelector('img');
    firstImageWidth = firstImage.clientWidth + 14;
}

let isDragStart = false, prevPageX, prevScrollLeft;

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mouseover", dragging);
carousel.addEventListener("mouseup", dragStop);
loadCarousel();

btnLeft.addEventListener('click', changeImage)
btnRight.addEventListener('click', changeImage)

function changeImage() {
    carousel.scrollLeft += this.id === 'left' ? -firstImageWidth : firstImageWidth
}

document.getElementById("reg").addEventListener("click", function() {
    window.open("Pages/registration.html", "_self");
});

document.getElementById("log").addEventListener("click", function() {
    window.open("Pages/log_in.html", "_self");
});