
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgsEnCFjdK8zIf9GTWQTkgvtYwF_iDd8o",
  authDomain: "whiteapp-41c88.firebaseapp.com",
  projectId: "whiteapp-41c88",
  storageBucket: "whiteapp-41c88.appspot.com",
  messagingSenderId: "1079966178037",
  appId: "1:1079966178037:web:2445ad5d88dc95494803bc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
