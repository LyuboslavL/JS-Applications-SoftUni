import { e } from './dom.js'

async function getRecipeById(id) {
    const response = await fetch('http://localhost:3030/data/recipes/' + id);
    const recipe = await response.json();

    return recipe;
}

function createRecipeCard(recipe) {
    const result = e('article', {},
        e('h2', {}, recipe.name),
        e('div', { className: 'band' },
            e('div', { className: 'thumb' }, e('img', { src: recipe.img })),
            e('div', { className: 'ingredients' },
                e('h3', {}, 'Ingredients:'),
                e('ul', {}, recipe.ingredients.map(i => e('li', {}, i))),
            )
        ),
        e('div', { className: 'description' },
            e('h3', {}, 'Preparation:'),
            recipe.steps.map(s => e('p', {}, s))
        ),
    );

    return result;
}

let main;
let section;
let setActiveNav;

export function setupDetails(mainTarget, sectionTarget, setActiveNavCb) {
    main = mainTarget;
    section = sectionTarget;
    setActiveNav = setActiveNavCb;
}

export async function showDetails(id) {
    setActiveNav();
    section.innerHTML = '<p style="color: white">Loading...</p>'
    main.innerHTML = '';
    main.appendChild(section);

    const recipe = await getRecipeById(id);
    const card = createRecipeCard(recipe);

    section.innerHTML = '';
    section.appendChild(card);
}