const cards = document.getElementById('cards');

const newBookButton = document.getElementById('new-book');

newBookButton.onclick = openModal;

const submitBookButton = document.querySelector('.submit')

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

Book.prototype.toggleRead = (card, i) => {
    i.read === 'yes'? i.read = 'no': i.read = 'yes';
    const readP = card.querySelector('.read-p');
    readP.innerHTML = `Have I read it?: ${i.read}`;
}

function addBookToLibrary(...details) {
    myLibrary.push(new Book(...details));
}

function createLibraryCards() {
    let i = myLibrary.length-1;
    let div = document.createElement('div');
    div.classList.add('library-card', readStatus(i));
    div.setAttribute('data-index', `${i}`);
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
    read.setAttribute('class', 'read-p');
    read.innerHTML = `Have I read it?: ${book['read']}`;
    let removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'rmv-book-btn');
    removeBtn.addEventListener('click', removeBook);
    removeBtn.innerHTML = 'Remove';
    let toggleBtn = document.createElement('button');
    toggleBtn.addEventListener('click', (e) => {
        const card = e.target.closest('.library-card');
        const i = myLibrary[card.dataset.index];
        i.toggleRead(card, i);
    });
    toggleBtn.innerHTML = 'Read toggle';
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(genre);
    div.appendChild(pages);
    div.appendChild(read);
    div.appendChild(toggleBtn);
    div.appendChild(removeBtn);
    cards.appendChild(div);
}

function readStatus(i) {
    if (myLibrary[i].read === 'yes') {
        return 'haveread';
    } else {
        return 'notread';
    }

}

function resetCardGrid() {
    const cards = document.querySelectorAll('.library-card');
    cards.forEach((card) => {
        card.remove();
    });
}

function removeBook() {
    const card = this.closest('.library-card');
    let i = card.dataset.index;
    myLibrary.splice(i, 1);
    card.remove();

}

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
        }
    }
    addBookToLibrary(...details);
    
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