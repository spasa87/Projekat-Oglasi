async function addAd(title, description, price, image, category_id, user_id) {
    const response = await fetch("http://localhost:3000/ads", {method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        image: image,
        category_id: category_id,
        user_id: user_id
        })
    });
    const data = await response.json();
    return data;
}

async function getAllCategories() {
    const response = await fetch("http://localhost:3000/categories", {method: "GET"});
    const data = await response.json();
    return data;
}

export { addAd, getAllCategories };