import { render } from './node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js';
import cardTemplate from './cardTemplate.js';

const container = document.getElementById('contacts');
container.addEventListener('click', onClick);

const result = contacts.map(cardTemplate);
// console.log(result);
render(result, container);

function onClick(ev) {
    if (ev.target.classList.contains('detailsBtn')) {
        const element = ev.target.parentNode;
        const currentStyle = element.querySelector('.details').style.display;
        if (currentStyle == 'block') {
            element.querySelector('.details').style.display = 'none';
        } else {
            element.querySelector('.details').style.display = 'block';
        };
    }
};