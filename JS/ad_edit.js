import { getAllCategories, getAdById, getCategoryById, updateAd } from "../Api/catch_adEdit.js";

const urlSearch = window.location.search;
const splitUrl = urlSearch.split("&");
const splitUrlFirst = splitUrl[0].split("=");
const user_id = splitUrlFirst[1];
const splitUrlSecond = splitUrl[1].split("=");
const ad_id = splitUrlSecond[1];

let ad;

async function loadPage() {
    ad = await getAdById(ad_id);
    
    loadSelect();
    loadAd();
    document.getElementById("updateAd").addEventListener("click", adUpdate);
}

async function loadSelect() {
    const selectCat = document.getElementById("categoryId");
    const allCategories = await getAllCategories();
    document.getElementById("error").innerHTML = "";

    document.getElementById("title").value = ad.title;
    document.getElementById("description").value = ad.description;
    document.getElementById("price").value = ad.price;
    document.getElementById("image").value = ad.image;

    for (let i = 0; i < allCategories.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = allCategories[i].name;
        option.value = allCategories[i].id;
        selectCat.appendChild(option);
    }
}

async function loadAd() {
    const category = await getCategoryById(ad.category_id);
    document.getElementById("ad_title").innerHTML = ad.title;
    document.getElementById("ad_image").src = ad.image;
    document.getElementById("ad_description").innerHTML = ad.description;
    document.getElementById("ad_price").innerHTML = ad.price;
    document.getElementById("ad_likes").innerHTML = ad.likes;
    document.getElementById("ad_category").innerHTML = category.name;
}

async function adUpdate() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const categoryId = document.getElementById("categoryId").value;

    if (title == "" || description == "" || price == "" || image == "") {
        document.getElementById("error").innerHTML = "Niste popunili sva polja.";
        return;
    }
    await updateAd(ad_id, title, description, price, image, ad.likes, categoryId, user_id);
    window.open(`user.html?id=${user_id}`, "_self");
}

window.addEventListener("load", loadPage);