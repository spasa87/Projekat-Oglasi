import { getUserById, getAdsOfUser, getCategoryById, deleteAd,
    getAllCategories, getAdByCategoryAndUserId, getLikesOfAd } from "../Api/catch_user.js";

const urlSearch = window.location.search;
const splitUrl = urlSearch.split("=");
const id = Number(splitUrl[1]);

let adsOfUser;

async function loadPage() {
    adsOfUser = await getAdsOfUser(id);
    loadUserProfile();
    loadSelect();
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

async function loadAds(ads) {
    const userAds = document.getElementById("userAds");
    userAds.innerHTML = "";

    for (let i = 0; i < ads.length; i++) {
        const container = document.createElement("div");
        container.classList = "container";
        userAds.appendChild(container);

        const linkDel = document.createElement("a");
        linkDel.classList = "delLink";
        container.appendChild(linkDel);
        const imgDel = document.createElement("i");
        imgDel.classList = "fa-solid fa-trash-can";
        imgDel.id = "imgDel";
        linkDel.appendChild(imgDel);
        const btnDel = document.createElement("i");
        btnDel.classList = "fa-solid fa-trash-can fa-beat-fade";
        btnDel.id = "btnDel";
        btnDel.title = "Obrisi";
        btnDel.addEventListener("click", async function() {
            await deleteAd(ads[i].id);
            this.parentNode.parentNode.remove();
            adsOfUser = adsOfUser.filter(add => add.id != ads[i].id);
            });
        linkDel.appendChild(btnDel);
        const adImg = document.createElement("img");
        adImg.src = ads[i].image;
        container.appendChild(adImg);
        const adTitle = document.createElement("h2");
        adTitle.innerHTML = ads[i].title;
        adTitle.classList = "catTitle";
        container.appendChild(adTitle);
        const adDesc = document.createElement("p");
        adDesc.classList = "description";
        adDesc.innerHTML = `Opis: ${ads[i].description}`;
        container.appendChild(adDesc);
        const br = document.createElement("br");
        container.appendChild(br);
        const adPrice = document.createElement("p");
        adPrice.innerHTML = `Cena: ${ads[i].price}`;
        container.appendChild(adPrice);
        const adLikes = document.createElement("p");
        const likes = await getLikesOfAd(ads[i].id);
        console.log(likes);
        let like = 0;
        for(let j = 0; j < likes.length; j++) {
            like++
        }
        adLikes.innerHTML = `Svidjanja: ${like}`;
        container.appendChild(adLikes);
        const adCategory = document.createElement("p");
        const category = await getCategoryById(ads[i].category_id);
        adCategory.innerHTML = `Kategorija: ${category.name}`;
        container.appendChild(adCategory);
        const updateLink = document.createElement("a");
        updateLink.id = "update_link";
        updateLink.innerHTML = "Ažuriraj oglas";
        updateLink.href = `ad_edit.html?id=${id}&adId=${ads[i].id}`, "_self";
        container.appendChild(updateLink);
    }
}

document.getElementById("filter").addEventListener("click", filterCat);
async function filterCat() {
    const categoryId = Number(document.getElementById("selectCat").value);
    
    const filterCat = await getAdByCategoryAndUserId(categoryId, id);
    
    if (categoryId == 0) {
        loadAds(adsOfUser);
        return;
    }
    loadAds(filterCat);
};

document.getElementById("btnAdd").addEventListener("click", function() {
    window.open(`ad_add.html?id=${id}`, "_self");
});

document.getElementById("btn_watch").addEventListener("click", function() {
    window.open(`ads.html?id=${id}`, "_self");
});

document.getElementById("btnLogOut").addEventListener("click", function() {
    window.open("../index.html", "_self");
})

window.addEventListener("load", loadPage);