import { collection, getDocs } from 'firebase/firestore'

async function getBooks(db) {
  const snapshot = await getDocs(collection(db, 'books'))
  const books = snapshot.docs.map(doc => doc.data())
  return books
}

export default getBooks
