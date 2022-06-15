function attachEvents() {
    let loadPostsButton = document.getElementById('btnLoadPosts');
    let viewButton = document.getElementById('btnViewPost');

    loadPostsButton.addEventListener('click', getPosts);
    viewButton.addEventListener('click', displayPost)
    
}

attachEvents();

async function getPosts() {
    let url = 'http://localhost:3030/jsonstore/blog/posts';
    let dropdownMenu = document.getElementById('posts');
    dropdownMenu.innerHTML = '';


    let response = await fetch(url);
    let data = await response.json();
    
    return Object.values(data).map(subject => {
        let subjectName = subject.title.toUpperCase();
        let option = createElement('option', 'value', subject.id, subjectName);
        dropdownMenu.appendChild(option);
    })
};

function displayPost() {
    let selectedOptionId = document.getElementById('posts').value;
    getCommentsByPostId(selectedOptionId);
}

async function getCommentsByPostId(postId) {
    const commentsUl = document.getElementById('post-comments');
    commentsUl.innerHTML = '';

    const postUrl = 'http://localhost:3030/jsonstore/blog/posts/' + postId;
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const [postResponse, commentsResponse] = await Promise.all([
        fetch(postUrl),
        fetch(commentsUrl)
    ])

    const postData = await postResponse.json();

    document.getElementById('post-title').textContent = postData.title;
    document.getElementById('post-body').textContent = postData.body;

    const commentsData = await commentsResponse.json();
    const comments = Object.values(commentsData).filter((x) => x.postId == postId);

    comments.map((x) => {
        return createElement('li', 'id', x.id, x.text)
    }).forEach(c => commentsUl.appendChild(c));
};

function createElement(type, attribute, attributeValue, content) {
    let element = document.createElement(type);
    if (attribute === 'value') {
        element.value = attributeValue;
    } else {
        element.id = attributeValue;
    }

    element.textContent = content;
    return element;
};