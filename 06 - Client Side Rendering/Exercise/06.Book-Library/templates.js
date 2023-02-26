import { html } from './node_modules/lit-html/lit-html.js';

// 1. Create the row template for every single book
// 2. Create the table template and include the row template inside
// 3. Create Add and Edit form templates
// 4. Create the whole page (layout) template and include the table template and the proper form (add or edit);
// 5. Render the content
// 6. Add event listener for "Edit" or "Delete", using delegation


const rowTemplate = (book) => html`
<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td data-id=${book._id}>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    </td>
</tr>`

const tableTemplate = (context) => html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody @click=${e => onBtnClick(e, context)}>
        ${context.list.map(rowTemplate)}
    </tbody>
</table>`

const addFormTemplate = () => html`
<form id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>`

const editFormTemplate = (book) => html`
<form id="edit-form">
    <input type="hidden" name="_id" .value=${book._id}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${book.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${book.author}>
    <input type="submit" value="Save">
</form>`

const layoutTemplate = (context, bookToEdit) => html`
<button @click=${context.load} id="loadBooks">LOAD ALL BOOKS</button>
${tableTemplate(context)}
${bookToEdit ? editFormTemplate(bookToEdit) : addFormTemplate()}`

function onBtnClick(event, context) {
    if (event.target.classList.contains('editBtn')) {
        const id = event.target.parentNode.dataset.id;
        context.onEdit(id);
    } else if (event.target.classList.contains('deleteBtn')) {
        const id = event.target.parentNode.dataset.id;
        context.onDelete(id);
    }
}

export {
    layoutTemplate
};