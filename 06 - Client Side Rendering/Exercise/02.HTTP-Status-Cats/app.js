import { render, html } from './node_modules/lit-html/lit-html.js';
import { styleMap } from './node_modules/lit-html/directives/style-map.js';
import { cats } from './catSeeder.js';

/*
let catTemplate = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style="display: none" id="100">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`;

let main = document.getElementById('allCats');
const catList = html`<ul @click=${toggleInfo}>
    ${cats.map(catTemplate)}
</ul>`

render(catList, main);

function toggleInfo(event) {
    const element = event.target.parentNode.querySelector('.status');
    if (element.style.display == 'none') {
        element.removeAttribute('style');
    } else {
        element.style.display = 'none';
    }
}
*/

// USING STYLEMAP
let catTemplate = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">${cat.info ? 'Hide' : 'Show'} status code</button>
        <div class="status" style=${styleMap(cat.info ? {} : {display: 'none'})} id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`;

let main = document.getElementById('allCats');
cats.forEach(c => c.info = false);
update();

function update() {
    const catList = html`<ul @click=${toggleInfo}>
        ${cats.map(catTemplate)}
    </ul>`
    render(catList, main);
}


function toggleInfo(event) {
    const elementId = event.target.parentNode.querySelector('.status').id;
    const cat = cats.find(x => x.id == elementId);
    cat.info = !cat.info;
    update();
}
