import { register } from '../api/data.js';

export function setupRegister(section, navigation) {
    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);

    return showRegister;

    async function showRegister() {
        return section;
    };

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(form);

        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('repeatPassword');

        if (email == '' || password == '') {
            return alert('All fields are required!');
        } else if (password !== rePass) {
            return alert(`Passwords don't match!`);
        };

        await register(email, password);
        form.reset();
        navigation.setUserNav();
        navigation.goTo('home');
    }
}