import { getAllCategories } from "./catch.js";

let currentIndex = 0;
let allCategories;

const content = document.getElementById("content");
const img = document.createElement("img");
content.appendChild(img);
const title = document.createElement("h3");
content.appendChild(title);

async function loadPage() {
    allCategories = await getAllCategories();
        
    img.src = allCategories[currentIndex].image;
    title.innerHTML = allCategories[currentIndex].name;  
}

document.getElementById("right").addEventListener("click", changeRight);
document.getElementById("left").addEventListener("click", changeLeft);

function changeRight() {
    currentIndex += 1;
    if (currentIndex == -1) {
        currentIndex = allCategories.length - 1
    }
    if (currentIndex == allCategories.length) {
        currentIndex = 0
    }
    img.src = allCategories[currentIndex].image;
    title.innerHTML = allCategories[currentIndex].name;
}

function changeLeft() {
    currentIndex += -1
    if (currentIndex == -1) {
        currentIndex = allCategories.length - 1
    }
    if (currentIndex == allCategories.length) {
        currentIndex = 0
    }
    img.src = allCategories[currentIndex].image;
    title.innerHTML = allCategories[currentIndex].name;
}
window.addEventListener("load", loadPage);

document.getElementById("reg").addEventListener("click", function() {
    window.open("Pages/registration.html", "_self");
});

document.getElementById("log").addEventListener("click", function() {
    window.open("Pages/log_in.html", "_self");
});