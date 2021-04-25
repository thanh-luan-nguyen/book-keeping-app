const bookList = document.querySelector('[data-book-list]');
const prototypeCard = document.getElementsByTagName("template")[0];
const submit = document.querySelector('[data-submit]');
const form = document.getElementById('form');
const title = form.querySelector('#title');
const author = form.querySelector('#author');
const pages = form.querySelector('#pages');
const read = form.querySelector('#finished');

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

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

for (let book of myLibrary) {
    const newCard = prototypeCard.content.cloneNode(true);

    const title = newCard.querySelector('[data-card-title]');
    const author = newCard.querySelector('[data-card-author]');
    const pages = newCard.querySelector('[data-card-pages]');
    const read = newCard.querySelector('[data-card-read]')
    const cardBg = newCard.querySelector('[data-card-background-color]')

    title.innerText = book.title;
    author.innerText = book.author;
    pages.innerText = book.pages;
    if (book.haveRead) {
        read.setAttribute("checked", "");
        cardBg.classList.toggle('border-2');
        cardBg.classList.toggle('border-success');
    };
    read.addEventListener("click", () => {
        cardBg.classList.toggle('border-success');
        cardBg.classList.toggle('border-2');
    });

    bookList.appendChild(newCard);
}

submit.addEventListener('click', (e) => {
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
    const newCard = prototypeCard.content.cloneNode(true);

    const cardTitle = newCard.querySelector('[data-card-title]');
    const cardAuthor = newCard.querySelector('[data-card-author]');
    const cardPages = newCard.querySelector('[data-card-pages]');
    const cardRead = newCard.querySelector('[data-card-read]')
    const cardBg = newCard.querySelector('[data-card-background-color]')

    cardTitle.innerText = newBook.title;
    cardAuthor.innerText = newBook.author;
    cardPages.innerText = newBook.pages;
    if (newBook.haveRead) {
        cardRead.setAttribute("checked", "");
        cardBg.classList.toggle('border-2');
        cardBg.classList.toggle('border-success');
    };
    cardRead.addEventListener("click", () => {
        cardBg.classList.toggle('border-success');
        cardBg.classList.toggle('border-2');
    });

    bookList.appendChild(newCard);
})



// const trashCan = newCard.querySelector('[data-card-delete]');
// trashCan.addEventListener("click", () => {

// })