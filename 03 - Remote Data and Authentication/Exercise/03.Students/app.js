function attachEvents() {
    const form = document.getElementById('form');
    form.addEventListener('submit', studentsSubmit);
};


async function studentsSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = Number(formData.get('facultyNumber'));
    const grade = Number(formData.get('grade'));

    if (firstName === '' || lastName === '' || facultyNumber === '' || grade === '') {
        alert('All fields must be properly filled!');
        return;
    };

    console.log(firstName, lastName, facultyNumber, grade);

    const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstName, lastName, facultyNumber, grade})
    });

    loadStudents();
};

async function loadStudents() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    
    const response = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = await response.json();

    const studentsList = Object.values(data).map(student => {
        let tr = document.createElement('tr');
        
        let firstNameTd = document.createElement('td');
        firstNameTd.textContent = student.firstName;
        tr.appendChild(firstNameTd);

        let lastNameTd = document.createElement('td');
        lastNameTd.textContent = student.lastName;
        tr.appendChild(lastNameTd);

        let facultyNumberTd = document.createElement('td');
        facultyNumberTd.textContent = student.facultyNumber;
        tr.appendChild(facultyNumberTd);

        let gradeTd = document.createElement('td');
        gradeTd.textContent = student.grade;
        tr.appendChild(gradeTd);

        tbody.appendChild(tr);
    });
};

attachEvents();