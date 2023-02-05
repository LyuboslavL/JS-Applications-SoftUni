import { html, render } from './node_modules/lit-html/lit-html.js';


const listTemplate = (data) => html`
<ul>
    ${data.map(t => html`<li>${t}</li>`)}
</ul>
`;

// Step 1: Add click listener on Load button
document.getElementById('btnLoadTowns').addEventListener('click', updateList);

function updateList(ev) {
    ev.preventDefault();
    // Step 2: Parse the inputed cities
    const townAsStrings = document.getElementById('towns').value;
    if (townAsStrings.trim().length == 0) {
        return alert('Add cities!');
    }

    const towns = townAsStrings.split(', ').map(x => x.trim());
    // Step 3: Execute template
    const result = listTemplate(towns);

    // Step 4: Render content and attach to DOM
    const root = document.getElementById('root');
    render(result, root);
    document.getElementById('towns').value = '';
}



