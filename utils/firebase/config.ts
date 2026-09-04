// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSk-ZBkdtjLTi9yF-gxD05W-cfmhOoGC4",
  authDomain: "akoma-507618.firebaseapp.com",
  projectId: "akoma-507618",
  storageBucket: "akoma-507618.firebasestorage.app",
  messagingSenderId: "233507152379",
  appId: "1:233507152379:web:6b5d8bb1acd166efc06b5e",
  measurementId: "G-ZH49LK26XB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);