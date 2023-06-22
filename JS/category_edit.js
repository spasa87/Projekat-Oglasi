import { updateCategory, getCategoryById } from "./catch.js";

const urlSearch = window.location.search;
const splitSearch = urlSearch.split("&");
const splitSearch_first = splitSearch[0].split("=");
const idOfUser = Number(splitSearch_first[1]);
const splitSearch_second = splitSearch[1].split("=");
const idOfCategory = Number(splitSearch_second[1]);

const input_name = document.getElementById("input_name");
const input_src = document.getElementById("input_src");
const cat = await getCategoryById(idOfCategory);
input_name.value = cat.name;
input_src.value = cat.image;

const categoryName = document.getElementById("categoryName");
categoryName.innerHTML = cat.name;
const categoryImage = document.getElementById("categoryImage");
categoryImage.src = cat.image;

document.getElementById("error").innerHTML = "";

document.getElementById("update").addEventListener("click", async function() {
    if(input_name.value == "" || input_src.value == "") {
        document.getElementById("error").innerHTML = "Popunite sva polja.";
        return;
    }

    const name = input_name.value;
    const image = input_src.value;
    await updateCategory(idOfCategory, name, image);
    window.open(`admin.html?id=${idOfUser}`, "_self");
});