async function request(url, options) {
    const response = await fetch(url, options);
    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    const data = await response.json();
    return data;
};

async function getAllBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');
    document.querySelector('tbody').innerHTML = '';
    Object.entries(books).map(createRow);
};

function createRow([id, book]) {

    let tr = document.createElement('tr');
    let titleTd = document.createElement('td');
    titleTd.textContent = book.title;
    let authorTd = document.createElement('td');
    authorTd.textContent = book.author;
    let buttonsTd = document.createElement('td');
    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.setAttribute('class', 'editBtn')
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('class', 'deleteBtn')


    buttonsTd.appendChild(editBtn);
    buttonsTd.appendChild(deleteBtn);


    tr.appendChild(titleTd);
    tr.appendChild(authorTd);
    tr.appendChild(buttonsTd);
    tr.setAttribute('id', id);

    let tbody = document.querySelector('tbody');

    tbody.appendChild(tr);
}

async function createBook(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('title');
    const author = formData.get('author');

    await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title, author})
    });

    getAllBooks();
    e.target.reset();
};

async function updateBook(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const id = formData.get('id');
    const title = formData.get('title');
    const author = formData.get('author');

    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title, author})
    });

    document.getElementById('editForm').style.display = 'none';
    document.getElementById('createForm').style.display = 'block';

    getAllBooks();
    e.target.reset();
};

async function deleteBook(id) {
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    });

    getAllBooks();
};

function libraryFunctionality() {
    document.getElementById('loadBooks').addEventListener('click', getAllBooks);
    document.getElementById('createForm').addEventListener('submit', createBook);
    document.querySelector('table').addEventListener('click', editOrDelete);
    document.getElementById('editForm').addEventListener('submit', updateBook);

    getAllBooks();
};

libraryFunctionality();

function editOrDelete(e) {
    if (e.target.className == 'editBtn') {
        document.getElementById('editForm').style.display = 'block';
        document.getElementById('createForm').style.display = 'none';

        let bookId = e.target.parentNode.parentNode.id;
        loadBookForEditing(bookId);
    } else if (e.target.className == 'deleteBtn') {
        const confirmation = confirm('Are you sure you want to delete this book?');
        if (confirmation) {
            let bookId = e.target.parentNode.parentNode.id;
            deleteBook(bookId);
        }
    }
};

async function loadBookForEditing(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);

    document.querySelector('#editForm [name="id"]').value = id;
    document.querySelector('#editForm [name="title"]').value = book.title;
    document.querySelector('#editForm [name="author"]').value = book.author;
}