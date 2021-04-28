const cards = document.getElementById('cards');

let myLibrary = [
    {title:'fifthseason', author: 'jm', genre: 'fant', pages: 600, read: 'no'},
    {title: 'hobbit', author: 'tolkien', genre: 'fant', pages: 400, read: 'yes'},
    {title: 'another one', author: 'that person', genre: 'goodone', pages: 388, read: 'no'}];

function Book(title, author, genre, pages, read) {
    this.title = title
    this.author = author
    this.genre = genre
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    const details = [];

    details[0] = prompt('what is the name of the book?', '');
    details[1] = prompt('who is the author?', '');
    details[2] = prompt('what is the genre?', '');
    details[3] = prompt('how many pages is it?', '');
    details[4] = prompt('whave you read it yet?', '');

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