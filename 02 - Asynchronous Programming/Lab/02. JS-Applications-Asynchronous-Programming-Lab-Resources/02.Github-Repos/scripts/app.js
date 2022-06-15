function loadRepos() {
	let url = 'https://api.github.com/users/';
	let usernameInput = document.getElementById('username');
	let reposField = document.getElementById('repos');
	// reposField.removeChild(reposField.firstChild);

	fetch(`${url}${usernameInput.value}/repos`)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((repo) => {
				let li = document.createElement('li');
				let aTag = document.createElement('a');
				aTag.setAttribute('href', repo.html_url);
				aTag.textContent = repo.full_name;
				li.appendChild(aTag);
				reposField.appendChild(li);
			})
		})
		.catch((error) => console.log(error));
}