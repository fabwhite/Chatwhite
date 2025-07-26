
import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  where,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let userNumber = "";
const chatDiv = document.getElementById("chat");
const greeting = document.getElementById("greeting");
const messagesDiv = document.getElementById("messages");
const notification = document.getElementById("notification");

window.login = () => {
  const input = document.getElementById("user-number");
  userNumber = input.value.trim();
  if (!userNumber) return alert("Entre ton numéro !");
  greeting.textContent = `Connecté en tant que numéro ${userNumber}`;
  chatDiv.style.display = "block";
  input.disabled = true;
  loadMessages();
};

window.sendMessage = async () => {
  const to = document.getElementById("target-number").value.trim();
  const content = document.getElementById("message").value.trim();
  if (!to || !content) return alert("Remplis tous les champs !");
  await addDoc(collection(db, "messages"), {
    from: userNumber,
    to,
    content,
    timestamp: serverTimestamp(),
    reported: false
  });
  document.getElementById("message").value = "";
};

function loadMessages() {
  const q = query(
    collection(db, "messages"),
    where("to", "==", userNumber),
    orderBy("timestamp", "desc")
  );

  onSnapshot(q, (snapshot) => {
    messagesDiv.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const msg = document.createElement("div");
      msg.innerHTML = `<p><strong>De ${data.from} :</strong> ${data.content}</p>`;

      const reportBtn = document.createElement("button");
      reportBtn.textContent = "Signaler 🚩";
      reportBtn.onclick = () => reportMessage(docSnap.id);
      msg.appendChild(reportBtn);

      messagesDiv.appendChild(msg);
    });

    if (!snapshot.empty) {
      notification.style.display = "block";
      setTimeout(() => {
        notification.style.display = "none";
      }, 3000);
    }
  });
}

async function reportMessage(id) {
  const ref = doc(db, "messages", id);
  await updateDoc(ref, { reported: true });
  alert("Message signalé !");
}
