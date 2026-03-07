import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Nederlandse foutmeldingen
function getErrorMessage(errorCode) {
  console.log("Firebase error code:", errorCode);
  switch (errorCode) {
    case "auth/invalid-email":
      return "Ongeldig emailadres.";
    case "auth/user-disabled":
      return "Dit account is uitgeschakeld.";
    case "auth/user-not-found":
      return "Geen account gevonden met dit emailadres.";
    case "auth/wrong-password":
      return "Verkeerd wachtwoord.";
    case "auth/invalid-credential":
      return "Ongeldige inloggegevens. Controleer je email en wachtwoord.";
    case "auth/too-many-requests":
      return "Te veel pogingen. Probeer het later opnieuw.";
    case "auth/network-request-failed":
      return "Netwerkfout. Controleer je internetverbinding.";
    case "auth/operation-not-allowed":
      return "Email/wachtwoord login is niet ingeschakeld. Activeer dit in Firebase Console > Authentication > Sign-in method.";
    case "auth/configuration-not-found":
      return "Firebase Authentication is niet geconfigureerd. Activeer Authentication in Firebase Console.";
    default:
      return "Fout: " + (errorCode || "onbekend") + ". Controleer je Firebase instellingen.";
  }
}

// Inloggen
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Gebruikersprofiel bijwerken/aanmaken in Firestore
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // Eerste login: profiel aanmaken
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName || "",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      role: "student"
    });
  } else {
    // Bestaande gebruiker: lastLogin updaten
    await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
  }

  return user;
}

// Uitloggen
export async function logoutUser() {
  await signOut(auth);
  window.location.href = "login.html";
}

// Auth state listener
export function onAuthChange(callback) {
  onAuthStateChanged(auth, callback);
}

// Wachtwoord reset
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

// Auth guard — redirect naar login als niet ingelogd
export function requireAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
}

export { getErrorMessage };
