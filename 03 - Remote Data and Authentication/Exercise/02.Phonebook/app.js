function attachEvents() {
    document.getElementById('btnCreate').addEventListener('click', async () => {
        const person = document.getElementById('person').value;
        const phone = document.getElementById('phone').value;

        if (person == '' || phone == '') {
            alert('All fields must be filled!');
            return;
        }

        await saveContact({ person, phone });

        document.getElementById('person').value = '';
        document.getElementById('phone').value = '';

        loadContacts();
    });

    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('phonebook').addEventListener('click', deleteContact);
};

attachEvents();

async function saveContact(message) {
    const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    });

    const data = await response.json();
};

async function loadContacts() {
    const phonebookUlElement = document.getElementById('phonebook');
    phonebookUlElement.innerHTML = '';

    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await response.json();

    const contacts = Object.values(data).map(c => {
        let phonebookUlElement = document.getElementById('phonebook');
        let liElement = document.createElement('li');
        liElement.textContent = `${c.person}: ${c.phone}`;
        liElement.setAttribute('id', c._id);

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn');

        liElement.appendChild(deleteBtn);
        phonebookUlElement.appendChild(liElement);
    });
};

async function deleteContact(e) {
    if (e.target.textContent === 'Delete') {
        let searchedId = e.target.parentNode.id;

        const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + searchedId, {
            method: 'delete'
        });

        loadContacts();
    }
}
 