async function getAllCategories() {
    const response = await fetch("http://localhost:3000/categories", {method: "GET"});
    const data = await response.json();
    return data;
}

async function registerUser(first_name, last_name, username, password, address, phone_number, gender, admin) {
    const response = await fetch("http://localhost:3000/users", {method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: password,
            address: address,
            phone_number: phone_number,
            gender: gender,
            admin: admin
        })
    });
    const data = await response.json();
    return data;
}

async function getUserByUsername(username) {
    const response = await fetch(`http://localhost:3000/users?username=${username}`, {method: "GET"});
    const data = await response.json();
    return data;
}

async function getAllUsers() {
    const response = await fetch("http://localhost:3000/users", {method: "GET"});
    const data = await response.json();
    return data;
}

async function getUserById(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {method: "GET"});
    const data = await response.json();
    return data;
}

async function deleteCategory(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {method: "DELETE"});
    const data = await response.json();
    return data;
}

async function addCategory(name, image) {
    const response = await fetch("http://localhost:3000/categories", {method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: name,
        image: image
        })
    });
    const data = await response.json();
    return data;
}

async function updateCategory(id, name, image) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            image: image
        })});
    const data = await response.json();
    return data;
}

async function getCategoryById(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {method: "GET"});
    const data = await response.json();
    return data;
}

export { getAllCategories, registerUser, getUserByUsername,
    getAllUsers, getUserById, deleteCategory,
    addCategory, updateCategory, getCategoryById };