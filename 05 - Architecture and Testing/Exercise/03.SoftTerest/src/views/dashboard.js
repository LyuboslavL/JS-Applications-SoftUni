import { e } from '../dom.js';
import { getIdeas } from '../api/data.js';

function createIdeaPreview(idea) {
    const element = e('div', { className: 'card overflow-hidden current-card details' },
        e('div', { className: 'card-body' },
            e('p', { className: 'card-text' }, idea.title)),
        e('img', { className: 'card-image', src: idea.img }),
        e('a', { id: idea._id, className: 'btn', href: '' }, 'Details'));

    return element;
}

export function setupDashboard(section, navigation) {
    section.addEventListener('click', ev => {
        ev.preventDefault();
        if (ev.target.classList.contains('btn')) {
            const ideaId = ev.target.id;
            navigation.goTo('details', ideaId);
        }
    })
    return showDashboard;

    async function showDashboard() {
        section.innerHTML = '';
        const ideas = await getIdeas();

        if (ideas.length == 0) {
            section.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>'
        } else {
            const cards = ideas.map(createIdeaPreview);
            cards.forEach(c => section.appendChild(c));
        }

        return section;
    }
}