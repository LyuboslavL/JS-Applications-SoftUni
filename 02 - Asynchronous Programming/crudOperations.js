async function getData() {
    const response = await fetch('http://localhost:3030/jsonstore');
    const data = await response.json();
    console.log(data);
};

async function getDataById(id) {
    const response = await fetch('http://localhost:3030/jsonstore' + id);
    const data = await response.json();
    console.log(data);
}

async function postData(data) {
    const response = await fetch('http://localhost:3030/jsonstore/', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
};

async function updateData(id, data) {
    const response = await fetch('http://localhost:3030/jsonstore/' + id, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
};

async function deteleData(id) {
    const response = await fetch('http://localhost:3030/jsonstore/' + id, {
        method: 'delete',
    });

    const result = await response.json();
    console.log(result);
};
