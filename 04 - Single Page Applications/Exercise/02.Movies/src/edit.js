import { getMovieById, showDetails } from './details.js';

let main;
let section;

async function onSubmit(data) {
    const movieId = data.id;
    console.log(movieId);

    const body = JSON.stringify({
        title: data.title,
        description: data.description,
        img: data.img
    });

    if (body.title == '' || body.description == '' || body.img == '') {
        return alert('All fields are required!');
    };

    const token = sessionStorage.getItem('authToken');
    if (token == null) {
        return alert('You are not logged in!');
    }

    try {
        const response = await fetch('http://localhost:3030/data/movies/' + movieId, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body
        });

        if (response.status == 200) {
            showDetails(movieId)
        } else {
            throw new Error(await response.json());
        }
    } catch (err) {
        console.error(err.message);
    }
}

export function setupEdit(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;


    const form = section.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));
}

export async function showEdit(id) {
    main.innerHTML = '';
    main.appendChild(section);

    const movie = await getMovieById(id);

    section.querySelector('[name="id"]').value = id;
    section.querySelector('[name="title"]').value = movie.title;
    section.querySelector('[name="description"]').value = movie.description;
    section.querySelector('[name="imageUrl"]').value = movie.img;
}