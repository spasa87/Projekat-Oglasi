import { getUserById, getAllCategories, deleteCategory } from "../Api/catch_admin.js";

const urlSearch = window.location.search;
const splitUrl = urlSearch.split("=");
const idOfUser = Number(splitUrl[1]);

async function loadPage() {
    const userInfo = await getUserById(idOfUser);
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
    loadTable();
}

async function loadTable() {
    const categories = await getAllCategories();
    const table = document.getElementById("categoryTable");
    
    for(let i = 0; i < categories.length; i++) {
        const tr = document.createElement("tr");
        table.appendChild(tr);
        const name = document.createElement("td");
        name.innerHTML = categories[i].name;
        tr.appendChild(name);
        const images = document.createElement("td");
        tr.appendChild(images);
        const img = document.createElement("img");
        img.src = categories[i].image;
        images.appendChild(img);

        const tdDelete = document.createElement("td");
        const linkDel = document.createElement("a");
        linkDel.classList = "delLink";
        tdDelete.appendChild(linkDel);
        const imgDel = document.createElement("i");
        imgDel.classList = "fa-solid fa-trash-can";
        imgDel.id = "imgDel";
        linkDel.appendChild(imgDel);
        const btnDel = document.createElement("i");
        btnDel.classList = "fa-solid fa-trash-can fa-beat-fade";
        btnDel.id = "btnDel";
        btnDel.title = `Obrisi ${categories[i].name}`;
        btnDel.addEventListener("click", async function() {
            await deleteCategory(categories[i].id);
            this.parentNode.parentNode.parentNode.remove();
            });
        linkDel.appendChild(btnDel);
        tr.appendChild(tdDelete);

        const update = document.createElement("td");
        const link = document.createElement("a");
        link.classList = "link";
        link.title = `Ažuriraj ${categories[i].name}`;
        const imgUpdate = document.createElement("i");
        imgUpdate.classList = "fa-solid fa-file-arrow-up";
        imgUpdate.id = "imgUpdate";
        link.appendChild(imgUpdate);
        const btnUpdate = document.createElement("i");
        btnUpdate.classList = "fa-solid fa-file-arrow-up fa-flip";
        btnUpdate.id = "btnUpdate";
        btnUpdate.addEventListener("click", function() {
            window.open(`category_edit.html?idOfuser=${idOfUser}&idOfCategory=${categories[i].id}`, "_self");
        });
        link.appendChild(btnUpdate);
        update.appendChild(link);
        tr.appendChild(update);
    }
}

document.getElementById("btnLogOut").addEventListener("click", function() {
    window.open("../index.html", "_self");
})

document.getElementById("btnAdd").addEventListener("click", function() {
    window.open(`category_add.html?id=${idOfUser}`, "_self");
});

window.addEventListener("load", loadPage);