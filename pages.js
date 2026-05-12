export const pagesHTML = `
    <div id="home-section" class="app-page active">
        <div class="glass-header mb-8 text-center relative">
            <button onclick="window.showPage('settings-section')" class="absolute top-6 right-6 bg-white/10 p-3 rounded-2xl text-white"><i class="fa-solid fa-sliders"></i></button>
            <h1 class="text-3xl font-black text-white uppercase italic">SHARIF PHARMA</h1>
        </div>
        <div class="px-6 space-y-4">
            <button onclick="window.openStore()" class="w-full bg-emerald-600 text-white p-6 rounded-[2.5rem] flex items-center justify-between shadow-xl">
                <span class="font-black text-lg italic uppercase">মেডিসিন স্টোর</span>
                <i class="fa-solid fa-warehouse text-xl"></i>
            </button>
            <div id="main-group-list" class="grid grid-cols-2 gap-4"></div>
            <button onclick="window.showPage('history-section')" class="w-full bg-slate-900 text-white p-6 rounded-[2.5rem] flex items-center justify-between shadow-2xl">
                <span class="font-black text-lg italic uppercase">অর্ডার রিপোর্ট</span>
                <i class="fa-solid fa-file-invoice text-xl"></i>
            </button>
        </div>
    </div>

    <div id="store-section" class="app-page px-6 pt-8">
        <div class="flex items-center gap-4 mb-6">
            <button onclick="window.showPage('home-section')" class="bg-white p-3 rounded-2xl shadow-sm border text-indigo-600"><i class="fa-solid fa-chevron-left"></i></button>
            <h1 class="text-2xl font-black text-slate-800 uppercase italic">Stock Store</h1>
        </div>
        <div class="setup-card !p-4 bg-emerald-50/50 mb-6">
            <div class="grid grid-cols-2 gap-2 mb-2">
                <input type="date" id="storeFromDate" class="large-input !p-3 !text-xs !mb-0">
                <input type="date" id="storeToDate" class="large-input !p-3 !text-xs !mb-0">
            </div>
            <button onclick="window.loadStoreData()" class="w-full bg-emerald-600 text-white py-3 rounded-xl font-black uppercase text-[10px]">ফিল্টার স্টক</button>
        </div>
        <input type="text" id="storeSearch" placeholder="মেডিসিন খুঁজুন..." class="large-input !mb-6 shadow-sm">
        <div class="store-table-container">
            <table class="order-table"><thead><tr><th width="70%">Medicine Name</th><th width="30%">Qty</th></tr></thead><tbody id="store-table-body"></tbody></table>
        </div>
    </div>

    <div id="settings-section" class="app-page px-6 pt-8">
        <div class="flex items-center gap-4 mb-8">
            <button onclick="window.showPage('home-section')" class="bg-white p-3 rounded-2xl border text-indigo-900"><i class="fa-solid fa-arrow-left"></i></button>
            <h1 class="text-2xl font-black text-slate-800 uppercase italic">Settings</h1>
        </div>
        <div class="setup-card">
            <h3 class="text-[10px] font-black text-indigo-600 uppercase mb-4">GROUPS</h3>
            <div class="flex gap-2"><input type="text" id="gInput" class="large-input !mb-0 !p-3 flex-1"><button id="addGroupBtn" class="bg-indigo-950 text-white px-5 rounded-xl">ADD</button></div>
            <div id="gList" class="flex flex-wrap gap-2 mt-4"></div>
        </div>
        <div class="setup-card">
            <h3 class="text-[10px] font-black text-emerald-600 uppercase mb-4">CUSTOMERS</h3>
            <select id="cGroupSelect" class="large-input !text-sm"><option value="">Select Group First</option></select>
            <textarea id="cInputBulk" rows="2" placeholder="কাস্টমারের নাম..." class="large-input !text-sm"></textarea>
            <button id="saveCustBtn" class="save-btn bg-emerald-600">SAVE</button>
            <div onclick="window.toggleSection('cViewWrap')" class="text-xs font-bold text-slate-400 mt-4 cursor-pointer">SHOW & DELETE <i class="fa-solid fa-chevron-down"></i></div>
            <div id="cViewWrap" class="hidden-section mt-4"><div id="cSettingsGroupButtons" class="flex flex-wrap gap-2 mb-4"></div><div id="cSettingsListUI" class="space-y-2 max-h-[250px] overflow-y-auto"></div></div>
        </div>
        <div class="setup-card">
            <h3 class="text-[10px] font-black text-orange-600 uppercase mb-4">MEDICINE</h3>
            <textarea id="mInputBulk" rows="2" placeholder="মেডিসিন লিস্ট..." class="large-input !text-sm"></textarea>
            <button id="saveMedBtn" class="save-btn bg-orange-600">SAVE</button>
            <div id="mListUI" class="flex flex-wrap gap-2 mt-4"></div>
        </div>
    </div>

    <div id="history-section" class="app-page px-6 pt-8">... (History HTML) ...</div>
    <div id="form-section" class="app-page px-6 pt-8">... (Form HTML) ...</div>
`;
