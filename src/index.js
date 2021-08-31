import initButtonEffect from './addBookButtonEffectInit'
// import Book from './Book'

import db from './getDatabase'
import getBooks from './getBooks'

import { setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'

getBooks(db).then(books => printOutCardsToUI(books))
initButtonEffect()

// when click on submit
const formSubmit = document.querySelector('[data-form]')
formSubmit.addEventListener('submit', e => {
  e.preventDefault()

  // close button
  const addNewBookButton = document.querySelector('[add-new-book-button]')
  console.log(addNewBookButton)
  addNewBookButton.click()

  const title = document.querySelector('#title')
  const author = document.querySelector('#author')
  const pages = document.querySelector('#pages')
  const read = document.querySelector('#finished')

  const newBook = {
    author: author.value,
    title: title.value,
    pages: parseInt(pages.value),
    read: read.value === 'yes' ? true : false,
  }

  const id =
    '_' + author.value.split(' ').join('') + title.value.split(' ').join('')

  setDoc(doc(db, 'books', id), newBook)

  // addNewCardToUI(newBook)

  getBooks(db).then(books => printOutCardsToUI(books))

  /* reset form */
  title.value = ''
  author.value = ''
  pages.value = ''
  read.value = ''
})

function addNewCardToUI(book) {
  const cardsContainer = document.querySelector('[data-book-list]')
  const id =
    '_' + book.author.split(' ').join('') + book.title.split(' ').join('')
  const newCard = `
    <div class="col-md-4" card id=${id}>
      <div class="card bg-light ${book.read && 'border-2 border-success'}">

        <i class="bi bi-trash position-absolute end-0 m-1 text-danger" ></i>

        <div class="card-header">
          <h5 class="card-title me-3">${book.title}</h5>
          <footer
            class="blockquote-footer card-subtitle text-dark">${book.author}
          </footer>
        </div>

        <div class="card-body">
          <p class="card-text">Number of Pages: ${book.pages}</p>
          <div class="form-check form-switch">
            <input
              class="form-check-input shadow-none"
              type="checkbox"
              ${book.read && 'checked'}
            />
            <label class="form-check-label">Done reading?</label>
          </div>
        </div>

      </div>
    </div>
    `

  cardsContainer.innerHTML += newCard
}

function printOutCardsToUI(books) {
  const cardsContainer = document.querySelector('[data-book-list]')
  cardsContainer.innerHTML = ''
  for (let book of books) {
    addNewCardToUI(book)
  }
  initCardButtons()
}

function initCardButtons() {
  const cards = document.querySelectorAll('[card]')
  cards.forEach(card => {
    const specificCard = document.querySelector(`#${card.id}`)
    initReadButton(specificCard)
    initDeleteButton(specificCard)
  })
}

/* read input effect */

function initReadButton(card) {
  const input = card.querySelector('input')
  input.onchange = () => {
    const read = input.checked
    toggleReadDB(card.id, read)
    toggleReadUI(input.parentNode.parentNode.parentNode)
  }
}

function toggleReadUI(card) {
  card.classList.toggle('border-2')
  card.classList.toggle('border-success')
}

function toggleReadDB(id, read) {
  updateDoc(doc(db, 'books', id), { read: read })
}

/* delete button effect */

function initDeleteButton(card) {
  const deleteButton = card.querySelector('i.bi-trash')
  deleteButton.onclick = () => {
    deleteCardDB(card.id)
    deleteCardUI(card)
  }
}

function deleteCardUI(card) {
  card.parentNode.removeChild(card)
}

function deleteCardDB(id) {
  deleteDoc(doc(db, 'books', id))
}
