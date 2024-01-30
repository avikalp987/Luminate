// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "luminate-4472e.firebaseapp.com",
  projectId: "luminate-4472e",
  storageBucket: "luminate-4472e.appspot.com",
  messagingSenderId: "153174346932",
  appId: "1:153174346932:web:b8b8b102475249207b1be1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);