import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZQCQrWJYrgkhQYT1Wq6ul9XX4MGKmVao",
  authDomain: "currencywzrd-f6c7e.firebaseapp.com",
  projectId: "currencywzrd-f6c7e",
  storageBucket: "currencywzrd-f6c7e.firebasestorage.app",
  messagingSenderId: "899493995320",
  appId: "1:899493995320:web:a31ebf84c47909294797cd",
  measurementId: "G-N3YTTM5JV4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);