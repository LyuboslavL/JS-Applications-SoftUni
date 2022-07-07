import { showDetails } from './details.js'

let main;
let section;

export function setupCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form = section.querySelector('form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const movie = {
            title: formData.get('title'),
            description: formData.get('description'),
            img: formData.get('imageUrl')
        };

        if (movie.title == '' || movie.description == '' || movie.img == '') {
            return alert('All fields are required!');
        };

        const response = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify(movie)
        });

        if (response.ok) {
            const movie = await response.json();
            showDetails(movie._id);

        } else {
            const error = await response.json();
            return alert(error.message);
        }
    })
}

export async function showCreate() {
    main.innerHTML = '';
    main.appendChild(section);
}