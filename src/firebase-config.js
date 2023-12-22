// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf4t-LH2snc_-Gtr7AEUCJu34UYOOZt5A",
  authDomain: "user-management-5e6cf.firebaseapp.com",
  projectId: "user-management-5e6cf",
  storageBucket: "user-management-5e6cf.appspot.com",
  messagingSenderId: "164160106766",
  appId: "1:164160106766:web:e1863713a58c52e2f3675f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
