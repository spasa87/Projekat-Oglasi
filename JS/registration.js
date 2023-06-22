import { registerUser, getUserByUsername } from "./catch.js";

const admin = document.getElementById("admin");
const user = document.getElementById("user");
let adminOrNot = true;

admin.addEventListener("change", changeToAdmin);
function changeToAdmin() {
    if(admin.checked == true) {
        user.checked = false;
        adminOrNot = true;
    }
}

user.addEventListener("change", changeToUser);
function changeToUser() {
    if(user.checked == true) {
        admin.checked = false;
        adminOrNot = false;
    }
}

document.getElementById("register").addEventListener("click", register);

async function register() {
    const name = document.getElementById("input_name").value;
    const lastName = document.getElementById("input_lastName").value;
    const username = document.getElementById("input_username").value;
    const password = document.getElementById("input_password").value;
    const confirmPass = document.getElementById("input_confirmPassword").value;
    const address = document.getElementById("input_adress").value;
    const phone = document.getElementById("input_phoneNumber").value;
    const gender = document.getElementById("male");
    let genderOfUser = "";
    const usernameCheck = await getUserByUsername(username);

    if(gender.checked) {
        genderOfUser = "M";
    } else {
        genderOfUser = "F";
    }

    let message = document.getElementById("message");
    document.getElementById("input_password").classList.remove("error");
    document.getElementById("input_confirmPassword").classList.remove("error");
    message.innerHTML = "";

    if (name == "" || lastName == "" || username == "" || password == "" || confirmPass == "" || address == "" || phone == "") {
        message.innerHTML = "Niste uneli sve podatke.";
        return;
    }

    if (password != confirmPass) {
        message.innerHTML = "Sifra i potvrda sifre moraju da se podudaraju.";
        document.getElementById("input_password").classList.add("error");
        document.getElementById("input_confirmPassword").classList.add("error");
        return;
    }

    if (username.length < 5 || password.length < 5) {
        message.innerHTML = "Korisničko ime i šifra moraju da sadrže više od 5 karaktera.";
    }

    if (usernameCheck.length == 1) {
        message.innerHTML = "Korisničko ime koje ste izabrali već je zauzeto.";
        return;
    }

    await registerUser(name, lastName, username, password, address, phone, genderOfUser, adminOrNot);

    window.open(`../index.html`, "_self");
}