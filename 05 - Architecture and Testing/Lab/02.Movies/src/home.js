import { e } from './dom.js';
import { showDetails } from './details.js';

async function getMovies() {
    const response = await fetch('http://localhost:3030/data/movies');
    const data = await response.json();

    return data;
}

function createMoviePreview(movie) {
    const element = e('div', { className: 'card mb-4' },
        e('img', { className: 'card-img-top', src: movie.img, alt: 'Card image cap', width: '400' }),
        e('div', { className: 'card-body' }, e('h4', { className: 'card-title' }, movie.title)),
        e('div', { className: 'card-footer' }, e('button', { type: 'button', className: 'btn btn-info movieDetailsLink', id: movie._id }, 'Details')));

    return element;
}

let main;
let section;
let containter;

export function setupHome(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    containter = section.querySelector('.card-deck.d-flex.justify-content-center');

    containter.addEventListener('click', function(e) {
        if (e.target.classList.contains('movieDetailsLink')) {
            showDetails(e.target.id);
        }
    })
}

export async function showHome() {
    containter.innerHTML = 'Loading...';    
    main.innerHTML = '';
    main.appendChild(section);

    const movies = await getMovies();
    const cards = movies.map(createMoviePreview);

    const fragment = document.createDocumentFragment();
    cards.forEach(c => fragment.appendChild(c));

    containter.innerHTML = '';
    containter.appendChild(fragment);
}