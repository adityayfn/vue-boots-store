import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBenSYneoX3OHJlcvoEH-kAYO4zhRFzaLk",
  authDomain: "vueboots.firebaseapp.com",
  databaseURL: "https://vueboots-default-rtdb.firebaseio.com",
  projectId: "vueboots",
  storageBucket: "vueboots.appspot.com",
  messagingSenderId: "787770926583",
  appId: "1:787770926583:web:b2631add1b1daa58303af2",
}

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
