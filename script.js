let myLibrary = [];

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

addBookToLibrary();

console.log(myLibrary);