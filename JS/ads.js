import { getAllAds, getCategoryById, getUserById, getAllCategories, getAdsByCategory } from "../Api/catch_ads.js";

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
        adLikes.innerHTML = `Svidjanja: ${ads[i].likes}`;
        container.appendChild(adLikes);
        const adCategory = document.createElement("p");
        const category = await getCategoryById(ads[i].category_id);
        adCategory.innerHTML = `Kategorija: ${category.name}`;
        container.appendChild(adCategory);
        const user_name = document.createElement("p");
        const user = await getUserById(ads[i].user_id);
        user_name.id = "user_name";
        user_name.innerHTML = `${user.first_name} ${user.last_name}`;
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

    let newArr = [];
    for (let i = 0; i < filteredAds.length; i++) {
        const priceSplit = filteredAds[i].price.split(" ");
        const realPrice = priceSplit[0];
        
        if (realPrice >= price1 && realPrice <= price2) {
            newArr.push(filteredAds[i]);
        } else {
            wrapper.innerHTML = "";
        }
    }
    loadAds(newArr);

    const newArr2 = [];
    if (filteredAds == 0) {
        for(let i = 0; i < allAds.length; i++) {
            const priceSplit = allAds[i].price.split(" ");
            const realPrice = priceSplit[0];
            
            if (realPrice >= price1 && realPrice <= price2) {
                newArr2.push(allAds[i]);
                console.log(newArr2);
            } else {
                wrapper.innerHTML = "";
            }
        }
        loadAds(newArr2);
    }
})

document.getElementById("sort").addEventListener("click", function() {
    const price_title = document.getElementById("price_title").value;
    const asc_desc = document.getElementById("asc_desc").value;
    // const ads = [...document.querySelectorAll(".container")];
    // let elements = [];

    // for (let i = 0; i < ads.length; i++) {
    //     elements.push({...ads[i].children});
    // }
    // console.log(elements);
    // if(price_title == "price" && asc_desc == "asc") {
    //     const price_asc = elements.sort((a, b) => a.h3 - b.h3);
    //     loadAds(price_asc);
    // }
    let price_asc = [];
    if (price_title == "price" && asc_desc == "asc") {
        for(let i = 0; i < allAds.length; i++) {
            const priceSplit = allAds[i].price.split(" ");
            const realPrice = priceSplit[0];
                price_asc = allAds.sort((a, b) => a.realPrice - b.realPrice);
            }
        }
        loadAds(price_asc);
})

window.addEventListener("load", loadPage);