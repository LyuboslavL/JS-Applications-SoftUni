async function getInfo() {
    let input = document.getElementById('stopId');
    let id = input.value;
    
    let url = 'http://localhost:3030/jsonstore/bus/businfo/' + id;
    
    try {
        let ulList = document.getElementById('buses');
        ulList.innerHTML = '';
        
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        document.getElementById('stopName').textContent = data.name;
        Object.entries(data.buses).map(([bus, minutes]) => {
            let liElement = document.createElement('li');
            liElement.textContent = `Bus ${bus} arrives in ${minutes} minutes`;
            ulList.appendChild(liElement);
            input.value = '';
        })
    } catch(error) {
        document.getElementById('stopName').textContent = 'Error';        
    }
}