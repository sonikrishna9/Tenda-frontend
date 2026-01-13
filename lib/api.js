import { ENV } from "../config/env";

// Request Handlers

const request = async (url, options = {}) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    }

    const response = await fetch(`${ENV.API_BASE_URL}${url}`, config);


    if (!response.json) {
        const error = await response.json();
        throw error;
    }
    return response.json();
}



export const api = {
    get: (url) => request(url, {
        method: "GET"
    }),
    post: (url, body) => request(url, {
        method: "POST",
        body: JSON.stringify(body)
    }),
    put: (url, body) => request(url, {
        method: "PUT",
        body: JSON.stringify(body)
    }),
    delete: (url) => request(url, {
        method: "DELETE"
    })
}