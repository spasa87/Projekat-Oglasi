import { getAllUsers } from "../Api/catch_logIn.js";

const btnLogIn = document.getElementById("logIn");
btnLogIn.addEventListener("click", async function() {
    const text = document.getElementById("errorMessage");
    text.innerHTML = "";
    const username = document.getElementById("inputUsername").value;
    const password = document.getElementById("inputPassword").value;
    const users = await getAllUsers();

    if (username == "" || password == "") {
        text.innerHTML = "Niste popunili sva polja.";
        return;
    }

    for (let i = 0; i < users.length; i++) {
        if (username === users[i].username && password === users[i].password) {
            if (users[i].admin == true) {
                window.open(`admin.html?id=${users[i].id}`, "_self");
                text.innerHTML = "Dobro došli.";
                return;
            } else {
                window.open(`user.html?id=${users[i].id}`, "_self");
                text.innerHTML = "Dobro došli.";
                return;
            }
        } else {
            text.innerHTML = "Korisnik sa unetim korisničkim imenom i šifrom ne postoji.";
        }
    }
});