// function solve() {
//     const departBtn = document.getElementById('depart');
//     const arriveBtn = document.getElementById('arrive');
//     const banner = document.querySelector('#info span');

//     let stop = {
//         next: 'depot'
//     }


//     async function depart() {
//         let url = 'http://localhost:3030/jsonstore/bus/schedule/' + stop.next;

//         let response = await fetch(url);
//         let data = await response.json();
        
//         stop = data;
//         banner.textContent = `Next stop ${stop.name}`;


//         departBtn.disabled = true;
//         arriveBtn.disabled = false;
//     }

//     function arrive() {
//         banner.textContent = `Arriving at ${stop.name}`;

//         departBtn.disabled = false;
//         arriveBtn.disabled = true;
//     }

//     return {
//         depart,
//         arrive
//     };
// }

function solve2() {
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let infoField = document.querySelector('#info span');

    let stop = {
        next: 'depot'
    };

    async function depart() {
        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + stop.next;

        let response = await fetch(url);
        let data = await response.json();
        stop = data;

        infoField.textContent = `Next stop ${stop.name}`;

        departBtn.disabled = true;
        arriveBtn.disabled = false;
        
    };

    function arrive() {
        infoField.textContent = `Arriving at ${stop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    }
}

let result = solve2();