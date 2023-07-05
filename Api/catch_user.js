async function getUserById(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {method: "GET"});
    const data = await response.json();
    return data;
}

async function getAdsOfUser(user_id) {
    const response = await fetch(`http://localhost:3000/ads?user_id=${user_id}`, {method: "GET"});
    const data = await response.json();
    return data;
}

async function getCategoryById(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {method: "GET"});
    const data = await response.json();
    return data;
}

async function deleteAd(id) {
    const response = await fetch(`http://localhost:3000/ads/${id}`, {method: "DELETE"});
    const data = await response.json();
    return data;
}

async function getAllCategories() {
    const response = await fetch("http://localhost:3000/categories", {method: "GET"});
    const data = await response.json();
    return data;
}

async function getAdByCategoryAndUserId(id, user_id) {
    const response = await fetch(`http://localhost:3000/ads?category_id=${id}&user_id=${user_id}`, {method: "GET"});
    const data = await response.json();
    return data;
}

export { getUserById, getAdsOfUser, getCategoryById, deleteAd, getAllCategories, getAdByCategoryAndUserId };