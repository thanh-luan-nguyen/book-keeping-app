const cardsContainer = document.querySelector('[data-book-list]');
const prototypeCard = document.getElementsByTagName("template")[0];
const formSubmit = document.querySelector('[data-form]');
const addNewBookButton = document.querySelector('[add-new-book-button]');

// in the form
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#finished');

// get the array from local storage
let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));

// Book constructor
function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

// check if the data is empy. if empty, create new books to add to the list
if (!myLibrary) {
    myLibrary = [];

    addBookToLibrary(new Book("Dracula", "Bram Stoker", 418, false));
    addBookToLibrary(new Book("Frankenstein", "Mary Shelley", 280, true));
    addBookToLibrary(new Book("IT", "Stephen King", 1138, true));
}

printOutCards();

// add new book button
addNewBookButton.addEventListener('click', () => {
    addNewBookButton.classList.toggle('btn-primary');
    addNewBookButton.classList.toggle('btn-danger');
    addNewBookButton.innerText === "Add New Book" ?
        addNewBookButton.innerText = "Close" :
        addNewBookButton.innerHTML = "Add New Book";
})

// when click on submit
formSubmit.addEventListener('submit', (e) => {
    const newBook = new Book(
        title.value,
        author.value,
        pages.value,
        read.value === "yes" ? true : false
    );

    addBookToLibrary(newBook);
    addNewCard(newBook);

    e.preventDefault();
})

function addNewCard(book) {
    const newCard = prototypeCard.content.cloneNode(true);

    const cardTitle = newCard.querySelector('[data-card-title]');
    const cardAuthor = newCard.querySelector('[data-card-author]');
    const cardPages = newCard.querySelector('[data-card-pages]');
    const cardRead = newCard.querySelector('[data-card-read]')
    const cardBg = newCard.querySelector('[data-card-background-color]')
    const cardDelete = newCard.querySelector('[data-card-delete]')

    cardTitle.innerText = book.title;
    cardAuthor.innerText = book.author;
    cardPages.innerText = book.pages;
    if (book.haveRead) {
        cardRead.setAttribute("checked", "");
        cardBg.classList.toggle('border-2');
        cardBg.classList.toggle('border-success');
    };
    cardRead.addEventListener("click", () => {
        book.haveRead = !book.haveRead;
        saveToStorage(myLibrary);
        cardBg.classList.toggle('border-success');
        cardBg.classList.toggle('border-2');
    });

    cardDelete.addEventListener('click', () => {
        cardsContainer.innerText = "";
        const index = myLibrary.indexOf(book);
        myLibrary.splice(index, 1);
        printOutCards();
    })

    cardsContainer.appendChild(newCard);

    saveToStorage(myLibrary);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function printOutCards() {
    for (let book of myLibrary) {
        addNewCard(book)
    }
    saveToStorage(myLibrary);
}

function saveToStorage(data) {
    localStorage.setItem("myLibrary", JSON.stringify(data));
}