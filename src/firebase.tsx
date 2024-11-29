// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATS_sLGmbHN5RxclDVrIUIxeQJ0fMCE4k",
  authDomain: "downbeat-reque.firebaseapp.com",
  projectId: "downbeat-reque",
  storageBucket: "downbeat-reque.firebasestorage.app",
  messagingSenderId: "993022395070",
  appId: "1:993022395070:web:00f643eb9507038b2154ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
