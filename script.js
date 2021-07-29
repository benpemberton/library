const firebaseConfig = {
  apiKey: "AIzaSyAQBxUCa-LYsy_6EFTJHBkY78BkcrR-riY",
  authDomain: "library-d9bf9.firebaseapp.com",
  databaseURL:
    "https://library-d9bf9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "library-d9bf9",
  storageBucket: "library-d9bf9.appspot.com",
  messagingSenderId: "860547309394",
  appId: "1:860547309394:web:063c576ca70e7a45f0648b",
  measurementId: "G-F6MYL2F8Y8",
};

firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();

const cardsGrid = document.getElementById("cards-grid");

const newBookButton = document.getElementById("new-book");

newBookButton.onclick = openModal;

const submitBookButton = document.querySelector(".submit");

submitBookButton.addEventListener("click", (e) => {
  e.preventDefault();
  submitNewBook();
});

const cancelButton = document.querySelector(".cancel");

cancelButton.onclick = closeModal;

let myLibrary = [];

window.onload = () => {
  const orderedBooks = dbRef.orderByChild("date");
  orderedBooks.on("value", (snap) => {
    let dbBooks = snapshotToArray(snap);
    if (dbBooks.length > 0) {
      buildLibraryFromDB(dbBooks);
    }
  });
};

class Book {
  constructor(title, author, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
  }
  toggleRead(card) {
    if (this.read === "yes") {
      card.classList.add("notread");
      card.classList.remove("haveread");
    } else {
      card.classList.add("haveread");
      card.classList.remove("notread");
    }
    this.read === "yes" ? (this.read = "no") : (this.read = "yes");
    const readP = card.querySelector(".read-p");
    readP.innerHTML = `Have I read it?: ${this.read}`;
  }
}

function addBookToLibrary(...details) {
  myLibrary.push(new Book(...details));
}

function buildLibraryFromDB(dbBooks) {
  dbBooks.forEach((book) => {
    const details = [];
    const jumbledList = Object.keys(book);
    for (let i = 0; i < jumbledList.length; i++) {
      const prop = jumbledList[i];
      switch (prop) {
        case "title":
          details[0] = book[prop];
          break;
        case "author":
          details[1] = book[prop];
          break;
        case "genre":
          details[2] = book[prop];
          break;
        case "pages":
          details[3] = book[prop];
          break;
        case "read":
          details[4] = book[prop];
          break;
      }
    }
    addBookToLibrary(...details);
    createLibraryCard();
  });
  dbRef.off("value");
}

function syncWithDB(add, toggle, remove) {
  if (add) {
    const book = myLibrary[myLibrary.length - 1];
    const bookRef = dbRef.child(`${book.title}`);
    bookRef.set(book);
    bookRef.child("date").set(firebase.database.ServerValue.TIMESTAMP);
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

function snapshotToArray(snapshot) {
  const returnArr = [];
  snapshot.forEach((childSnapshot) => {
    returnArr.push(childSnapshot.val());
  });
  return returnArr;
}

function createLibraryCard() {
  let i = myLibrary.length - 1;
  let div = document.createElement("div");
  div.classList.add("library-card", readStatus(i));
  div.setAttribute("data-index", `${i}`);
  let book = myLibrary[i];
  let title = document.createElement("h2");
  title.innerHTML = book["title"];
  let author = document.createElement("p");
  author.innerHTML = `By ${book["author"]}`;
  let genre = document.createElement("p");
  genre.innerHTML = `Genre: ${book["genre"]}`;
  let pages = document.createElement("p");
  pages.innerHTML = `Pages: ${book["pages"]}`;
  let read = document.createElement("p");
  read.setAttribute("class", "read-p");
  read.innerHTML = `Have I read it?: ${book["read"]}`;
  let removeBtn = document.createElement("button");
  removeBtn.setAttribute("class", "rmv-book-btn");
  removeBtn.addEventListener("click", removeBook);
  removeBtn.innerHTML = "Remove";
  let toggleBtn = document.createElement("button");
  toggleBtn.addEventListener("click", (e) => {
    const card = e.target.closest(".library-card");
    const book = myLibrary[card.dataset.index];
    book.toggleRead(card);
    syncWithDB(0, book, 0);
  });
  toggleBtn.innerHTML = "Read toggle";
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
  if (myLibrary[i].read === "yes") {
    return "haveread";
  } else {
    return "notread";
  }
}

function resetCardGrid() {
  const cards = document.querySelectorAll(".library-card");
  cards.forEach((card) => {
    card.remove();
  });
}

function removeBook() {
  const card = this.closest(".library-card");
  const i = card.dataset.index;
  const book = myLibrary[i];
  syncWithDB(0, 0, book);
  myLibrary.splice(i, 1);
  card.remove();
  indexCards();
}

function indexCards() {
  const cards = document.querySelectorAll(".library-card");
  let j = 0;
  for (let i = myLibrary.length - 1; i >= 0; i--) {
    cards[j].dataset.index = i;
    j++;
  }
}

function openModal() {
  let background = document.getElementById("modal-background");
  let content = document.getElementById("modal-content");
  background.style.display = "block";
  content.style.display = "block";
}

function closeModal() {
  let background = document.getElementById("modal-background");
  let content = document.getElementById("modal-content");
  background.style.display = "none";
  content.style.display = "none";
  resetForm();
}

function submitNewBook() {
  const details = [];
  const inputs = document.getElementsByTagName("input");

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
  syncWithDB(1, 0, 0);
  createLibraryCard();
  closeModal();
  resetForm();
}

function resetForm() {
  const inputs = document.getElementsByTagName("input");

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "radio") {
      inputs[i].checked = null;
    } else {
      inputs[i].value = "";
    }
  }
}
