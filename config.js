/**
 * Local Database Configuration (IndexedDB)
 * Firebase সরিয়ে এখন এটি সরাসরি ব্রাউজারের মেমোরি ব্যবহার করবে।
 */

const dbName = "SharifPharmaLocalDB";
const dbVersion = 1;

// ডাটাবেস ওপেন করার জন্য একটি কমন ফাংশন
export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        // যদি ডাটাবেস আগে তৈরি করা না থাকে (প্রথমবার অ্যাপ চালালে)
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            
            // ১. গ্রুপ লিস্ট স্টোর করার জন্য টেবিল
            if (!db.objectStoreNames.contains("groups")) {
                db.createObjectStore("groups", { keyPath: "id", autoIncrement: true });
            }
            
            // ২. মেডিসিন বা অর্ডার লিস্ট স্টোর করার জন্য টেবিল (ভবিষ্যতের জন্য)
            if (!db.objectStoreNames.contains("orders")) {
                db.createObjectStore("orders", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject("IndexedDB error: " + e.target.errorCode);
    });
};

// এই ডাটাবেসের নাম অন্যান্য পেজে ব্যবহারের জন্য এক্সপোর্ট করছি
export { dbName };
