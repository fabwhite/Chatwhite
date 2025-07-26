import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let userNumber = "";
const chatDiv = document.getElementById("chat");
const greeting = document.getElementById("greeting");
const messagesDiv = document.getElementById("messages");
const notification = document.getElementById("notification");

window.login = () => {
  const input = document.getElementById("user-number");
  userNumber = input.val
// Chat avec Firebase et signalement
