import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDDYsm4Mo5Hsk48VmIuMrWCmD-TFDw1Kxs',
  authDomain: 'book-keeping-app-f0645.firebaseapp.com',
  projectId: 'book-keeping-app-f0645',
  storageBucket: 'book-keeping-app-f0645.appspot.com',
  messagingSenderId: '147776888074',
  appId: '1:147776888074:web:b74f8fe48cd98fc706aef3',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
