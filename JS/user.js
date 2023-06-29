import { getUserById, getAdsOfUser, getCategoryById, deleteAd, getAllCategories, getAdByCategory } from "../Api/catch_user.js";

const urlSearch = window.location.search;
const splitUrl = urlSearch.split("=");
const id = Number(splitUrl[1]);

let adsOfUser;

async function loadPage() {
    loadUserProfile();
    loadSelect();
    adsOfUser = await getAdsOfUser(id);
    loadAds(adsOfUser);
}

async function loadUserProfile() {
    const userInfo = await getUserById(id);
    document.getElementById("firstLastName").innerHTML = `-- ${userInfo.first_name} ${userInfo.last_name} --`;
    document.getElementById("username").innerHTML = `Username: ${userInfo.username}`;
    document.getElementById("password").innerHTML = `Password: ${userInfo.password}`;
    document.getElementById("address").innerHTML = `Address: ${userInfo.address}`;
    document.getElementById("phone").innerHTML = `Phone number: ${userInfo.phone_number}`;
    const gender = document.getElementById("gender");
    if (userInfo.gender == "M") {
        gender.innerHTML = "Gender: Male";
    } else {
        gender.innerHTML = "Gender: Female";
    }
}

async function loadSelect() {
    const selectCat = document.getElementById("selectCat");
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

async function loadAds(adsOfUser) {
    const userAds = document.getElementById("userAds");
    userAds.innerHTML = "";

    for (let i = 0; i < adsOfUser.length; i++) {
        const container = document.createElement("div");
        container.classList = "container";
        userAds.appendChild(container);
        const deleteAds = document.createElement("button");
        deleteAds.innerHTML = "X";
        deleteAds.classList = "deleteBtn";
        deleteAds.addEventListener("click", async function() {
            await deleteAd(adsOfUser[i].id);
            this.parentNode.remove();
            window.location.reload();
        });
        container.appendChild(deleteAds);
        const adImg = document.createElement("img");
        adImg.src = adsOfUser[i].image;
        container.appendChild(adImg);
        const adTitle = document.createElement("h2");
        adTitle.innerHTML = adsOfUser[i].title;
        adTitle.classList = "catTitle";
        container.appendChild(adTitle);
        const adDesc = document.createElement("p");
        adDesc.classList = "description";
        adDesc.innerHTML = `Opis: ${adsOfUser[i].description}`;
        container.appendChild(adDesc);
        const br = document.createElement("br");
        container.appendChild(br);
        const adPrice = document.createElement("p");
        adPrice.innerHTML = `Cena: ${adsOfUser[i].price}`;
        container.appendChild(adPrice);
        const adLikes = document.createElement("p");
        adLikes.innerHTML = `Svidjanja: ${adsOfUser[i].likes}`;
        container.appendChild(adLikes);
        const adCategory = document.createElement("p");
        const category = await getCategoryById(adsOfUser[i].category_id);
        adCategory.innerHTML = `Kategorija: ${category.name}`;
        container.appendChild(adCategory);
        const updateLink = document.createElement("a");
        updateLink.innerHTML = "Ažuriraj oglas";
        updateLink.href = `ad_edit.html?id=${id}&adId=${adsOfUser[i].id}`, "_self";
        container.appendChild(updateLink);
    }
}

document.getElementById("filter").addEventListener("click", filterCat);
async function filterCat() {
    const categoryId = Number(document.getElementById("selectCat").value);
    
    const filterCat = await getAdByCategory(categoryId);

    if (categoryId == 0) {
        loadAds(adsOfUser);
        return;
    }

    loadAds(filterCat);
};

document.getElementById("new").addEventListener("click", function() {
    window.open(`ad_add.html?id=${id}`, "_self");
});

document.getElementById("ads").addEventListener("click", function() {
    window.open(`ads.html?id=${id}`, "_self");
});

document.getElementById("logOut").addEventListener("click", function() {
    window.open("../index.html", "_self");
})

window.addEventListener("load", loadPage);