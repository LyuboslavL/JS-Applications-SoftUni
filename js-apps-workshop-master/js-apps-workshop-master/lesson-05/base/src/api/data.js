// import { get, post, put, del } from './api.js';
import * as api from './api.js';

const host = 'http://localhost:3030/';

export async function getRecipes() {
    return api.get(host + 'data/recipes?select=' + encodeURIComponent('_id,name,img'));
}

export async function createRecipe(body) {
    const token = sessionStorage.getItem('authToken');
    if (token == null) {
        return alert('You\'re not logged in!');
    }

    const response = await fetch(host + '/data/recipes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body
    });

    if (response.status == 200) {

    } else {
        const error = await response.json();
        throw new Error(error.message);
    }
}