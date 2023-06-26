async function getAllUsers() {
    const response = await fetch("http://localhost:3000/users", {method: "GET"});
    const data = await response.json();
    return data;
}

export { getAllUsers };