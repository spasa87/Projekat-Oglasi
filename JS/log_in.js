import { getAllUsers } from "./catch.js";

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
                return;
            } else {
                // window.open(`user.html?id=${users[i].id}`, "_self");
                console.log("Uspesna prijava korisnika."); //Kada prijavim korisnika kod nastavlja dalje i ulazi u sledeci else. To nam i nije bitno posto ce da otvori novu stranicu pa se poruka nece videti. Barem ja tako mislim :)
                return;
            }
        } else {
            text.innerHTML = "Korisnik sa unetim korisničkim imenom i šifrom ne postoji.";
        }
    }
})