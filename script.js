const cards = document.getElementById('cards');

const newBookButton = document.getElementById('new-book');

newBookButton.onclick = openModal;

const submitBookButton = document.querySelector('.submit');
console.log(submitBookButton);

submitBookButton.onclick = submitNewBook;

let myLibrary = [
    {title:'The Fifth Season', author: 'N.K. Jemisin', genre: 'Fantasy', pages: 439, read: 'No'},
    {title: 'hobbit', author: 'tolkien', genre: 'fant', pages: 400, read: 'yes'},
    {title: 'another one', author: 'that person', genre: 'goodone', pages: 388, read: 'no'},
    {title: 'another one', author: 'that person', genre: 'goodone', pages: 388, read: 'no'},
    {title: 'another one', author: 'that person', genre: 'goodone', pages: 388, read: 'no'},
    {title: 'another one', author: 'that person', genre: 'goodone', pages: 388, read: 'no'},
    {title: 'another one', author: 'that person', genre: 'goodone', pages: 388, read: 'no'},
    {title: 'another one', author: 'that person', genre: 'goodone', pages: 388, read: 'no'}
];

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
    for (let i = 0; i < myLibrary.length; i++) {
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


createLibraryCards();

function openModal() {
    let background = document.getElementById('modal-background');
    let content = document.getElementById('modal-content');
    background.style.display = 'block';
    content.style.display = 'block';
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
            console.log(details);
        }
    }
    addBookToLibrary(details);

    console.log(myLibrary);
}