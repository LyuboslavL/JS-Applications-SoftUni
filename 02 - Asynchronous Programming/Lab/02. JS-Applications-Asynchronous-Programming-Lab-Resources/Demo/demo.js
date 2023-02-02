function tryIt() {
    let button = document.getElementById('clickMe');

    button.addEventListener('click', function thenCatch() {
        const url = 'https://api.github.com/users/';

        console.log('before');
        fetch(url)
            .then(response => {
                console.log('inside fetch response');
                return response.json();
            })
            .then(data => {
                console.log('inside fetch data');
                console.log('data');
            })
            .catch(error => {
                console.log(error);
            });
        console.log('after');
    });
    
}