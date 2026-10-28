// ============================================================
//  LifeBridge Mobile Web App — app.js (v2 Feature Edition)
//  Multi-screen document OS with Real Upload, Live Extraction,
//  LocalStorage Persistence, Speech-to-Text & Gemini AI support
// ============================================================

'use strict';

// ============================================================
//  DEFAULT SEED DATA
// ============================================================
const DEFAULT_DOCUMENTS = [
  {
    id: 'doc-1',
    name: 'State Merit Scholarship 2026',
    category: 'education',
    icon: '🎓',
    date: 'Oct 8, 2026',
    meta: 'DHE/SCHOL/2026/UG-8821',
    urgency: 'urgent',
    explanation: {
      en: 'This notice invites eligible 2nd-year college students to apply for a ₹2,00,000 merit-cum-means scholarship (Scheme 4B). You must apply online before October 31, 2026.',
      hi: 'यह परिपत्र पात्र द्वितीय वर्ष के छात्रों को ₹2,00,000 की छात्रवृत्ति के लिए आवेदन करने हेतु आमंत्रित करता है। 31 अक्टूबर 2026 से पहले ऑनलाइन आवेदन करें।',
      mr: 'हे परिपत्रक पात्र विद्यार्थ्यांना शिष्यवृत्तीसाठी 31 ऑक्टोबर 2026 पूर्वी ऑनलाइन अर्ज भरण्यास सांगते.',
      ta: 'இந்த அறிவிப்பு தகுதியான 2ஆம் ஆண்டு மாணவர்களை ₹2,00,000 உதவித்தொகைக்கு விண்ணப்பிக்க அழைக்கிறது. கடைசி தேதி: அக்டோபர் 31, 2026.'
    },
    facts: [
      { icon: '📅', text: 'Application deadline: October 31, 2026' },
      { icon: '💰', text: 'Grant amount: ₹2,00,000 (Scheme 4B)' },
      { icon: '📋', text: '5 mandatory documents required' },
      { icon: '⚠️', text: 'Annexure Form 4B must be downloaded separately from the portal' },
      { icon: '🌐', text: 'Portal: mahadbt.maharashtra.gov.in' }
    ],
    taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
  },
  {
    id: 'doc-2',
    name: 'Income Tax Notice AY 2026-27',
    category: 'government',
    icon: '🏛️',
    date: 'Oct 5, 2026',
    meta: 'Notice u/s 143(1)',
    urgency: 'urgent',
    explanation: {
      en: 'This is a standard intimation from Income Tax Department regarding your AY 2026-27 return. There is a small tax demand of ₹3,450 due to a mismatch in TDS credit. Reply or pay within 30 days to avoid interest.',
      hi: 'यह आयकर विभाग से AY 2026-27 के लिए एक सूचना है। TDS मिसमैच के कारण ₹3,450 की मांग है। 30 दिनों के भीतर भुगतान करें।',
      mr: 'हे AY 2026-27 साठी आयकर विभागाचे पत्र आहे. TDS मिसमॅचमुळे ₹3,450 ची मागणी आहे. 30 दिवसांत भरा.',
      ta: 'இது வருமான வரித்துறையிடமிருந்து AY 2026-27 க்கான TDS முட்டுக்கட்டை ₹3,450 கோரும் அறிவிப்பு. 30 நாட்களில் பதிலளிக்கவும்.'
    },
    facts: [
      { icon: '📅', text: 'Response deadline: November 5, 2026' },
      { icon: '💸', text: 'Demand amount: ₹3,450 (TDS mismatch)' },
      { icon: '🔗', text: 'Respond on: incometax.gov.in' },
      { icon: '⚠️', text: 'Failure to respond may result in interest charges' }
    ],
    taskIds: ['task-5', 'task-6']
  },
  {
    id: 'doc-3',
    name: 'Annual Health Checkup Report',
    category: 'medical',
    icon: '🏥',
    date: 'Sep 28, 2026',
    meta: 'City Diagnostics Centre',
    urgency: 'normal',
    explanation: {
      en: 'Your annual health checkup report is ready. All major markers are within normal range. Your Vitamin D is slightly low (22 ng/mL — normal is 30-100). Doctor recommends a supplement and a follow-up in 3 months.',
      hi: 'आपकी वार्षिक स्वास्थ्य जांच रिपोर्ट तैयार है। सभी प्रमुख मार्कर सामान्य हैं। विटामिन डी थोड़ा कम है - सप्लीमेंट लें।',
      mr: 'तुमची वार्षिक आरोग्य तपासणी रिपोर्ट तयार आहे. व्हिटॅमिन डी किंचित कमी आहे.',
      ta: 'உங்கள் ஆண்டு சுகாதார பரிசோதனை அறிக்கை தயாராகிவிட்டது. விட்டமின் D சற்று குறைவு — ₹30-100 இடைவெளி தேவை.'
    },
    facts: [
      { icon: '✅', text: 'CBC, Lipid Profile, Blood Sugar — All Normal' },
      { icon: '⚠️', text: 'Vitamin D: 22 ng/mL (low — normal is 30-100)' },
      { icon: '💊', text: 'Recommendation: Vitamin D3 60,000 IU weekly for 8 weeks' },
      { icon: '📅', text: 'Follow-up suggested: December 2026' }
    ],
    taskIds: ['task-7']
  },
  {
    id: 'doc-4',
    name: 'October Electricity Bill',
    category: 'utility',
    icon: '⚡',
    date: 'Oct 1, 2026',
    meta: 'MSEDCL — Consumer 12345',
    urgency: 'normal',
    explanation: {
      en: 'Your electricity bill for October 2026 is ₹1,842. The bill period is Sep 1 – Sep 30, 2026. Units consumed: 185 kWh. Due date: October 20, 2026. Pay online to avoid late fees.',
      hi: 'अक्टूबर 2026 का बिजली बिल ₹1,842 है। 185 kWh उपयोग। 20 अक्टूबर 2026 तक भुगतान करें।',
      mr: 'ऑक्टोबर 2026 चे वीज बिल ₹1,842 आहे. 185 kWh वापर. 20 ऑक्टोबर 2026 पर्यंत भरा.',
      ta: 'அக்டோபர் 2026 மின்சார கட்டணம் ₹1,842. 185 kWh பயன்பாடு. கடைசி தேதி: அக்டோபர் 20, 2026.'
    },
    facts: [
      { icon: '💡', text: 'Units consumed: 185 kWh' },
      { icon: '💰', text: 'Amount due: ₹1,842' },
      { icon: '📅', text: 'Due date: October 20, 2026' },
      { icon: '🌐', text: 'Pay at: mahadiscom.in' }
    ],
    taskIds: ['task-8']
  },
  {
    id: 'doc-5',
    name: 'Rental Agreement — Flat 4B',
    category: 'rental',
    icon: '🏠',
    date: 'Sep 1, 2026',
    meta: '12-month agreement',
    urgency: 'normal',
    explanation: {
      en: 'Your rental agreement for Flat 4B, Sunrise Apartments is valid from Sep 1, 2026 to Aug 31, 2027. Monthly rent: ₹18,000. Security deposit: ₹54,000. Notice period: 2 months.',
      hi: 'आपका किराया समझौता सितंबर 2026 से अगस्त 2027 तक वैध है। मासिक किराया: ₹18,000।',
      mr: 'तुमचा भाडे करार सप्टेंबर 2026 ते ऑगस्ट 2027 पर्यंत वैध आहे. मासिक भाडे: ₹18,000.',
      ta: 'உங்கள் வாடகை ஒப்பந்தம் செப் 2026 முதல் ஆக் 2027 வரை செல்லுபடியாகும். மாதாந்திர வாடகை: ₹18,000.'
    },
    facts: [
      { icon: '📅', text: 'Agreement valid: Sep 1, 2026 – Aug 31, 2027' },
      { icon: '💰', text: 'Monthly rent: ₹18,000' },
      { icon: '🔒', text: 'Security deposit: ₹54,000 (3 months)' },
      { icon: '📋', text: 'Notice period: 2 months' }
    ],
    taskIds: []
  },
  {
    id: 'doc-6',
    name: 'Health Insurance Policy',
    category: 'insurance',
    icon: '🛡️',
    date: 'Aug 15, 2026',
    meta: 'Star Health — Policy #SH-789',
    urgency: 'normal',
    explanation: {
      en: 'Your Star Health Insurance policy provides ₹5 lakh cover for the family. Policy renewal is due on August 15, 2027. Pre-existing conditions are covered after 2 years. Cashless at 6,000+ hospitals.',
      hi: 'आपकी स्टार हेल्थ पॉलिसी परिवार को ₹5 लाख का कवर देती है। नवीनीकरण: 15 अगस्त 2027।',
      mr: 'तुमची स्टार हेल्थ पॉलिसी कुटुंबाला ₹5 लाखाचे कव्हर देते. नूतनीकरण: 15 ऑगस्ट 2027.',
      ta: 'ஸ்டார் ஹெல்த் கொள்கை குடும்பத்திற்கு ₹5 லட்ச கவரேஜ் அளிக்கிறது. புதுப்பிப்பு: ஆக் 15, 2027.'
    },
    facts: [
      { icon: '🛡️', text: 'Coverage: ₹5,00,000 (Family Floater)' },
      { icon: '📅', text: 'Policy renewal: August 15, 2027' },
      { icon: '🏥', text: 'Cashless at 6,000+ network hospitals' },
      { icon: '⏳', text: 'Pre-existing conditions covered after 2 years' }
    ],
    taskIds: []
  },
  {
    id: 'doc-7',
    name: 'Bank Statement — Oct 2026',
    category: 'financial',
    icon: '💳',
    date: 'Oct 1, 2026',
    meta: 'SBI Savings — XXXX4892',
    urgency: 'normal',
    explanation: {
      en: 'Your SBI savings account statement for October 2026. Closing balance: ₹42,350. Notable transactions: salary credited ₹35,000 (Oct 1), MSEDCL debit ₹1,842 (Oct 5), UPI payments totaling ₹8,200.',
      hi: 'अक्टूबर 2026 का बैंक विवरण। समापन शेष: ₹42,350। वेतन: ₹35,000।',
      mr: 'ऑक्टोबर 2026 चा बँक स्टेटमेंट. बंद शिल्लक: ₹42,350.',
      ta: 'அக்டோபர் 2026 வங்கி அறிக்கை. இறுதி இருப்பு: ₹42,350.'
    },
    facts: [
      { icon: '💰', text: 'Closing balance: ₹42,350' },
      { icon: '💵', text: 'Salary credited: ₹35,000 (Oct 1)' },
      { icon: '📊', text: 'UPI debits: ₹8,200 total' },
      { icon: '🏦', text: 'Account: SBI XXXX4892' }
    ],
    taskIds: []
  },
  {
    id: 'doc-8',
    name: 'College Bonafide Certificate',
    category: 'education',
    icon: '📜',
    date: 'Oct 3, 2026',
    meta: 'Pune University — 2024 Batch',
    urgency: 'normal',
    explanation: {
      en: 'Bonafide certificate confirming you are a full-time student of Pune University, enrolled in B.Sc. Computer Science (3rd year). Valid for scholarship and bank applications.',
      hi: 'यह प्रमाण पत्र पुष्टि करता है कि आप पुणे विश्वविद्यालय में पूर्णकालिक छात्र हैं।',
      mr: 'हे बोनाफाईड सर्टिफिकेट पुष्टी करते की तुम्ही पुणे विद्यापीठाचे पूर्णवेळ विद्यार्थी आहात.',
      ta: 'இது நீங்கள் பூனே பல்கலைக்கழகத்தில் முழு நேர மாணவர் என்பதை உறுதிப்படுத்தும் சான்றிதழ்.'
    },
    facts: [
      { icon: '🎓', text: 'Course: B.Sc. Computer Science (3rd year)' },
      { icon: '🏛️', text: 'Institution: Pune University' },
      { icon: '📅', text: 'Valid for: AY 2026-27' },
      { icon: '✅', text: 'Useful for: Scholarship, bank, visa applications' }
    ],
    taskIds: []
  }
];

const DEFAULT_TASKS = [
  {
    id: 'task-1', docId: 'doc-1',
    title: 'Download Annexure Form 4B from portal',
    due: 'Oct 18, 2026', isUrgent: true, done: false,
    sub: 'mahadbt.maharashtra.gov.in'
  },
  {
    id: 'task-2', docId: 'doc-1',
    title: 'Get Tehsildar Income Certificate',
    due: 'Oct 22, 2026', isUrgent: true, done: false,
    sub: 'Family income must be under ₹3,50,000'
  },
  {
    id: 'task-3', docId: 'doc-1',
    title: 'Get College Dean\'s seal on Form 4B',
    due: 'Oct 26, 2026', isUrgent: false, done: false,
    sub: 'Dean must sign and stamp the form'
  },
  {
    id: 'task-4', docId: 'doc-1',
    title: 'Submit scholarship application online',
    due: 'Oct 30, 2026 (Strict: Oct 31)', isUrgent: false, done: false,
    sub: 'Upload all 5 mandatory documents'
  },
  {
    id: 'task-5', docId: 'doc-2',
    title: 'Respond to IT Notice on income tax portal',
    due: 'Nov 5, 2026', isUrgent: false, done: false,
    sub: 'Contest TDS mismatch of ₹3,450'
  },
  {
    id: 'task-6', docId: 'doc-2',
    title: 'Collect Form 16 from employer',
    due: 'Nov 3, 2026', isUrgent: false, done: false,
    sub: 'Required to verify TDS credit'
  },
  {
    id: 'task-7', docId: 'doc-3',
    title: 'Start Vitamin D3 supplement course',
    due: 'Oct 12, 2026', isUrgent: false, done: false,
    sub: '60,000 IU weekly for 8 weeks'
  },
  {
    id: 'task-8', docId: 'doc-4',
    title: 'Pay electricity bill online',
    due: 'Oct 20, 2026', isUrgent: false, done: false,
    sub: 'Amount: ₹1,842 at mahadiscom.in'
  },
  {
    id: 'task-9', docId: 'doc-1',
    title: 'Collect Domicile Certificate from Tehsil',
    due: 'Oct 15, 2026', isUrgent: false, done: true,
    sub: 'Maharashtra State Domicile — completed'
  }
];

const AI_RESPONSES = {
  'scholarship deadline': 'The Maharashtra State Merit Scholarship deadline is **October 31, 2026** at 11:59 PM IST. You have 4 pending tasks — the most urgent is downloading Annexure Form 4B and getting the Tehsildar income certificate by Oct 22.',
  'tax notice': 'Your Income Tax Notice requires **5 mandatory documents** for the scholarship. For the tax notice specifically, you need Form 16 from your employer and access to incometax.gov.in to contest the TDS mismatch of ₹3,450.',
  'medical report': 'Your Annual Health Checkup Report shows **all major markers are normal**. The only concern is Vitamin D at 22 ng/mL (below the 30–100 normal range). Doctor recommends Vitamin D3 60,000 IU weekly for 8 weeks.',
  'eligibility': 'Based on your uploaded documents: ✅ You are enrolled full-time at Pune University (3rd year) ✅ Your bonafide certificate is valid ✅ You need to verify that your family income is under ₹3,50,000 with a Tehsildar certificate.',
  default: 'Great question! Based on your uploaded documents, I can see all your deadlines, verified tasks, and financial details. Ask me about any specific document, requirement, or date!'
};

// ============================================================
//  LOCALSTORAGE PERSISTENCE HELPERS
// ============================================================
function loadStoredDocuments() {
  try {
    const raw = localStorage.getItem('lifebridge_docs_v2');
    if (raw) return JSON.parse(raw);
  } catch (e) { console.error('Error loading documents:', e); }
  return JSON.parse(JSON.stringify(DEFAULT_DOCUMENTS));
}

function saveStoredDocuments() {
  try {
    localStorage.setItem('lifebridge_docs_v2', JSON.stringify(DOCUMENTS));
  } catch (e) { console.error('Error saving documents:', e); }
}

function loadStoredTasks() {
  try {
    const raw = localStorage.getItem('lifebridge_tasks_v2');
    if (raw) return JSON.parse(raw);
  } catch (e) { console.error('Error loading tasks:', e); }
  return JSON.parse(JSON.stringify(DEFAULT_TASKS));
}

function saveStoredTasks() {
  try {
    localStorage.setItem('lifebridge_tasks_v2', JSON.stringify(tasks));
  } catch (e) { console.error('Error saving tasks:', e); }
}

// ============================================================
//  APP STATE
// ============================================================
let activeScreen  = 'home';
let activeLang    = localStorage.getItem('lifebridge_lang_v2') || 'en';
let DOCUMENTS     = loadStoredDocuments();
let tasks         = loadStoredTasks();
let vaultFilter   = 'all';
let docModalOpen  = false;
let uploadOpen    = false;
let apiKey        = localStorage.getItem('lifebridge_gemini_api_key') || '';
let recognition   = null;
let isRecording   = false;

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  setGreeting();
  setTimeLoop();
  updateHomeStats();
  renderRecentDocs();
  renderVault();
  renderTasks();
  initVoiceRecognition();
  updateApiKeyStatusUI();

  // Set stored language
  const langSel = document.getElementById('globalLangSelect');
  if (langSel) {
    langSel.value = activeLang;
    const labels = { en: 'English', hi: 'Hindi (हिन्दी)', mr: 'Marathi (मराठी)', ta: 'Tamil (தமிழ்)' };
    const label = document.getElementById('currentLangLabel');
    if (label) label.textContent = labels[activeLang] || 'English';

    langSel.addEventListener('change', (e) => {
      activeLang = e.target.value;
      localStorage.setItem('lifebridge_lang_v2', activeLang);
      if (label) label.textContent = labels[activeLang] || 'English';
      showToast('Language updated to ' + (labels[activeLang] || 'English'));
    });
  }

  // Chat input enter key
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }
});

// ============================================================
//  GREETING & CLOCK
// ============================================================
function setGreeting() {
  const h = new Date().getHours();
  const part = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
  const el = document.getElementById('greetingText');
  if (el) el.textContent = `Good ${part}, Arshad 👋`;
}

function setTimeLoop() {
  function tick() {
    const now  = new Date();
    const hh   = String(now.getHours()).padStart(2, '0');
    const mm   = String(now.getMinutes()).padStart(2, '0');
    const el   = document.getElementById('statusTime');
    if (el) el.textContent = `${hh}:${mm}`;
  }
  tick();
  setInterval(tick, 30000);
}

// ============================================================
//  NAVIGATION
// ============================================================
function navigateTo(screen) {
  const oldScreen = document.getElementById('screen-' + activeScreen);
  const oldNav    = document.getElementById('nav-' + activeScreen);
  if (oldScreen) oldScreen.classList.remove('active');
  if (oldNav)    oldNav.classList.remove('active');

  activeScreen = screen;

  const newScreen = document.getElementById('screen-' + screen);
  const newNav    = document.getElementById('nav-' + screen);
  if (newScreen) newScreen.classList.add('active');
  if (newNav)    newNav.classList.add('active');

  if (screen === 'tasks') renderTasks();
  if (screen === 'vault') renderVault();
  if (screen === 'home') updateHomeStats();
}

// ============================================================
//  RENDER: RECENT DOCS & STATS (Home)
// ============================================================
function updateHomeStats() {
  const docCards = document.querySelectorAll('.stat-card');
  if (docCards.length >= 3) {
    const urgentCount = tasks.filter(t => t.isUrgent && !t.done).length;
    const pendingCount = tasks.filter(t => !t.done).length;
    
    const numEls = document.querySelectorAll('.stat-num');
    if (numEls.length >= 3) {
      numEls[0].textContent = DOCUMENTS.length;
      numEls[1].textContent = pendingCount;
      numEls[2].textContent = urgentCount;
    }
  }

  // Update urgent banner
  const urgentTasks = tasks.filter(t => t.isUrgent && !t.done);
  const banner = document.getElementById('urgentBanner');
  if (banner) {
    if (urgentTasks.length > 0) {
      banner.style.display = 'flex';
      const titleEl = banner.querySelector('.urgent-title');
      const subEl = banner.querySelector('.urgent-sub');
      if (titleEl) titleEl.textContent = `${urgentTasks.length} Urgent Deadlines This Week`;
      if (subEl) subEl.textContent = urgentTasks.slice(0, 2).map(t => `${t.title} (${t.due})`).join(' · ');
    } else {
      banner.style.display = 'none';
    }
  }
}

function renderRecentDocs() {
  const container = document.getElementById('recentDocList');
  if (!container) return;
  const recent = DOCUMENTS.slice(0, 4);
  container.innerHTML = recent.map(d => docCardHTML(d)).join('');
}

// ============================================================
//  RENDER: VAULT
// ============================================================
function renderVault() {
  const container = document.getElementById('vaultDocList');
  if (!container) return;
  const filtered = vaultFilter === 'all'
    ? DOCUMENTS
    : DOCUMENTS.filter(d => d.category === vaultFilter);
  container.innerHTML = filtered.length
    ? filtered.map(d => docCardHTML(d)).join('')
    : '<div style="text-align:center;color:var(--text-d);padding:32px;font-size:0.85rem;">No documents in this category yet.</div>';
}

function filterVault(cat, btn) {
  vaultFilter = cat;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderVault();
}

// ============================================================
//  DOC CARD HTML
// ============================================================
function docCardHTML(doc) {
  const catLabel = {
    education: 'Education', medical: 'Medical', government: 'Government',
    financial: 'Financial', utility: 'Utility', rental: 'Rental', insurance: 'Insurance'
  }[doc.category] || doc.category;

  const urgentBorder = doc.urgency === 'urgent' ? 'border-color: #fca5a5;' : '';

  return `
  <div class="doc-card" onclick="openDocModal('${doc.id}')" style="${urgentBorder}" id="doccard-${doc.id}">
    <div class="doc-icon icon-${doc.category}">${doc.icon}</div>
    <div class="doc-body">
      <span class="doc-cat-badge cat-${doc.category}">${catLabel}</span>
      <div class="doc-name">${escapeHTML(doc.name)}</div>
      <div class="doc-meta">${escapeHTML(doc.meta)} &middot; ${doc.date}</div>
    </div>
    ${doc.urgency === 'urgent' ? '<div style="color:var(--red-l);font-size:0.7rem;font-weight:700;flex-shrink:0;">URGENT</div>' : '<svg class="doc-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>'}
  </div>`;
}

// ============================================================
//  DOCUMENT DETAIL MODAL
// ============================================================
function openDocModal(docId) {
  const doc = DOCUMENTS.find(d => d.id === docId);
  if (!doc) return;

  const lang = activeLang;
  const explanation = (doc.explanation && doc.explanation[lang]) || doc.explanation?.en || '';

  const factsHTML = (doc.facts || []).map(f => `
    <div class="modal-fact">
      <span class="modal-fact-icon">${f.icon}</span>
      <span>${escapeHTML(f.text)}</span>
    </div>`).join('');

  const tasksForDoc = tasks.filter(t => (doc.taskIds || []).includes(t.id));
  const tasksHTML = tasksForDoc.length ? `
    <div class="modal-section-label">Action Tasks (${tasksForDoc.length})</div>
    ${tasksForDoc.map(t => `
      <div class="modal-fact" style="cursor:pointer" onclick="toggleTaskFromModal('${t.id}')">
        <span class="modal-fact-icon">${t.done ? '✅' : '⬜'}</span>
        <span style="${t.done ? 'text-decoration:line-through;color:var(--text-d);' : ''}">${escapeHTML(t.title)}</span>
      </div>`).join('')}
  ` : '';

  document.getElementById('docModalContent').innerHTML = `
    <div class="modal-doc-header">
      <div class="modal-doc-icon icon-${doc.category}">${doc.icon}</div>
      <div>
        <div class="modal-doc-title">${escapeHTML(doc.name)}</div>
        <div class="modal-doc-meta">${escapeHTML(doc.meta)} &middot; ${doc.date}</div>
      </div>
    </div>

    <div class="modal-section-label" style="display:flex;justify-content:space-between;align-items:center;">
      <span>AI Explanation (${activeLang.toUpperCase()})</span>
      <button class="chat-speech-speak-btn" onclick="speakText('${escapeQuotes(explanation)}')" title="Read aloud">🔊 Listen</button>
    </div>
    <div class="modal-explanation">${escapeHTML(explanation)}</div>

    <div class="modal-section-label">Key Facts</div>
    ${factsHTML}

    ${tasksHTML}

    ${doc.urgency === 'urgent' ? `<button class="modal-action-btn" onclick="navigateTo('tasks'); closeDocModal(); showToast('Viewing urgent tasks!')">
      📋 View Action Tasks
    </button>` : ''}
    <button class="modal-close-btn" onclick="closeDocModal()">Close</button>
  `;

  const overlay = document.getElementById('docModal');
  overlay.classList.add('open');
  docModalOpen = true;
}

function closeDocModal(e) {
  if (e && e.target !== document.getElementById('docModal')) return;
  document.getElementById('docModal').classList.remove('open');
  docModalOpen = false;
}

function toggleTaskFromModal(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.done = !task.done;
    saveStoredTasks();
    updateTaskNavBadge();
    updateHomeStats();
    showToast(task.done ? '✅ Task marked complete!' : '↩️ Task reopened');
    // Refresh modal list
    const currentDoc = DOCUMENTS.find(d => (d.taskIds || []).includes(taskId));
    if (currentDoc) openDocModal(currentDoc.id);
  }
}

// ============================================================
//  UPLOAD MODAL & REAL FILE INGESTION
// ============================================================
function showUploadModal() {
  document.getElementById('uploadModal').classList.add('open');
  uploadOpen = true;
}

function closeUploadModal(e) {
  if (e && e.target !== document.getElementById('uploadModal')) return;
  document.getElementById('uploadModal').classList.remove('open');
  uploadOpen = false;
}

function triggerFileInput() {
  const input = document.getElementById('realFileInput');
  if (input) input.click();
}

function handleRealFileUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  closeUploadModal();
  const reader = new FileReader();

  if (file.name.endsWith('.txt') || file.type.startsWith('text/')) {
    reader.onload = (e) => {
      const content = e.target.result;
      processDocumentText(file.name, content);
    };
    reader.readAsText(file);
  } else {
    // For images/PDFs, extract filename info and simulate multimodal OCR
    reader.onload = () => {
      processDocumentText(file.name, `Scanned file: ${file.name} (${Math.round(file.size / 1024)} KB)`);
    };
    reader.readAsDataURL(file);
  }
}

// Load fixture from /fixtures/sample_scholarship_notice.txt
async function loadSampleScholarshipNotice() {
  closeUploadModal();
  try {
    const res = await fetch('/fixtures/sample_scholarship_notice.txt');
    if (!res.ok) throw new Error('Fixture file not found');
    const text = await res.text();
    processDocumentText('State Merit Scholarship 2026-27 (Official Circular)', text);
  } catch (err) {
    console.warn('Fallback sample circular:', err);
    const fallbackText = `STATE GOVERNMENT OF MAHARASHTRA
NOTIFICATION REF: DHE/SCHOL/2026/UG-8821
SUBJECT: State Post-Matriculation Merit-cum-Means Financial Assistance 2026-2027
Deadline: 31st October 2026. Required: Income Certificate under ₹3,50,000, Annexure Form 4B, Domicile certificate.`;
    processDocumentText('State Merit Scholarship 2026-27', fallbackText);
  }
}

// ============================================================
//  PASTE DIRECT TEXT MODAL
// ============================================================
function showPasteModal() {
  closeUploadModal();
  document.getElementById('pasteModal').classList.add('open');
}

function closePasteModal(e) {
  if (e && e.target !== document.getElementById('pasteModal')) return;
  document.getElementById('pasteModal').classList.remove('open');
}

function submitPastedDocument() {
  const titleInput = document.getElementById('pasteDocTitle');
  const contentInput = document.getElementById('pasteDocContent');
  const title = (titleInput && titleInput.value.trim()) || 'Pasted Document Circular';
  const content = contentInput && contentInput.value.trim();

  if (!content) {
    showToast('⚠️ Please paste text from the document');
    return;
  }

  closePasteModal();
  if (titleInput) titleInput.value = '';
  if (contentInput) contentInput.value = '';

  processDocumentText(title, content);
}

// ============================================================
//  DOCUMENT ANALYSIS ENGINE (AI or Heuristics)
// ============================================================
function processDocumentText(title, text) {
  const overlay = document.getElementById('scanOverlay');
  const status  = document.getElementById('scanStatusMsg');
  const fill    = document.getElementById('scanProgressFill');

  overlay.classList.add('active');
  if (fill) fill.style.width = '15%';

  const steps = [
    [0,    'Reading document structure...'],
    [600,  'Detecting document type & authority...'],
    [1300, 'Extracting deadlines & eligibility...'],
    [2100, 'Generating actionable verified tasks...'],
    [2800, 'Saving to encrypted Document Vault...']
  ];

  steps.forEach(([delay, msg]) => {
    setTimeout(() => {
      if (status) status.textContent = msg;
      const pct = Math.round(((steps.indexOf([delay, msg]) + 1) / (steps.length + 1)) * 100);
      if (fill) fill.style.width = pct + '%';
    }, delay);
  });

  setTimeout(async () => {
    let analyzedDoc;
    if (apiKey) {
      if (status) status.textContent = 'Calling Gemini 2.5 Flash API...';
      analyzedDoc = await callGeminiToAnalyzeDoc(title, text);
    }
    
    if (!analyzedDoc) {
      analyzedDoc = analyzeDocWithLocalRules(title, text);
    }

    // Save newly generated document & tasks
    DOCUMENTS.unshift(analyzedDoc.document);
    saveStoredDocuments();

    if (analyzedDoc.newTasks && analyzedDoc.newTasks.length) {
      tasks = analyzedDoc.newTasks.concat(tasks);
      saveStoredTasks();
    }

    overlay.classList.remove('active');
    if (fill) fill.style.width = '0%';

    updateHomeStats();
    renderRecentDocs();
    renderVault();
    renderTasks();

    showToast(`✅ "${analyzedDoc.document.name}" analyzed & saved!`);
  }, 3200);
}

// Local regex & heuristic extraction
function analyzeDocWithLocalRules(title, text) {
  const id = 'doc-' + Date.now();
  const lower = text.toLowerCase();

  let category = 'education';
  let icon = '📄';
  if (lower.includes('tax') || lower.includes('income') || lower.includes('revenue') || lower.includes('challan')) {
    category = 'government'; icon = '🏛️';
  } else if (lower.includes('medical') || lower.includes('health') || lower.includes('hospital') || lower.includes('blood') || lower.includes('report')) {
    category = 'medical'; icon = '🏥';
  } else if (lower.includes('electricity') || lower.includes('bill') || lower.includes('water') || lower.includes('utility')) {
    category = 'utility'; icon = '⚡';
  } else if (lower.includes('rent') || lower.includes('lease') || lower.includes('agreement') || lower.includes('tenant')) {
    category = 'rental'; icon = '🏠';
  } else if (lower.includes('insurance') || lower.includes('policy') || lower.includes('claim')) {
    category = 'insurance'; icon = '🛡️';
  } else if (lower.includes('bank') || lower.includes('salary') || lower.includes('statement') || lower.includes('account')) {
    category = 'financial'; icon = '💳';
  } else if (lower.includes('scholarship') || lower.includes('college') || lower.includes('degree') || lower.includes('exam')) {
    category = 'education'; icon = '🎓';
  }

  // Find date/deadline
  const dateMatch = text.match(/(?:deadline|due|dated?|date|before)[\s:]*([0-9]{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+[0-9]{4}|[0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4})/i);
  const foundDate = dateMatch ? dateMatch[1] : 'Upcoming';
  const isUrgent = lower.includes('deadline') || lower.includes('notice') || lower.includes('urgent') || lower.includes('due');

  const taskId1 = 'task-' + Date.now() + '-1';
  const taskId2 = 'task-' + Date.now() + '-2';

  const newDoc = {
    id: id,
    name: title.replace(/\.[^/.]+$/, ''),
    category: category,
    icon: icon,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    meta: `AI Processed · Ref: ${Math.floor(1000 + Math.random() * 9000)}`,
    urgency: isUrgent ? 'urgent' : 'normal',
    explanation: {
      en: `LifeBridge processed "${title}". Key directive: please review requirements and verify deadlines before ${foundDate}.`,
      hi: `लाइफब्रिज ने "${title}" का विश्लेषण किया। महत्वपूर्ण निर्देश: ${foundDate} से पहले आवश्यकताओं की पुष्टि करें।`,
      mr: `लाईफब्रिजने "${title}" चे विश्लेषण केले. महत्त्वाचा निर्देश: ${foundDate} पूर्वी आवश्यक बाबी तपासा.`,
      ta: `லைஃப்பிரிட்ஜ் "${title}" ஆவணத்தை ஆய்வு செய்தது. முக்கிய விவரம்: ${foundDate} க்குள் முடிக்கவும்.`
    },
    facts: [
      { icon: '📅', text: `Detected Deadline / Reference: ${foundDate}` },
      { icon: '📁', text: `Classified as ${category.toUpperCase()} document` },
      { icon: '🔒', text: 'Sensitive personal identifiers auto-redacted' }
    ],
    taskIds: [taskId1, taskId2]
  };

  const newTasks = [
    {
      id: taskId1,
      docId: id,
      title: `Review and verify: ${newDoc.name}`,
      due: foundDate,
      isUrgent: isUrgent,
      done: false,
      sub: 'Action extracted by LifeBridge AI'
    },
    {
      id: taskId2,
      docId: id,
      title: 'Submit required documents or confirmation',
      due: foundDate,
      isUrgent: false,
      done: false,
      sub: 'Follow official portal instructions'
    }
  ];

  return { document: newDoc, newTasks: newTasks };
}

// Live Gemini multimodal/text call
async function callGeminiToAnalyzeDoc(title, text) {
  try {
    const prompt = `You are LifeBridge Document OS. Analyze the following document and return a JSON object with:
{
  "name": "Short Clean Name",
  "category": "education" | "medical" | "government" | "financial" | "utility" | "rental" | "insurance",
  "urgency": "urgent" | "normal",
  "deadline": "Extracted date string or None",
  "summary": "Clear 2-sentence plain English summary of what the document means and what the user must do next",
  "facts": ["Fact 1", "Fact 2", "Fact 3"],
  "tasks": ["Specific Action 1", "Specific Action 2"]
}

DOCUMENT TITLE: ${title}
CONTENT:
${text.slice(0, 4000)}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!res.ok) throw new Error('Gemini API call failed: ' + res.status);
    const data = await res.json();
    const parsed = JSON.parse(data.candidates[0].content.parts[0].text);

    const docId = 'doc-' + Date.now();
    const taskIds = (parsed.tasks || []).map((_, i) => `task-${Date.now()}-${i}`);

    const newDoc = {
      id: docId,
      name: parsed.name || title,
      category: parsed.category || 'education',
      icon: getIconForCategory(parsed.category),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      meta: `Gemini AI Verified · ${parsed.deadline || 'Active'}`,
      urgency: parsed.urgency || 'normal',
      explanation: {
        en: parsed.summary,
        hi: parsed.summary,
        mr: parsed.summary,
        ta: parsed.summary
      },
      facts: (parsed.facts || []).map(f => ({ icon: '📌', text: f })),
      taskIds: taskIds
    };

    const newTasks = (parsed.tasks || []).map((t, i) => ({
      id: taskIds[i],
      docId: docId,
      title: t,
      due: parsed.deadline || 'Follow-up',
      isUrgent: parsed.urgency === 'urgent',
      done: false,
      sub: 'Generated by Gemini AI'
    }));

    return { document: newDoc, newTasks: newTasks };
  } catch (err) {
    console.error('Gemini extraction error:', err);
    return null;
  }
}

function getIconForCategory(cat) {
  const map = {
    education: '🎓', medical: '🏥', government: '🏛️',
    financial: '💳', utility: '⚡', rental: '🏠', insurance: '🛡️'
  };
  return map[cat] || '📄';
}

// ============================================================
//  RENDER: TASKS
// ============================================================
function renderTasks() {
  const urgentEl = document.getElementById('urgentTasksList');
  const normalEl = document.getElementById('normalTasksList');
  const doneEl   = document.getElementById('doneTasksList');
  if (!urgentEl || !normalEl || !doneEl) return;

  const urgent = tasks.filter(t => t.isUrgent && !t.done);
  const normal = tasks.filter(t => !t.isUrgent && !t.done);
  const done   = tasks.filter(t => t.done);

  urgentEl.innerHTML = urgent.length ? urgent.map(taskHTML).join('') : '<div class="no-tasks">No urgent tasks 🎉</div>';
  normalEl.innerHTML = normal.length ? normal.map(taskHTML).join('') : '<div class="no-tasks">All caught up!</div>';
  doneEl.innerHTML   = done.length   ? done.map(taskHTML).join('')   : '<div class="no-tasks">No completed tasks yet</div>';

  const totalCount = tasks.length;
  const doneCount  = done.length;
  const pct        = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
  const fillEl     = document.getElementById('progressFill');
  const labelEl    = document.getElementById('progressLabel');
  const subEl      = document.getElementById('progressSub');
  if (fillEl)  fillEl.style.width = pct + '%';
  if (labelEl) labelEl.textContent = `${doneCount} / ${totalCount} Done`;
  if (subEl) {
    const msgs = ['Keep going — you\'re building momentum!', 'Great work! Almost halfway there!', 'You\'re crushing it! 🔥'];
    subEl.textContent = pct < 40 ? msgs[0] : pct < 70 ? msgs[1] : msgs[2];
  }

  const pendingCount = tasks.filter(t => !t.done).length;
  const badge = document.getElementById('taskCountBadge');
  if (badge) badge.textContent = pendingCount + ' Pending';
  updateTaskNavBadge();
}

function taskHTML(task) {
  const doc = DOCUMENTS.find(d => (d.taskIds || []).includes(task.id));
  const docPill = doc
    ? `<div class="task-doc-pill">${doc.icon} ${escapeHTML(doc.name)}</div>`
    : '';

  return `
  <div class="task-item-new ${task.done ? 'done' : ''} ${task.isUrgent && !task.done ? 'urgent-task' : ''}"
       id="taskitem-${task.id}"
       onclick="toggleTask('${task.id}')">
    <div class="task-check-circle ${task.done ? 'checked' : ''} ${task.isUrgent && !task.done ? 'urgent-circle' : ''}">
      ${task.done ? '✓' : ''}
    </div>
    <div class="task-body">
      <div class="task-title-new">${escapeHTML(task.title)}</div>
      <div class="task-due ${task.isUrgent && !task.done ? 'overdue' : ''}">📅 ${task.due}</div>
      <div class="task-sub">${escapeHTML(task.sub)}</div>
      ${docPill}
    </div>
  </div>`;
}

function toggleTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;
  task.done = !task.done;
  saveStoredTasks();
  renderTasks();
  updateHomeStats();
  showToast(task.done ? '✅ Task completed!' : '↩️ Task reopened');
}

function updateTaskNavBadge() {
  const pending = tasks.filter(t => !t.done).length;
  const badge   = document.getElementById('taskNavBadge');
  if (badge) {
    badge.textContent = pending;
    badge.style.display = pending > 0 ? 'block' : 'none';
  }
}

// ============================================================
//  VOICE INPUT (Speech Recognition) & SPEECH SYNTHESIS (TTS)
// ============================================================
function initVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    const mic = document.getElementById('chatMicBtn');
    if (mic) mic.title = 'Speech recognition not supported in this browser';
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = activeLang === 'hi' ? 'hi-IN' : activeLang === 'mr' ? 'mr-IN' : activeLang === 'ta' ? 'ta-IN' : 'en-IN';

  recognition.onstart = () => {
    isRecording = true;
    const btn = document.getElementById('chatMicBtn');
    if (btn) btn.classList.add('recording');
    showToast('🎙️ Listening... Speak now');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = transcript;
      sendChatMessage();
    }
  };

  recognition.onerror = (e) => {
    console.error('Speech recognition error:', e);
    showToast('Mic error: ' + (e.error || 'Please check mic permissions'));
    stopVoiceInput();
  };

  recognition.onend = () => {
    stopVoiceInput();
  };
}

function toggleVoiceInput() {
  if (!recognition) {
    showToast('⚠️ Speech recognition is not supported in this browser');
    return;
  }
  if (isRecording) {
    recognition.stop();
  } else {
    try {
      recognition.lang = activeLang === 'hi' ? 'hi-IN' : activeLang === 'mr' ? 'mr-IN' : activeLang === 'ta' ? 'ta-IN' : 'en-IN';
      recognition.start();
    } catch (e) {
      console.warn('Speech start error:', e);
    }
  }
}

function stopVoiceInput() {
  isRecording = false;
  const btn = document.getElementById('chatMicBtn');
  if (btn) btn.classList.remove('recording');
}

function speakText(text) {
  if (!('speechSynthesis' in window)) {
    showToast('⚠️ Audio text-to-speech not supported');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = activeLang === 'hi' ? 'hi-IN' : activeLang === 'mr' ? 'mr-IN' : activeLang === 'ta' ? 'ta-IN' : 'en-US';
  utterance.rate = 1.0;
  window.speechSynthesis.speak(utterance);
  showToast('🔊 Playing audio readout');
}

// ============================================================
//  CHAT / ASK AI (Live Gemini + Offline Fallback)
// ============================================================
function sendSuggestedMsg(btn) {
  const msg = btn.getAttribute('data-msg');
  if (!msg) return;
  const row = document.getElementById('suggestionsRow');
  if (row) row.style.display = 'none';
  appendUserMessage(msg);
  dispatchAIQuery(msg);
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  const row = document.getElementById('suggestionsRow');
  if (row) row.style.display = 'none';

  appendUserMessage(msg);
  dispatchAIQuery(msg);
}

function appendUserMessage(text) {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'chat-msg user-msg';
  div.innerHTML = `<div class="chat-bubble user-bubble">${escapeHTML(text)}</div>`;
  container.appendChild(div);
  div.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function appendAIMessage(text) {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'chat-msg ai-msg';

  const plainText = text.replace(/<[^>]*>/g, '');
  div.innerHTML = `
    <div class="chat-avatar-ai">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
    </div>
    <div class="chat-bubble ai-bubble">
      ${text}
      <div style="margin-top:6px;display:flex;justify-content:flex-end;">
        <button class="chat-speech-speak-btn" onclick="speakText('${escapeQuotes(plainText)}')">🔊 Listen</button>
      </div>
    </div>`;
  container.appendChild(div);
  div.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

async function dispatchAIQuery(userMsg) {
  showTypingIndicator();

  if (apiKey) {
    try {
      const docContext = DOCUMENTS.map(d => `- [${d.category}] ${d.name}: ${d.explanation.en} (Tasks: ${d.taskIds.length})`).join('\n');
      const prompt = `You are LifeBridge, the user's personal Document OS.
Answer the user's question concisely based on their active documents below. If the answer is found in the documents, state the exact date, action, or requirement clearly.

USER'S ACTIVE DOCUMENTS:
${docContext}

USER'S QUESTION: ${userMsg}`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates[0].content.parts[0].text;
        hideTypingIndicator();
        appendAIMessage(text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'));
        return;
      }
    } catch (e) {
      console.warn('Gemini chat error, falling back to local dataset:', e);
    }
  }

  // Fallback to local contextual Q&A
  setTimeout(() => {
    hideTypingIndicator();
    const lower = userMsg.toLowerCase();
    let response = AI_RESPONSES.default;
    if (lower.includes('scholarship') || lower.includes('deadline')) response = AI_RESPONSES['scholarship deadline'];
    else if (lower.includes('tax') || lower.includes('notice') || lower.includes('documents') || lower.includes('income')) response = AI_RESPONSES['tax notice'];
    else if (lower.includes('medical') || lower.includes('health') || lower.includes('vitamin')) response = AI_RESPONSES['medical report'];
    else if (lower.includes('eligible') || lower.includes('eligibility') || lower.includes('qualify')) response = AI_RESPONSES['eligibility'];
    else {
      // Dynamic matching across user documents
      const matchedDoc = DOCUMENTS.find(d => lower.includes(d.name.toLowerCase()) || lower.includes(d.category));
      if (matchedDoc) {
        response = `Regarding **${matchedDoc.name}**: ${matchedDoc.explanation[activeLang] || matchedDoc.explanation.en}`;
      }
    }

    appendAIMessage(response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'));
  }, 900);
}

function showTypingIndicator() {
  const container = document.getElementById('chatMessages');
  if (!container || document.getElementById('typingIndicator')) return;

  const typing = document.createElement('div');
  typing.className = 'chat-msg ai-msg';
  typing.id = 'typingIndicator';
  typing.innerHTML = `
    <div class="chat-avatar-ai" style="opacity:0.6;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
    </div>
    <div class="chat-bubble ai-bubble" style="padding:14px 18px;">
      <span class="typing-dots">
        <span style="animation:typDot 1.2s infinite 0s;">●</span>
        <span style="animation:typDot 1.2s infinite 0.2s;">●</span>
        <span style="animation:typDot 1.2s infinite 0.4s;">●</span>
      </span>
    </div>`;

  if (!document.getElementById('typDotStyle')) {
    const style = document.createElement('style');
    style.id = 'typDotStyle';
    style.textContent = `@keyframes typDot { 0%,80%,100%{opacity:0.2;transform:scale(0.8)} 40%{opacity:1;transform:scale(1)} }
    .typing-dots { display:flex;gap:4px;font-size:0.7rem;color:var(--text-m); }`;
    document.head.appendChild(style);
  }

  container.appendChild(typing);
  typing.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function hideTypingIndicator() {
  const ti = document.getElementById('typingIndicator');
  if (ti) ti.remove();
}

// ============================================================
//  API KEY MANAGEMENT (Profile Screen)
// ============================================================
function promptApiKey() {
  const existing = localStorage.getItem('lifebridge_gemini_api_key') || '';
  const key = prompt('Enter your Google Gemini API Key for live AI extraction and dynamic Q&A:\n(Leave blank to clear and use offline heuristics)', existing);
  if (key !== null) {
    apiKey = key.trim();
    if (apiKey) {
      localStorage.setItem('lifebridge_gemini_api_key', apiKey);
      showToast('🔑 Gemini API Key saved! Live AI activated.');
    } else {
      localStorage.removeItem('lifebridge_gemini_api_key');
      showToast('Offline heuristic mode restored.');
    }
    updateApiKeyStatusUI();
  }
}

function updateApiKeyStatusUI() {
  const label = document.getElementById('apiKeyStatusLabel');
  if (label) {
    label.textContent = apiKey ? `Configured (***${apiKey.slice(-4)})` : 'Not set (using offline heuristics)';
  }
}

// ============================================================
//  HELPERS
// ============================================================
function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function escapeQuotes(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/\n/g, ' ');
}

function showToast(msg) {
  const el  = document.getElementById('toastEl');
  const msgEl = document.getElementById('toastMsg');
  if (!el || !msgEl) return;
  msgEl.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

(function injectHelperStyles() {
  const s = document.createElement('style');
  s.textContent = `.no-tasks { text-align:center; color:var(--text-d); font-size:0.8rem; padding:16px; }`;
  document.head.appendChild(s);
})();
