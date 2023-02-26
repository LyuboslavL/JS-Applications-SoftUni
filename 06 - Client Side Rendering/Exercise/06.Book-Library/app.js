import * as api from './api.js';
import { layoutTemplate } from './templates.js';
import { render } from './node_modules/lit-html/lit-html.js';

const onSubmit = {
    'add-form': onCreateSubmit,
    'edit-form': onEditSubmit
}

const context = {
    list: [],
    async load() {
        context.list = await api.getAllBooks();
        update();
    },
    onEdit(id) {
        const book = context.list.find(b => b._id == id);
        update(book);
    },
    async onDelete(id) {
        await api.deleteBook(id);
        context.load();
    }
}

document.body.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSubmit[event.target.id](formData, event.target);
})

start();

async function start() {
    update();
};

function update(bookToEdit) {
    const result = layoutTemplate(context, bookToEdit);
    render(result, document.body);
};

async function onCreateSubmit(formData, form) {
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    };

    await api.createBook(book);
    form.reset();
    // update();
    context.load();
};

async function onEditSubmit(formData, form) {
    const id = formData.get('_id');
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    };

    await api.updateBook(id, book);
    form.reset();
    context.load();
};