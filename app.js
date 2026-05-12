import { db } from './firebase-config.js';
import { pagesHTML } from './pages.js';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove, collection, addDoc, getDocs, query, where, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// পেজগুলো লোড করা
document.getElementById('app-content').innerHTML = pagesHTML;

const DOC_REF = doc(db, "settings", "app_data");
let masterData = { groups: [], customers: [], medicines: [] }, cart = [], currentGroup = '', currentChemist = '';
const today = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Dhaka'}).format(new Date());

// Navigation Functions
window.showPage = (id) => { 
    document.querySelectorAll('.app-page').forEach(p => p.classList.remove('active')); 
    document.getElementById(id).classList.add('active'); 
    window.scrollTo(0,0);
};

window.toggleSection = (id) => document.getElementById(id).classList.toggle('hidden-section');

// Realtime Data Sync
onSnapshot(DOC_REF, (snap) => {
    masterData = snap.exists() ? snap.data() : { groups: [], customers: [], medicines: [] };
    renderUI();
});

function renderUI() {
    // হোম পেজের গ্রুপ লিস্ট
    document.getElementById('main-group-list').innerHTML = (masterData.groups || []).map(g => `
        <button onclick="window.showChemists('${g}')" class="bg-white p-6 rounded-[2rem] border shadow-sm text-center">
            <i class="fa-solid fa-folder text-indigo-500 text-3xl mb-3"></i>
            <div class="font-black text-slate-700 text-[11px] uppercase">${g}</div>
        </button>
    `).join('');
    
    // সেটিংস আপডেট লজিক (আপনার আগের কোডের মতোই থাকবে)
    // ...
}

// Medicine Store Search Logic
window.openStore = () => {
    document.getElementById('storeFromDate').value = today;
    document.getElementById('storeToDate').value = today;
    window.showPage('store-section');
    window.loadStoreData();
};

window.loadStoreData = async () => {
    const from = document.getElementById('storeFromDate').value;
    const to = document.getElementById('storeToDate').value;
    const tableBody = document.getElementById('store-table-body');
    tableBody.innerHTML = '<tr><td colspan="2" class="text-center py-10 font-bold">সার্চ হচ্ছে...</td></tr>';

    try {
        const q = query(collection(db, "orders"), where("date", ">=", from), where("date", "<=", to));
        const snap = await getDocs(q);
        let stockMap = {};

        snap.forEach(doc => {
            (doc.data().items || []).forEach(item => {
                const name = item.product.toUpperCase();
                stockMap[name] = (stockMap[name] || 0) + (parseInt(item.qty) || 0);
            });
        });

        const sortedNames = Object.keys(stockMap).sort();
        tableBody.innerHTML = sortedNames.map(name => `
            <tr>
                <td class="font-bold text-slate-700 uppercase italic">${name}</td>
                <td class="text-center"><span class="qty-badge">${stockMap[name]}</span></td>
            </tr>
        `).join('');
    } catch (err) {
        tableBody.innerHTML = '<tr><td colspan="2" class="text-center text-red-500 py-10">ডাটা লোড হয়নি</td></tr>';
    }
};

// ... বাকি সব ফাংশন (Save Order, Add Group, etc.) আপনার অরিজিনাল কোড অনুযায়ী বসবে ...
