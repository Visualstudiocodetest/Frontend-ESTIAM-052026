const BASE_URL = 'http://localhost:3000';

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': 'Bearer ' + token } : {};
}

async function request(url, options = {}) {
    const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...options.headers
        }
    });

    if (response.status === 204) {
        if (!response.ok) {
            throw new Error('Une erreur est survenue');
        }
        return null;
    }

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Une erreur est survenue');
    }

    return data;
}

export const api = {
    get: (url) => request(url),

    post: (url, data) => request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }),

    delete: (url) => request(url, {
        method: 'DELETE'
    }),

    put: (url, data) => request(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }),

    patch: (url, data) => request(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

};