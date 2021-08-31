export default class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
  get id() {
    return this.title.split(' ').join('') + this.author
  }
}
