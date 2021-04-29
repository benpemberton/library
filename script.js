const cards = document.getElementById('cards');

const newBookButton = document.getElementById('new-book');

newBookButton.onclick = openModal;

const submitBookButton = document.querySelector('.submit');
console.log(submitBookButton);

submitBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    submitNewBook();
});

let myLibrary = [];

function Book(title, author, genre, pages, read) {
    this.title = title
    this.author = author
    this.genre = genre
    this.pages = pages
    this.read = read
}

function addBookToLibrary(...details) {
    myLibrary.push(new Book(...details));
}

function createLibraryCards() {
    for (let i = myLibrary.length-1; i >= 0; i--) {
        let div = document.createElement('div');
        div.setAttribute('class', 'library-card');
        let book = myLibrary[i];
        let title = document.createElement('h2');
        title.innerHTML = book['title'];
        let author = document.createElement('p');
        author.innerHTML = `By ${book['author']}`;
        let genre = document.createElement('p');
        genre.innerHTML = `Genre: ${book['genre']}`;
        let pages = document.createElement('p');
        pages.innerHTML = `Pages: ${book['pages']}`;
        let read = document.createElement('p');
        read.innerHTML = `Have I read it?: ${book['read']}`;
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(genre);
        div.appendChild(pages);
        div.appendChild(read)
        cards.appendChild(div);
    }
}

function resetCardGrid() {
    const cards = document.querySelectorAll('.library-card');
    cards.forEach((card) => {
        card.remove();
    });
}


createLibraryCards();

function openModal() {
    let background = document.getElementById('modal-background');
    let content = document.getElementById('modal-content');
    background.style.display = 'block';
    content.style.display = 'block';
}

function closeModal() {
    let background = document.getElementById('modal-background');
    let content = document.getElementById('modal-content');
    background.style.display = 'none';
    content.style.display = 'none';
}

// function stopPageRefresh(e) {
//     e.preventDefault();
//     closeModal();
// }

function submitNewBook() {
    const details = [];
    const inputs = document.getElementsByTagName('input');

    for (let i = 0; i <= 3; i++) {
            const content = inputs[i].value;
            details.push(content);
    }

    const radioBtns = document.querySelectorAll('input[type="radio"]');

    for (const btn of radioBtns) {
        if (btn.checked) {
            details.push(btn.value);
            console.log(btn);
        }
    }
    addBookToLibrary(...details);
    resetCardGrid();
    createLibraryCards();
    closeModal();
    resetForm();
}

function resetForm() {
    const inputs = document.getElementsByTagName('input');

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'radio') {
            inputs[i].checked = null;
        } else {
            inputs[i].value = '';
        }
    }
}