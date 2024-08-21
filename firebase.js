// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfXBGTuWh2-1hja7SrQz7YwXocJBC_aZ8",
  authDomain: "flashcards-62c0c.firebaseapp.com",
  projectId: "flashcards-62c0c",
  storageBucket: "flashcards-62c0c.appspot.com",
  messagingSenderId: "496469934934",
  appId: "1:496469934934:web:358c297fdb341d5ae6ccf7",
  measurementId: "G-B3DM0C9LV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export{db}