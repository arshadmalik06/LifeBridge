// ============================================================
//  LifeBridge Mobile Web App — app.js
//  Multi-screen document OS demo
// ============================================================

'use strict';

// ============================================================
//  DATA
// ============================================================
const DOCUMENTS = [
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

const TASKS = [
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
  default: 'Great question! Based on your 8 uploaded documents, I can see you have an urgent scholarship deadline (Oct 31), a tax notice response due Nov 5, and a Vitamin D supplement task from your medical report. Which document would you like to dive into?'
};

// ============================================================
//  APP STATE
// ============================================================
let activeScreen  = 'home';
let activeLang    = 'en';
let tasks         = JSON.parse(JSON.stringify(TASKS));
let vaultFilter   = 'all';
let docModalOpen  = false;
let uploadOpen    = false;

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  setGreeting();
  setTimeLoop();
  renderRecentDocs();
  renderVault();
  renderTasks();

  // Chat input enter key
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  // Language select
  const langSel = document.getElementById('globalLangSelect');
  if (langSel) {
    langSel.addEventListener('change', (e) => {
      activeLang = e.target.value;
      const labels = { en: 'English', hi: 'Hindi (हिन्दी)', mr: 'Marathi (मराठी)', ta: 'Tamil (தமிழ்)' };
      const label = document.getElementById('currentLangLabel');
      if (label) label.textContent = labels[activeLang] || 'English';
      showToast('Language updated to ' + (labels[activeLang] || 'English'));
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
  // Deactivate old screen + nav item
  const oldScreen = document.getElementById('screen-' + activeScreen);
  const oldNav    = document.getElementById('nav-' + activeScreen);
  if (oldScreen) oldScreen.classList.remove('active');
  if (oldNav)    oldNav.classList.remove('active');

  activeScreen = screen;

  // Activate new screen + nav item
  const newScreen = document.getElementById('screen-' + screen);
  const newNav    = document.getElementById('nav-' + screen);
  if (newScreen) newScreen.classList.add('active');
  if (newNav)    newNav.classList.add('active');

  // Screen-specific refresh
  if (screen === 'tasks') renderTasks();
}

// ============================================================
//  RENDER: RECENT DOCS (Home — show 4 most recent)
// ============================================================
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

  const urgentBorder = doc.urgency === 'urgent'
    ? 'border-color: #fca5a5;'
    : '';

  return `
  <div class="doc-card" onclick="openDocModal('${doc.id}')" style="${urgentBorder}" id="doccard-${doc.id}">
    <div class="doc-icon icon-${doc.category}">${doc.icon}</div>
    <div class="doc-body">
      <span class="doc-cat-badge cat-${doc.category}">${catLabel}</span>
      <div class="doc-name">${doc.name}</div>
      <div class="doc-meta">${doc.meta} &middot; ${doc.date}</div>
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

  const factsHTML = doc.facts.map(f => `
    <div class="modal-fact">
      <span class="modal-fact-icon">${f.icon}</span>
      <span>${f.text}</span>
    </div>`).join('');

  const tasksForDoc = tasks.filter(t => doc.taskIds.includes(t.id));
  const tasksHTML = tasksForDoc.length ? `
    <div class="modal-section-label">Action Tasks (${tasksForDoc.length})</div>
    ${tasksForDoc.map(t => `
      <div class="modal-fact" style="cursor:pointer" onclick="toggleTaskFromModal('${t.id}')">
        <span class="modal-fact-icon">${t.done ? '✅' : '⬜'}</span>
        <span style="${t.done ? 'text-decoration:line-through;color:var(--text-d);' : ''}">${t.title}</span>
      </div>`).join('')}
  ` : '';

  document.getElementById('docModalContent').innerHTML = `
    <div class="modal-doc-header">
      <div class="modal-doc-icon icon-${doc.category}">${doc.icon}</div>
      <div>
        <div class="modal-doc-title">${doc.name}</div>
        <div class="modal-doc-meta">${doc.meta} &middot; ${doc.date}</div>
      </div>
    </div>

    <div class="modal-section-label">AI Explanation</div>
    <div class="modal-explanation">${explanation}</div>

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
    updateTaskNavBadge();
    showToast(task.done ? '✅ Task marked complete!' : '↩️ Task reopened');
  }
}

// ============================================================
//  UPLOAD MODAL
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

function simulateUpload() {
  document.getElementById('uploadModal').classList.remove('open');
  uploadOpen = false;
  startScan();
}

// ============================================================
//  SCANNING ANIMATION
// ============================================================
function startScan() {
  const overlay = document.getElementById('scanOverlay');
  const status  = document.getElementById('scanStatusMsg');
  const fill    = document.getElementById('scanProgressFill');

  overlay.classList.add('active');

  const steps = [
    [0,    'Reading document structure...'],
    [700,  'Detecting document type...'],
    [1500, 'Extracting deadlines & key facts...'],
    [2300, 'Verifying official portal links...'],
    [3000, 'Generating action tasks...'],
    [3700, null]  // done
  ];

  steps.forEach(([delay, msg]) => {
    setTimeout(() => {
      if (msg === null) {
        overlay.classList.remove('active');
        fill.style.width = '0%';
        showToast('✅ Document analyzed! Vault updated.');
      } else {
        if (status) status.textContent = msg;
        const pct = Math.round(((steps.indexOf([delay, msg]) + 1) / (steps.length - 1)) * 100);
        if (fill) fill.style.width = pct + '%';
      }
    }, delay);
  });

  // Calculate progress manually
  steps.forEach(([delay,], idx) => {
    setTimeout(() => {
      const pct = Math.round((idx / (steps.length - 1)) * 100);
      if (fill) fill.style.width = Math.min(pct, 100) + '%';
    }, delay);
  });
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

  // Update progress
  const totalCount = tasks.length;
  const doneCount  = done.length;
  const pct        = Math.round((doneCount / totalCount) * 100);
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
  const doc = DOCUMENTS.find(d => d.taskIds && d.taskIds.includes(task.id));
  const docPill = doc
    ? `<div class="task-doc-pill">${doc.icon} ${doc.name}</div>`
    : '';

  return `
  <div class="task-item-new ${task.done ? 'done' : ''} ${task.isUrgent && !task.done ? 'urgent-task' : ''}"
       id="taskitem-${task.id}"
       onclick="toggleTask('${task.id}')">
    <div class="task-check-circle ${task.done ? 'checked' : ''} ${task.isUrgent && !task.done ? 'urgent-circle' : ''}">
      ${task.done ? '✓' : ''}
    </div>
    <div class="task-body">
      <div class="task-title-new">${task.title}</div>
      <div class="task-due ${task.isUrgent && !task.done ? 'overdue' : ''}">📅 ${task.due}</div>
      <div class="task-sub">${task.sub}</div>
      ${docPill}
    </div>
  </div>`;
}

function toggleTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;
  task.done = !task.done;
  renderTasks();
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
//  CHAT / ASK AI
// ============================================================
function sendSuggestedMsg(btn) {
  const msg = btn.getAttribute('data-msg');
  if (!msg) return;
  // Hide suggestions row
  const row = document.getElementById('suggestionsRow');
  if (row) row.style.display = 'none';
  appendUserMessage(msg);
  simulateAIResponse(msg);
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
  simulateAIResponse(msg);
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
  div.innerHTML = `
    <div class="chat-avatar-ai">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
    </div>
    <div class="chat-bubble ai-bubble">${text}</div>`;
  container.appendChild(div);
  div.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function simulateAIResponse(userMsg) {
  // Typing indicator
  const container = document.getElementById('chatMessages');
  if (!container) return;

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

  // Inject typing keyframes if not present
  if (!document.getElementById('typDotStyle')) {
    const style = document.createElement('style');
    style.id = 'typDotStyle';
    style.textContent = `@keyframes typDot { 0%,80%,100%{opacity:0.2;transform:scale(0.8)} 40%{opacity:1;transform:scale(1)} }
    .typing-dots { display:flex;gap:4px;font-size:0.7rem;color:var(--text-m); }`;
    document.head.appendChild(style);
  }

  container.appendChild(typing);
  typing.scrollIntoView({ behavior: 'smooth', block: 'end' });

  const delay = 900 + Math.random() * 600;
  setTimeout(() => {
    const ti = document.getElementById('typingIndicator');
    if (ti) ti.remove();

    // Pick AI response
    const lower = userMsg.toLowerCase();
    let response = AI_RESPONSES.default;
    if (lower.includes('scholarship') || lower.includes('deadline')) response = AI_RESPONSES['scholarship deadline'];
    else if (lower.includes('tax') || lower.includes('notice') || lower.includes('documents') || lower.includes('income')) response = AI_RESPONSES['tax notice'];
    else if (lower.includes('medical') || lower.includes('health') || lower.includes('vitamin')) response = AI_RESPONSES['medical report'];
    else if (lower.includes('eligible') || lower.includes('eligibility') || lower.includes('qualify')) response = AI_RESPONSES['eligibility'];

    // Format markdown-style bold
    const formatted = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    appendAIMessage(formatted);
  }, delay);
}

function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ============================================================
//  TOAST
// ============================================================
function showToast(msg) {
  const el  = document.getElementById('toastEl');
  const msgEl = document.getElementById('toastMsg');
  if (!el || !msgEl) return;
  msgEl.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

// ============================================================
//  ADD STYLE for "no-tasks" helper
// ============================================================
(function injectHelperStyles() {
  const s = document.createElement('style');
  s.textContent = `.no-tasks { text-align:center; color:var(--text-d); font-size:0.8rem; padding:16px; }`;
  document.head.appendChild(s);
})();
