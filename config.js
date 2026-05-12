import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, 
    doc, 
    initializeFirestore, 
    persistentLocalCache, 
    persistentMultipleTabManager 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// আপনার বর্তমান Firebase কনফিগারেশন এখানে নিশ্চিত করুন
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

// অফলাইন পারসিস্টেন্স চালু করা
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

// আপনার নির্দিষ্ট ডকুমেন্ট পাথ
const DOC_REF = doc(db, "sharif_pharma", "master_data");

export { db, DOC_REF };
