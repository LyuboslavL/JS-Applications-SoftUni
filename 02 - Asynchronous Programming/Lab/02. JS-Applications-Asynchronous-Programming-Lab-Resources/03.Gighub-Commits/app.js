async function loadCommits() {
    let username = document.getElementById('username');
    // console.log(username.value);
    let repo = document.getElementById('repo');
    // console.log(repo.value);
    let url = 'https://api.github.com/repos';
    let ulElement = document.getElementById('commits');

    try {
        let response = await fetch(`${url}/${username.value}/${repo.value}/commits`);
        let data = await response.json();
        data.forEach((x) => {
            let liElement = document.createElement('li');
            liElement.textContent = `${x.commit.author.name}: ${x.commit.message}`
            ulElement.appendChild(liElement);
        })
    } catch (error) {
        let liElement = document.createElement('li');
        liElement.textContent = `Error: ${error.status} (Not Found)`
        ulElement.appendChild(liElement);
    }

    // fetch(`${url}${username.value}/${repo.value}/commits`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         data.forEach((repo) => {
    //             console.log(repo);
    //             let liElement = document.createElement('li');
    //             liElement.textContent = `${repo.author.name}: ${repo.message}`;
    //             ulElement.appendChild(liElement);
	// 		})
    //     })
    //     .catch((error) => {
    //         let liElement = document.createElement('li');
    //         liElement.textContent = `Error: ${error.status} (Not Found)`
    //     })
}