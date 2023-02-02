import { setupHome } from './views/home.js';
import { setupCreate } from './views/create.js';
import { setupDashboard } from './views/dashboard.js';
import { setupDetails } from './views/details.js';
import { setupLogin } from './views/login.js';
import { setupRegister } from './views/register.js';
import { logout } from './api/data.js';

// setup views
// setup nav links
// show appropriate navigation based on user session (logged or not)
// start app in home view

const main = document.querySelector('main');
const nav = document.querySelector('nav');

const views = {};
const links = {};

const navigation = {
    goTo,
    setUserNav,
};

registerView('home', document.getElementById('home-page'), setupHome, 'homеLink');
registerView('create', document.getElementById('create-page'), setupCreate, 'createLink');
registerView('dashboard', document.getElementById('dashboard-holder'), setupDashboard, 'dashboardLink');
registerView('login', document.getElementById('login-page'), setupLogin, 'loginLink');
registerView('register', document.getElementById('register-page'), setupRegister, 'registerLink');
registerView('details', document.getElementById('details-page'), setupDetails);
document.getElementById('views').remove();


setupNavigation();

// Start app in home view
goTo('home');

function registerView(name, section, setup, linkId) {
    const view = setup(section, navigation);
    views[name] = view;
    if (linkId) {
        links[linkId] = name;
    };
}

async function goTo(name, ...params) {
    main.innerHTML = '';
    const view = views[name];
    const section = await view(...params);
    main.appendChild(section);
}

function setupNavigation() {
    setUserNav();

    nav.addEventListener('click', (ev) => {
        const viewName = links[ev.target.id];

        if (viewName) {
            ev.preventDefault();
            goTo(viewName);
        }
    });
}


async function setUserNav() {
    const token = sessionStorage.getItem('authToken');
    if (token != null) {
        [...nav.querySelectorAll('.user-nav')].forEach(el => el.style.display = 'list-item');
        [...nav.querySelectorAll('.guest-nav')].forEach(el => el.style.display = 'none');
        nav.querySelector('#logoutLink').addEventListener('click', onSubmit);
    } else {
        [...nav.querySelectorAll('.user-nav')].forEach(el => el.style.display = 'none');
        [...nav.querySelectorAll('.guest-nav')].forEach(el => el.style.display = 'list-item');
    }
}

async function onSubmit(ev) {
    ev.preventDefault();
    await logout();
    setUserNav();
    navigation.goTo('home');
}
