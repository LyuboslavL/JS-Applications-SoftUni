function getInfo() {
    let code = document.getElementById('stopId');
    let stopName = document.getElementById('stopName');
    let busesUl = document.getElementById('buses');

    getSchedule(code.value);

    async function getSchedule(stopCode) {
        let url = 'http://localhost:3030/jsonstore/bus/businfo/' + stopCode;
    
        try {
            const response = await fetch(url);
            const data = await response.json();

            stopName.textContent = data.name;
            code.value = '';
            busesUl.innerHTML = '';
            Object.entries(data.buses).map(([bus, minutes]) => {
                let li = document.createElement('li');
                li.textContent = `Bus ${bus} arrives in ${minutes} minutes.`;
                busesUl.appendChild(li);
            })
        } catch (error) {
            alert(error);
        }
    }
}