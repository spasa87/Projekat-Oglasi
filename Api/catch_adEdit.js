async function getAllCategories() {
    const response = await fetch("http://localhost:3000/categories", {method: "GET"});
    const data = await response.json();
    return data;
}

async function getAdById(id) {
    const response = await fetch(`http://localhost:3000/ads/${id}`, {method: "GET"});
    const data = await response.json();
    return data;
}

async function getCategoryById(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {method: "GET"});
    const data = await response.json();
    return data;
}

async function updateAd(id, title, description, price, image, likes, category_id, user_id) {
    const response = await fetch(`http://localhost:3000/ads/${id}`, {method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            image: image,
            likes: likes,
            category_id: category_id,
            user_id: user_id
        })});
    const data = await response.json();
    return data;
}

async function getLikesOfAd(ad_id) {
    const response = await fetch(`http://localhost:3000/likes?ad_id=${ad_id}`, {method: "GET"});
    const data = response.json();
    return data;
}

export { getAllCategories, getAdById, getCategoryById, updateAd, getLikesOfAd };