const BASE_URL = 'http://localhost:3000';

export const api = {
    get : (url) => fetch(`${BASE_URL}${url}`).then(res => res.json()),

    post : (url, data) => fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),



    delete : (url) => fetch(`${BASE_URL}${url}`, { method: 'DELETE' }),
    put : (url, data) => fetch(`${BASE_URL}${url}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json())

        
    };


