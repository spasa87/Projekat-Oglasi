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

export { updateCategory, getCategoryById };