import { render, html } from './node_modules/lit-html/lit-html.js';

// create the template for the table row
const rowTemplate = (student, select) => html`
<tr class=${select ? 'select' : ''}>
   <td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
</tr>`;

// get the DOM elements
const tbody = document.querySelector('tbody');
const searchField = document.getElementById('searchField');

// initiate the app
start();

// get the data from the server on app start
async function start() {
   document.getElementById('searchBtn').addEventListener('click', () => {
      update(list, searchField.value);
   })

   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await response.json();
   const list = Object.values(data);
   console.log(data);

   update(list);
}

// create an update function to render the result from the server
function update(list, match = '') {
   const result = list.map(e => rowTemplate(e, compare(e, match)))
   render(result, tbody)
}

// compare the searched field with the rows
function compare(searched, match) {
   return Object.values(searched).some(v => match && v.toLowerCase().includes(match));
}
