import { addCategory } from "../Api/catch_categoryAdd.js";

const urlSearch = window.location.search;
const splitUrl = urlSearch.split("=");
const id = Number(splitUrl[1]);

document.getElementById("add_category").addEventListener("click", async function() {
    document.getElementById("error").innerHTML = "";
    const name = document.getElementById("catName").value;
    const image = document.getElementById("catSrc").value;

    if(name == "" || image == "") {
        document.getElementById("error").innerHTML = "Niste uneli sve podatke";
        return;
    }

    await addCategory(name, image);
    window.open(`admin.html?id=${id}`, "_self");
});

document.getElementById("btn_goBack").addEventListener("click", function() {
    window.open(`admin.html?id=${id}`, "_self");
});