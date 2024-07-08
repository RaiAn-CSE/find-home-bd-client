// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnqta26vlAO8BqAavZSpSyQuAoJedjE28",
    authDomain: "find-home-bd.firebaseapp.com",
    projectId: "find-home-bd",
    storageBucket: "find-home-bd.appspot.com",
    messagingSenderId: "22099063041",
    appId: "1:22099063041:web:53f744e5be1ecd67cc6b00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
