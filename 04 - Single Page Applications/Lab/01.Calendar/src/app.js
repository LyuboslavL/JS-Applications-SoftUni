// 1. Create associative arrays (objects) of all sections (years, months, days);
const yearSelect = document.getElementById('years');

const years = [...document.querySelectorAll('.monthCalendar')].reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {});

const months = [...document.querySelectorAll('.daysCalendar')].reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {});

const monthNames = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sept': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12,
}

function displaySelection(section) {
    // 2. Clear the HTML;
    document.body.innerHTML = '';

    // 3. Append the Years section (Home view);
    document.body.appendChild(section);
}

displaySelection(yearSelect);

// 4. Add event listener for click event
yearSelect.addEventListener('click', function (e) {
    if (e.target.classList.contains('date') || e.target.classList.contains('day')) {
        e.stopImmediatePropagation();
        const yearId = e.target.textContent.trim();
        displaySelection(years[`year-${yearId}`]);
    }
});

document.body.addEventListener('click', function (e) {
    if (e.target.tagName == 'CAPTION') {
        const sectionId = e.target.parentNode.parentNode.id;
        if (sectionId.includes('year-')) {
            displaySelection(yearSelect);
        } else if (sectionId.includes('month-')) {
            const yearId = `year-${sectionId.split('-')[1]}`
            displaySelection(years[yearId]);
        }
    } else if (e.target.tagName == 'TD' || e.target.tagName == 'DIV') {
        const monthName = e.target.textContent.trim();
        if (monthNames.hasOwnProperty(monthName)) {
            // let parent = e.target.parentNode;
            // while (parent.tagName != 'TABLE') {
            //     parent = parent.parentNode;
            // }

            const year = e.currentTarget.querySelector('caption').textContent.trim();
            const monthId = `month-${year}-${monthNames[monthName]}`;
            displaySelection(months[monthId]);
        }
    }
})


// - find out if user has clicked on year, month or back button;
// - remove current view and change with the requested view;