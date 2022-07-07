import { showHome } from './home.js'

let main;
let section;

export function setupRegister(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form = section.querySelector('form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(form);

        const email = formData.get('email');
        const password = formData.get('password');
        const rePassword = formData.get('repeatPassword');

        if (email == '' || password == '') {
            return alert('All fields are required!');
        } else if (password != rePassword) {
            return alert('Passwords don\'t match!');
        }

        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            e.target.reset();
            const data = await response.json();
            sessionStorage.setItem('authToken', data.accessToken);
            sessionStorage.setItem('userId', data._id);
            sessionStorage.setItem('email', data.email);

            document.getElementById('welcome-msg').textContent = `Welcome, ${email}`;
            [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'block');
            [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'none');

            showHome();
        } else {
            const error = await response.json();
            alert(error.message);
        }
    })
}

export async function showRegister() {
    main.innerHTML = '';
    main.appendChild(section);
}