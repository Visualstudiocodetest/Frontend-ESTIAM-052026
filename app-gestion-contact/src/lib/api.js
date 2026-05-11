const BASE_URL = 'http://localhost:3000';

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': 'Bearer ' + token } : {};
}

export const api = {
    get: (url) => fetch(`${BASE_URL}${url}`, {
        headers: {
            ...getAuthHeaders()
        }
    }).then(res => res.json()),

    post: (url, data) => fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        },
        body: JSON.stringify(data)
    }).then(res => res.json()),

    delete: (url) => fetch(`${BASE_URL}${url}`, {
        method: 'DELETE',
        headers: {
            ...getAuthHeaders()
        }
    }),

    put: (url, data) => fetch(`${BASE_URL}${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
};


