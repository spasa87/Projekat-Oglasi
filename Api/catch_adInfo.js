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

async function getUserById(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {method: "GET"});
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

async function getCommentsForAd(ad_id) {
    const response = await fetch(`http://localhost:3000/comments?adId=${ad_id}`, {method: "GET"});
    const data = await response.json();
    return data;
}

async function addComment(text, adId, userId) {
    const response = await fetch("http://localhost:3000/comments", {method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        text: text,
        adId: adId,
        userId: userId
        })
    });
    const data = await response.json();
    return data;
}

async function getLikesOfAd(ad_id) {
    const response = await fetch(`http://localhost:3000/likes?ad_id=${ad_id}`, {method: "GET"});
    const data = response.json();
    return data;
}

async function addLike(ad_id, user_id) {
    const response = await fetch("http://localhost:3000/likes", {method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        ad_id: ad_id,
        user_id: user_id
        })
    });
    const data = await response.json();
    return data;
}

async function dislike(id) {
    const response = await fetch(`http://localhost:3000/likes/${id}`, {method: 'DELETE'})
    const data = await response.json()
    return data
}

async function deleteComment(id) {
    const response = await fetch(`http://localhost:3000/comments/${id}`, {method: 'DELETE'})
    const data = await response.json()
    return data
}

export { getAdById, getCategoryById, getUserById,
    updateAd, getCommentsForAd, addComment,
    getLikesOfAd, addLike, dislike,
    deleteComment };