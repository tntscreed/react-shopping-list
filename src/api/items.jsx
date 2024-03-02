export async function fetchItems(url) {
    const response = await fetch(url);
    return response.json();
}

export async function addItem(url, item) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
    return response.json();
}

export async function removeItem(url, id) {
    const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
    });
    return response.json();
}