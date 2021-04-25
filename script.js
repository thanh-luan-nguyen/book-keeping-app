const bookList = document.querySelector('[data-book-list]');
const prototypeCard = document.getElementsByTagName("template")[0];


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

const trashCan = newCard.querySelector('[data-card-delete]');
trashCan.addEventListener("click", () => {

})