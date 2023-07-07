import { getAllAds, getCategoryById, getUserById,
    getAllCategories, getAdsByCategory, getLikesOfAd } from "../Api/catch_ads.js";

const urlSearch = window.location.search;
const splitUrl = urlSearch.split("=");
const id = Number(splitUrl[1]);

let allAds;
const selectCat = document.getElementById("selectCategory");

async function loadPage() {
    allAds = await getAllAds();
    loadSelect();
    loadAds(allAds);
}

async function loadSelect() {
    const allCategories = await getAllCategories();

    const optionAll = document.createElement("option");
    optionAll.innerHTML = "Sve kategorije";
    optionAll.value = "0";
    selectCat.appendChild(optionAll);

    for(let i = 0; i < allCategories.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = allCategories[i].name;
        option.value = allCategories[i].id;
        selectCat.appendChild(option);
    }
}

async function loadAds(ads) {
    const wrapper = document.getElementById("wrapper");
    wrapper.innerHTML = "";

    for (let i = 0; i < ads.length; i++) {
        const container = document.createElement("div");
        container.classList = "container";
        wrapper.appendChild(container);
        const adImg = document.createElement("img");
        adImg.src = ads[i].image;
        container.appendChild(adImg);
        const adTitle = document.createElement("h2");
        adTitle.classList = "adTitle";
        adTitle.innerHTML = ads[i].title;
        container.appendChild(adTitle);
        const adDesc = document.createElement("p");
        adDesc.classList = "description";
        adDesc.innerHTML = `Opis: ${ads[i].description}`;
        container.appendChild(adDesc);
        const br = document.createElement("br");
        container.appendChild(br);
        const adPrice = document.createElement("h3");
        adPrice.innerHTML = `Cena: ${ads[i].price}`;
        container.appendChild(adPrice);
        const adLikes = document.createElement("p");
        const likes = await getLikesOfAd(ads[i].id);
        let like = 0;
        for(let j = 0; j < likes.length; j++) {
            like++;
        }
        adLikes.innerHTML = `Svidjanja: ${like}`;
        container.appendChild(adLikes);
        const adCategory = document.createElement("p");
        const category = await getCategoryById(ads[i].category_id);
        adCategory.innerHTML = `Kategorija: ${category.name}`;
        container.appendChild(adCategory);
        const user_name = document.createElement("p");
        const user = await getUserById(ads[i].user_id);
        user_name.id = "user_name";
        user_name.innerHTML = user.username;
        container.appendChild(user_name);
        const info = document.createElement("a");
        info.innerHTML = "Pogledaj oglas";
        info.href = `ad_info.html?id=${id}&ad_id=${ads[i].id}`, "_self";
        container.appendChild(info);
    }
}

selectCat.addEventListener("change", async function() {
    const filteredAds = await getAdsByCategory(selectCat.value);
    document.getElementById("price1").value = "";
    document.getElementById("price2").value = "";

    if (filteredAds == 0) {
        loadAds(allAds);
        return;
    }

    loadAds(filteredAds);
});

document.getElementById("filter").addEventListener("click", async function() {
    const price1 = Number(document.getElementById("price1").value);
    const price2 = Number(document.getElementById("price2").value);
    const filteredAds = await getAdsByCategory(selectCat.value);

    if(price1 == "" || price2 == "") {
        return;
    }

    const newArr = filteredAds.filter(ad => ad.price.split(" ")[0] >= price1 &&  ad.price.split(" ")[0] <= price2);
    loadAds(newArr);

    const newArr2 = [];
    if (filteredAds == 0) {
        const newArr2 = allAds.filter(ad => ad.price.split(" ")[0] >= price1 &&  ad.price.split(" ")[0] <= price2);
        loadAds(newArr2);
    }
})

document.getElementById("sort").addEventListener("click", function() {
    const price_title = document.getElementById("price_title").value;
    const asc_desc = document.getElementById("asc_desc").value;
    let price_asc = [];
    let price_desc = [];
    let title_asc = [];
    let title_desc = [];
    
    if (price_title == "price" && asc_desc == "asc") {
        price_asc = allAds.sort((a, b) => {
            const aRealPrice = a.price.split(" ")[0];
            const bRealPrice = b.price.split(" ")[0];
            return aRealPrice - bRealPrice;
        })
        loadAds(price_asc);
    }
    

    if (price_title == "price" && asc_desc == "desc") {
        price_desc = allAds.sort((a, b) => {
            const aRealPrice = a.price.split(" ")[0];
            const bRealPrice = b.price.split(" ")[0];
            return bRealPrice - aRealPrice;
        })
        loadAds(price_desc);
    }
    
    if (price_title == "title" && asc_desc == "asc") {
        title_asc = allAds.sort((a, b) => a.title.length - b.title.length);
        loadAds(title_asc);
    }
    

    if (price_title == "title" && asc_desc == "desc") {
        title_desc = allAds.sort((a, b) => b.title.length - a.title.length);
        loadAds(title_desc);
    }
});

document.getElementById("btn_profile").addEventListener("click", function() {
    window.open(`user.html?id=${id}`, "_self");
})

window.addEventListener("load", loadPage);