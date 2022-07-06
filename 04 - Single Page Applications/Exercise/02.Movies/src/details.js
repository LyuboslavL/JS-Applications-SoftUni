import { e } from './dom.js';
import { showHome } from './home.js';

async function getLikesByMovieId(movieId) {
    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
    const data = await response.json();
    return data;
};

async function getOwnLikesById(id) {
    const userId = sessionStorage.getItem('userId');
    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`);
    const data = await response.json();
    return data;
}

async function getMovieById(movieId) {
    const response = await fetch('http://localhost:3030/data/movies/' + movieId);
    const data = await response.json();
    return data;
};

async function onDelete(e, movieId) {
    e.preventDefault();

    const confirmed = confirm('Are you sure you want to delete this movie?');

    if (confirmed) {
        const response = await fetch('http://localhost:3030/data/movies/' + movieId, {
            method: 'delete',
            headers: { 'X-Authorization': sessionStorage.getItem('authToken') }
        })
        if (response.ok) {
            alert('Movie deleted!');
            showHome();
        } else {
            const error = await response.json();
            return alert(error.message);
        }
    }
}

function createMovieCard(movie, likes, ownLikes) {
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
                            e('a', { className: 'btn btn-danger', href: '#', onClick: (e) => onDelete(e, movie._id) }, 'Delete'),
                            e('a', { className: 'btn btn-warning', href: '#' }, 'Edit'),
                            // e('a', { className: 'btn btn-primary' }, 'Like'),
                            e('span', { className: 'enrolled-span' }, likes + ' like' + (likes == 1 ? '' : 's'))
                        )));
        } else if (ownLikes.length == 0) {
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
                            e('a', { className: 'btn btn-primary', href: '#', onClick: likeMovie }, 'Like'),
                            e('span', { className: 'enrolled-span' }, likes + ' like' + (likes == 1 ? '' : 's'))
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
                            // e('a', { className: 'btn btn-primary', href: '#', onClick: likeMovie }, 'Like'),
                            e('span', { className: 'enrolled-span' }, likes + ' like' + (likes == 1 ? '' : 's'))
                        )));
        }
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
                        // e('a', { className: 'btn btn-primary', href: '#', onClick: likeMovie }, 'Like'),
                        e('span', { className: 'enrolled-span' }, likes + ' like' + (likes == 1 ? '' : 's'))
                    )));
    }

    async function likeMovie(event) {
        const response = await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ movieId: movie._id })
        });

        if (response.ok) {
            event.target.remove();
            likes++;
            // element.appendChild(e('span', { className: 'enrolled-span' }, likes + ' like' + (likes == 1 ? '' : 's')))
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

    const [movie, likes, ownLikes] = await Promise.all([
        getMovieById(id),
        getLikesByMovieId(id),
        getOwnLikesById(id)]);
    const card = createMovieCard(movie, likes, ownLikes);
    section.appendChild(card);
}