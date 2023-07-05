async function getAllAds() {
    const response = await fetch("http://localhost:3000/ads", {method: "GET"});
    const data = await response.json();
    return data;
}

async function getCategoryById(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {method: "GET"});
    const data = await response.json();
    return data;
}

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

async function getAdsByCategory(id) {
    const response = await fetch(`http://localhost:3000/ads?category_id=${id}`, {method: "GET"});
    const data = await response.json();
    return data;
}

export { getAllAds, getCategoryById, getUserById,
    getAllCategories, getAdsByCategory };