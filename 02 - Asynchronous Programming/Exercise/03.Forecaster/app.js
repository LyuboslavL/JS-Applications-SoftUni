function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather);
}

attachEvents();

async function getWeather() {
    const input = document.getElementById('location');
    const cityName = input.value;

    const code = await getCode(cityName);

    const [current, upcoming] = await Promise.all([
        getCurrent(code.code),
        getUpcoming(code.code)
    ]);

    document.getElementById('forecast').style.display = 'block';

    let currentField = document.getElementById('current');
    let currentWeather = currentWeatherPreview(current);
    currentField.appendChild(currentWeather);

    let upcomingField = document.getElementById('')
};

async function getCode(cityName) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';

    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);

    return data.find(x => x.name.toLowerCase() == cityName.toLowerCase());
};

async function getCurrent(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;

    const response = await fetch(url);
    const data = await response.json();

    return data;
};

async function getUpcoming(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;

    const response = await fetch(url);
    const data = await response.json();

    return data;
};

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);
    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}

function currentWeatherPreview(data) {
    let currentWeather = e('div', { className: 'forecasts' },
        e('span', { className: 'condition symbol' }),
        e('span', { className: 'condition' },
            e('span', { className: 'forecast-data' }, data.name),
            e('span', { className: 'forecast-data' }, `${data.forecast.low}°/${data.forecast.high}°`),
            e('span', { className: 'forecast-data' }, data.forecast.condition)));

    return currentWeather;
}