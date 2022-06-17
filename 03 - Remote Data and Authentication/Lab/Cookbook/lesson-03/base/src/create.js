document.querySelector('form').addEventListener('submit', onCreateSubmit);

async function onCreateSubmit(e) {
    e.preventDefault();
    const userToken = sessionStorage.getItem('userToken');

    const formData = new FormData(e.target);

    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData.get('ingredients')
        .split('\n')
        .map(l => l.trim())
        .filter(l => l !== '');
    const steps = formData.get('steps')
        .split('\n')
        .map(s => s.trim())
        .filter(s => s !== '');

    const response = await fetch('http://localhost:3030/data/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userToken
        },
        body: JSON.stringify({ name, img, ingredients, steps })
    });

    if (response.ok === false) {
        const error = await response.json();
        return error.message;
    };

    console.log(name, img, ingredients, steps);

    window.location.pathname = '03%20-%20Remote%20Data%20and%20Authentication/Lab/Cookbook/lesson-03/base/index.html';
}