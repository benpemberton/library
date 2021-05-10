const firebaseConfig = {
    apiKey: "AIzaSyAQBxUCa-LYsy_6EFTJHBkY78BkcrR-riY",
    authDomain: "library-d9bf9.firebaseapp.com",
    databaseURL: "https://library-d9bf9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "library-d9bf9",
    storageBucket: "library-d9bf9.appspot.com",
    messagingSenderId: "860547309394",
    appId: "1:860547309394:web:063c576ca70e7a45f0648b",
    measurementId: "G-F6MYL2F8Y8"
};

firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();

const cardsGrid = document.getElementById('cards-grid');

const newBookButton = document.getElementById('new-book');

newBookButton.onclick = openModal;

const submitBookButton = document.querySelector('.submit')

submitBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    submitNewBook();
});

let myLibrary = [];

// window.onload = () => {
//     dbRef.on('value', snap => {
//         myLibrary.push(...snapshotToArray(snap));
//     });

//     if (myLibrary.length > 0) {
    
//     }
// }

function Book(title, author, genre, pages, read) {
    this.title = title
    this.author = author
    this.genre = genre
    this.pages = pages
    this.read = read
}

Book.prototype.toggleRead = (card, book) => {
    book.read === 'yes'? book.read = 'no': book.read = 'yes';
    const readP = card.querySelector('.read-p');
    readP.innerHTML = `Have I read it?: ${book.read}`;
}

function addBookToLibrary(...details) {
    myLibrary.push(new Book(...details));
}

function syncWithDB(add, toggle, remove) {
    if (add) {
        const book = myLibrary[myLibrary.length-1];
        const bookRef = dbRef.child(`${book.title}`);
        bookRef.set(book);
    }
    if (toggle) {
        const keyRef = dbRef.child(`${toggle.title}/read`);
        keyRef.set(`${toggle.read}`);
    } 
    if (remove) {
        const bookRef = dbRef.child(`${remove.title}`);
        bookRef.remove();
    }
}

// function addBookToLibrary(...details) {
//     const bookRef = dbRef.child(`${details[0]}`);
//     bookRef.set(new Book(...details))
// }

// function snapshotToArray(snapshot) {
//     const returnArr = [];

//     snapshot.forEach((childSnapshot) => {
//         const item = childSnapshot.val();
//         item.key = childSnapshot.key;

//         returnArr.push(item);
//     });

//     return returnArr;
// };

function createLibraryCard() {
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
        const book = myLibrary[card.dataset.index];
        console.log(book);
        book.toggleRead(card, book);
        syncWithDB(0, book, 0);
    });
    toggleBtn.innerHTML = 'Read toggle';
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(genre);
    div.appendChild(pages);
    div.appendChild(read);
    div.appendChild(toggleBtn);
    div.appendChild(removeBtn);
    cardsGrid.insertBefore(div, cardsGrid.firstChild);
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
    const i = card.dataset.index;
    const book = myLibrary[i];
    syncWithDB(0, 0, book);
    myLibrary.splice(i, 1);
    card.remove();
    indexCards();
}

function indexCards() {
    const cards = document.querySelectorAll('.library-card');
    let j = 0;
    for (let i = myLibrary.length-1; i >= 0; i--) {
        cards[j].dataset.index = i;
        j++;
    }
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
    syncWithDB(1, 0, 0)
    createLibraryCard();
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