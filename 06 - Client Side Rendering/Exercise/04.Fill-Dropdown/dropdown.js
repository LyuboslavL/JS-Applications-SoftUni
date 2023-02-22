import { html, render } from './node_modules/lit-html/lit-html.js';

const menuTemplate = (list) => html`
<select id="menu">
    ${list.map(x => html`<option value=${x._id}>${x.text}</option>`)}
</select>`;

const menu = document.querySelector('div');
const input = document.getElementById('itemText');
start();

async function start() {
    document.querySelector('form').addEventListener('submit', (ev) => addItem(ev, list));

    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    const data = await response.json();
    const list = Object.values(data);

    update(list);
}

function update(list) {
    const result = menuTemplate(list);
    render(result, menu)
}

async function addItem(ev, list) {
    ev.preventDefault();

    const item = {
        text: input.value
    };

    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });

    const result = await response.json();
    list.push(result);
    input.value = '';

    update(list);
}