import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzwqWUuMyW8piPhkFRhcpnmcpbu_0-lvk",
    authDomain: "sharif-pharma.firebaseapp.com",
    projectId: "sharif-pharma",
    storageBucket: "sharif-pharma.firebasestorage.app",
    messagingSenderId: "867521349666",
    appId: "1:867521349666:web:a8d139d5c41690e910227b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const DOC_REF = doc(db, "settings", "app_data");
export const today = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Dhaka'}).format(new Date());
