// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtwnA_ReAEi9AESvyc_zZu84qAZuOVmmg",
  authDomain: "crud-6a1d3.firebaseapp.com",
  databaseURL: "https://crud-6a1d3-default-rtdb.firebaseio.com",
  projectId: "crud-6a1d3",
  storageBucket: "crud-6a1d3.firebasestorage.app",
  messagingSenderId: "952467489219",
  appId: "1:952467489219:web:fcae555dba6358347f3d76",
  measurementId: "G-54X8JD14ML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export {db}