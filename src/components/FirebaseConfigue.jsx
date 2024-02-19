// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4YUWfhJ2F8nJv1NCybfBDKUQfvLJkIFU",
  authDomain: "zubayers-pvt-batch.firebaseapp.com",
  projectId: "zubayers-pvt-batch",
  storageBucket: "zubayers-pvt-batch.appspot.com",
  messagingSenderId: "155931727727",
  appId: "1:155931727727:web:eddf6e9ccf9155b474fa9a",
  measurementId: "G-1P5FM46SW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig