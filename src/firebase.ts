import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCA3SkU03WPM14UBfXqFT7qmf2tj8IxiDU',
  authDomain: 'scage-vue-todo.firebaseapp.com',
  databaseURL: 'https://scage-vue-todo.firebaseio.com',
  projectId: 'scage-vue-todo',
  storageBucket: 'scage-vue-todo.appspot.com',
  messagingSenderId: '807946032689',
  appId: '1:807946032689:web:d613bb142cee6875cda710'
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
