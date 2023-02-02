import { e } from '../dom.js';
import { getIdeaById, delIdea } from '../api/data.js';

function createIdeaCard(idea, isOwner, goTo) {
    // const result = document.createDocumentFragment();
    const element =
        e('div', { id: 'details-page', classList: 'container home some' },
            e('img', { classList: 'det-img', src: idea.img }),
            e('div', { classList: 'desc' },
                e('h2', { classList: 'display-5' }, idea.title),
                e('p', { classList: 'infoType' }, 'Description:'),
                e('p', { classList: 'idea-description' }, idea.description)
            ));

    if (isOwner) {
        element.appendChild(e('div', { classList: 'text-center' },
            e('a', { classList: 'btn detb', href: '', onClick: onDel }, 'Delete')));
    };

    return element;

    async function onDel(ev) {
        ev.preventDefault();
        const confirmed = confirm('Are you sure you want to delete this recipe?');

        if (confirmed) {
            await delIdea(idea._id);
            goTo('dashboard');
        }
    }
}

export function setupDetails(section, navigation) {
    return showDetails;

    async function showDetails(id) {
        section.innerHTML = '';

        const idea = await getIdeaById(id);

        let isOwner = false;
        const userId = sessionStorage.getItem('userId');
        if (userId == idea._ownerId) {
            isOwner = true;
        };

        const card = createIdeaCard(idea, isOwner, navigation.goTo);
        section.appendChild(card);

        return section;
    }
}