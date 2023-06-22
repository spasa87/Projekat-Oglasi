import { getUserById, getAllCategories, deleteCategory } from "./catch.js";

const urlSearch = window.location.search;
const splitUrl = urlSearch.split("=");
const idOfUser = Number(splitUrl[1]);

document.getElementById("category_add").addEventListener("click", function() {
    window.open(`category_add.html?id=${idOfUser}`, "_self");
});

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

        const number = document.createElement("td");
        number.innerHTML = i + 1;
        tr.appendChild(number);
        const name = document.createElement("td");
        name.innerHTML = categories[i].name;
        tr.appendChild(name);
        const images = document.createElement("td");
        tr.appendChild(images);
        const img = document.createElement("img");
        img.src = categories[i].image;
        images.appendChild(img);
        const tdDelete = document.createElement("td");
        const btnDel = document.createElement("button");
        btnDel.innerHTML = "X";
        btnDel.title = "Delete category";
        tdDelete.appendChild(btnDel);
        btnDel.addEventListener("click", async function() {
            await deleteCategory(categories[i].id);
            this.parentNode.parentNode.remove();
        });
        tr.appendChild(tdDelete);
        const azuriranje = document.createElement("td");
        const link = document.createElement("a");
        link.href = `category_edit.html?idOfuser=${idOfUser}&idOfCategory=${categories[i].id}`;
        link.classList = "link";
        link.title = `Update ${categories[i].name}`;
        link.innerHTML = "&#x261C";
        azuriranje.appendChild(link);
        tr.appendChild(azuriranje);
    }
}

window.addEventListener("load", loadPage);