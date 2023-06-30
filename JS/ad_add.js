import { addAd, getAllCategories } from "../Api/catch_adAdd.js";

const urlSearch = window.location.search;
const splitUrl = urlSearch.split("=");
const id = Number(splitUrl[1]);

async function load() {
    const selectCat = document.getElementById("categoryId");
    const allCategories = await getAllCategories();
    document.getElementById("error").innerHTML = "";

    for (let i = 0; i < allCategories.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = allCategories[i].name;
        option.value = allCategories[i].id;
        selectCat.appendChild(option);
    }
}

window.addEventListener("load", load);

document.getElementById("addAd").addEventListener("click", async function() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const categoryId = document.getElementById("categoryId").value;

    if (title == "" || description == "" || price == "" || image == "") {
        document.getElementById("error").innerHTML = "Niste popunili sva polja.";
        return;
    }

    await addAd(title, description, price, image, 0, categoryId, id);
    window.open(`user.html?id=${id}`, "_self");
});

document.getElementById("btn_profile").addEventListener("click", function() {
    window.open(`user.html?id=${id}`, "_self");
});