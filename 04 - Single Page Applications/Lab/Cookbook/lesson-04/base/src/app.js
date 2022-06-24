import { setupCatalogue, showCatalogue } from './catalogue.js';
import { setupLogin, showLogin } from './login.js';
import { setupRegister, showRegister } from './register.js';
import { setupCreate, showCreate } from './create.js'
import { setupDetails } from './details.js';
import { setupEdit } from './edit.js'

main();

function main() {
    setUserNav();

    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    const catalogueSection = document.getElementById('catalogueSection');
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const createSection = document.getElementById('createSection');
    const detailsSection = document.getElementById('detailsSection');
    const editSection = document.getElementById('editSection');

    const links = {
        'catalogueLink': showCatalogue,
        'loginLink': showLogin,
        'registerLink': showRegister,
        'createLink': showCreate
    }

    setupCatalogue(main, catalogueSection, setActiveNav);
    setupLogin(main, loginSection, setActiveNav);
    setupRegister(main, registerSection, setActiveNav);
    setupCreate(main, createSection, setActiveNav);
    setupDetails(main, detailsSection, setActiveNav);
    setupEdit(main, editSection, setActiveNav);

    setupNavigation();

    // Start app in Catalogue view
    showCatalogue();

    function setActiveNav(targetId) {
        [...nav.querySelectorAll('a')].forEach(l => {
            if (l.id == targetId) {
                l.classList.add('active');
            } else {
                l.classList.remove('active');
            }
        })
    }

    function setupNavigation() {
        document.getElementById('logoutBtn').addEventListener('click', logout);

        nav.addEventListener('click', function (e) {
            if (e.target.tagName == 'A') {
                const view = links[e.target.id];
                if (typeof view == 'function') {
                    e.preventDefault();
                    view();
                }
            }
        })
    }
}

function setUserNav() {
    if (sessionStorage.getItem('authToken') != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
}

async function logout() {
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken')
        },
    });
    if (response.status == 200) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userId', data._id);
        sessionStorage.removeItem('email', data.email);

        showCatalogue();
    } else {
        console.error(await response.json());
    }
}

