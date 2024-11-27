// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0LXLZD1bnxXEAyM-x9yplXw7k9ghI7Bg",
  authDomain: "e-commerce-4fd3e.firebaseapp.com",
  projectId: "e-commerce-4fd3e",
  storageBucket: "e-commerce-4fd3e.firebasestorage.app",
  messagingSenderId: "88080991658",
  appId: "1:88080991658:web:da65987cd0f23e092797d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(); //get all data from google login
export const db = getFirestore(app);
export default app;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB531SEtN9zOOfwXk1xI0rZfIewyYrQa8A",
//   authDomain: "e-comm-auth-2efed.firebaseapp.com",
//   projectId: "e-comm-auth-2efed",
//   storageBucket: "e-comm-auth-2efed.firebasestorage.app",
//   messagingSenderId: "478696629941",
//   appId: "1:478696629941:web:5f92983251a5e3b755c0fc"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
