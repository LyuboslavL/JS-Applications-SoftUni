async function getRecipeList() {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes';
    const main = document.querySelector('main');

    // fetch method 
    /* 
    fetch(url)
        .then((promise) => promise.json())
        .then((data) => {
            main.innerHTML = '';
            Object.values(data).forEach(recipe => {
                const result = e('article', { className: 'preview'},
                    e('div', { className: 'title'}, e('h2', {}, recipe.name)),
                    e('div', { className: 'small'}, e('img', {src: recipe.img}))
                );
                main.appendChild(result);
            })
        })
        .catch(error => {
            alert(error.message);
        })
    */

    // async method
    try {
        let response = await fetch(url);
        let data = await response.json();

        main.innerHTML = '';
        Object.values(data).map(createPreview).forEach(r => main.appendChild(r));
    } catch (error) {
        alert(error.message);
    }
}

function createPreview(recipe) {
    const result = e('article', { className: 'preview' },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img }))
    );

    result.addEventListener('click', () => getRecipeDetails(recipe._id, result));
    return result;
}

async function getRecipeDetails(id, preview) {
    const url = 'http://localhost:3030/jsonstore/cookbook/details/' + id;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const result = e('article', {}, 
            e('h2', {onclick: toggleCard}, data.name), 
            e('div', {className: 'band'},
                e('div', {className: 'thumb'}, e('img', {src: data.img})),
                e('div', {className: 'ingredients'},
                    e('h3', {}, 'Ingredients:'),
                    e('ul', {}, data.ingredients.map(i => e('li', {}, i)))
                )
            ),
            e('div', {className: 'description'}, 
                e('h3', {}, 'Preparation:'),
                data.steps.map(step => e('p', {}, step))
            )
            );

        // preview.parentNode.replaceChild(result, preview);
        preview.replaceWith(result);

        function toggleCard() {
            result.replaceWith(preview);
        }
    } catch (error) {
        alert(error.message);
    }

}

window.addEventListener('load', () => {
    getRecipeList();
});

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);
    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}