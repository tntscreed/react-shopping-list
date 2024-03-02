export async function fetchItems(url) {
    const response = await fetch(url);
    return response.json();
}

export async function addItem([url, item, _id]) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
    return response.json();
}

// The arguments can only be passed in as a list for some reason.
// I don't know why, but this is the only way it works.
export async function editItem([url, item, id]) {
    const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
    return response.json();
}

export async function removeItem([url, id]) {
    const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
    });
    return response.json();
}