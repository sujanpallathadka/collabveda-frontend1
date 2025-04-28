// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB4BlCn_A3HLWPhNn7s1bvip572z9Rcnp4",
//   authDomain: "codesync-42185.firebaseapp.com",
//   projectId: "codesync-42185",
//   storageBucket: "codesync-42185.firebasestorage.app",
//   messagingSenderId: "330539452357",
//   appId: "1:330539452357:web:a7d1d4f584d47820caedac",
//   measurementId: "G-J8CWHVTHE9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4BlCn_A3HLWPhNn7s1bvip572z9Rcnp4",
  authDomain: "codesync-42185.firebaseapp.com",
  projectId: "codesync-42185",
  storageBucket: "codesync-42185.firebasestorage.app",
  messagingSenderId: "330539452357",
  appId: "1:330539452357:web:a7d1d4f584d47820caedac",
  measurementId: "G-J8CWHVTHE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth correctly
export const auth = getAuth(app);
