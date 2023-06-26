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

export { registerUser, getUserByUsername };