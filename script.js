const bookList = document.querySelector('[data-book-list]');
const prototypeCard = document.getElementsByTagName("template")[0];
const formSubmit = document.querySelector('[data-form]');
const addNewBookButton = document.querySelector('[add-new-book-button]');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#finished');

let myLibrary = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

const dracula = new Book("Dracula", "Bram Stoker", 418, false);
const frankenstein = new Book("Frankenstein", "Mary Shelley", 280, true);
const it = new Book("IT", "Stephen King", 1138, true);

addBookToLibrary(dracula);
addBookToLibrary(frankenstein);
addBookToLibrary(it);

function addBookToLibrary(book) {
    myLibrary.push(book);
}

for (let book of myLibrary) {
    addNewCard(book)
}

addNewBookButton.addEventListener('click', () => {
    addNewBookButton.classList.toggle('btn-primary');
    addNewBookButton.classList.toggle('btn-danger');
    if (addNewBookButton.innerText === "Add New Book") {
        addNewBookButton.innerText = "Close"
    } else {
        addNewBookButton.innerHTML = "Add New Book"
    }
})

formSubmit.addEventListener('submit', (e) => {
    let newBookTitle = title.value;
    let newBookAuthor = author.value;
    let newBookPages = pages.value;
    let newBookRead;
    if (read.value === "yes") {
        newBookRead = true;
    } else {
        newBookRead = false;
    }
    const newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    addBookToLibrary(newBook);

    addNewCard(newBook);
    e.preventDefault();
})

function addNewCard(newBook) {
    const newCard = prototypeCard.content.cloneNode(true);

    const cardTitle = newCard.querySelector('[data-card-title]');
    const cardAuthor = newCard.querySelector('[data-card-author]');
    const cardPages = newCard.querySelector('[data-card-pages]');
    const cardRead = newCard.querySelector('[data-card-read]')
    const cardBg = newCard.querySelector('[data-card-background-color]')
    const cardDelete = newCard.querySelector('[data-card-delete]')

    cardTitle.innerText = newBook.title;
    cardAuthor.innerText = newBook.author;
    cardPages.innerText = newBook.pages;
    if (newBook.haveRead) {
        cardRead.setAttribute("checked", "");
        cardBg.classList.toggle('border-2');
        cardBg.classList.toggle('border-success');
    };
    cardRead.addEventListener("click", () => {
        if (newBook.haveRead) {
            newBook.haveRead = false
        } else {
            newBook.haveRead = true
        };
        cardBg.classList.toggle('border-success');
        cardBg.classList.toggle('border-2');
    });

    cardDelete.addEventListener('click', () => {
        bookList.innerText = "";
        const index = myLibrary.indexOf(newBook);
        myLibrary.splice(index, 1);
        for (let book of myLibrary) {
            addNewCard(book)
        }
    })

    bookList.appendChild(newCard);
}