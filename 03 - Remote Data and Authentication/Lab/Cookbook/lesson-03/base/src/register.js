document.querySelector('form').addEventListener('submit', onRegisterSubmit);

async function onRegisterSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('rePass');

    if (email === '' || password === '' || repass === '') {
        return alert(`All fields must be filled!`);
    } else if (password !== repass) {
        return alert(`Passwords don't match!`);
    };

    const response = await fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    });

    if (response.ok === false) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();
    sessionStorage.setItem('userToken', data.accessToken);
    window.location.pathname = '03%20-%20Remote%20Data%20and%20Authentication/Lab/Cookbook/lesson-03/base/index.html'
    // window.location.pathname = "/index.html";
}