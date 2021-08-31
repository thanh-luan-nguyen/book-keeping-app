// add new book button effect
export default function initButtonEffect() {
  const addNewBookButton = document.querySelector('[add-new-book-button]')
  addNewBookButton.addEventListener('click', () => {
    setTimeout(function () {
      addNewBookButton.classList.toggle('btn-primary')
      addNewBookButton.classList.toggle('btn-danger')
      addNewBookButton.innerText === 'Add New Book'
        ? (addNewBookButton.innerText = 'Close')
        : (addNewBookButton.innerHTML = 'Add New Book')
    }, 300)
  })
}
