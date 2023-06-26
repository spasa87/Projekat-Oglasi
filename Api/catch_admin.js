async function getUserById(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {method: "GET"});
    const data = await response.json();
    return data;
}

async function getAllCategories() {
    const response = await fetch("http://localhost:3000/categories", {method: "GET"});
    const data = await response.json();
    return data;
}

async function deleteCategory(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {method: "DELETE"});
    const data = await response.json();
    return data;
}

export { getUserById, getAllCategories, deleteCategory };