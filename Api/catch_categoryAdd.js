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

export { addCategory };