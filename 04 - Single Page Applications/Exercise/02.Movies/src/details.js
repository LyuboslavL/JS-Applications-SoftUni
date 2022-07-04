import { e } from './dom.js';

async function getMovieById(movieId) {
    const response = await fetch('http://localhost:3030/data/movies/' + movieId);
    const data = await response.json();
    return data;
};

function createMovieCard(movie) {
    const userId = sessionStorage.getItem('userId');
    let element;

    if (userId !== null) {
        if (userId == movie._ownerId) {
            element =
                e('div', { className: 'container' },
                    e('div', { className: 'row bg-light text-dark' },
                        e('h1', {}, `Movie title: ${movie.title}`),
                        e('div', { className: 'col-md-8' },
                            e('img', { className: 'img-thumbnail', src: movie.img, alt: 'Movie' })),
                        e('div', { className: 'col-md-4 text-center' },
                            e('h3', { className: 'my-3 ' }, 'Movie Description'),
                            e('p', {}, movie.description),
                            e('a', { className: 'btn btn-danger' }, 'Delete'),
                            e('a', { className: 'btn btn-warning' }, 'Edit'),
                            // e('a', { className: 'btn btn-primary' }, 'Like'),
                            e('span', { className: 'enrolled-span' }, 'Liked 1')
                        )));
        } else {
            element =
                e('div', { className: 'container' },
                    e('div', { className: 'row bg-light text-dark' },
                        e('h1', {}, `Movie title: ${movie.title}`),
                        e('div', { className: 'col-md-8' },
                            e('img', { className: 'img-thumbnail', src: movie.img, alt: 'Movie' })),
                        e('div', { className: 'col-md-4 text-center' },
                            e('h3', { className: 'my-3 ' }, 'Movie Description'),
                            e('p', {}, movie.description),
                            // e('a', { className: 'btn btn-danger' }, 'Delete'),
                            // e('a', { className: 'btn btn-warning' }, 'Edit'),
                            e('a', { className: 'btn btn-primary' }, 'Like'),
                            e('span', { className: 'enrolled-span' }, 'Liked 1')
                        )));
        }
    }

    return element;
}

let main;
let section;

export function setupDetails(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showDetails(id) {
    section.innerHTML = '';
    main.innerHTML = '';
    main.appendChild(section);

    const movie = await getMovieById(id);
    const card = createMovieCard(movie);
    section.appendChild(card);
}