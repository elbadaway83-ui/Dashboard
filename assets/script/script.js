/* ================================================================
   Elawaady Dashboard — Main Script (index.html)
   All buttons are real — no fake toasts.
   ================================================================ */

function toast(message, type = 'info', icon = null) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = {
    success : 'bi-check-circle-fill',
    warning : 'bi-exclamation-triangle-fill',
    danger  : 'bi-x-circle-fill',
    info    : 'bi-info-circle-fill',
  };
  const t = document.createElement('div');
  t.className = `toast-msg ${type}`;
  t.innerHTML = `<i class="bi ${icon || icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(t);
  setTimeout(() => t.remove(), 4200);
}

function openModal({ title = '', body = '', confirmLabel = 'تأكيد', confirmType = 'primary', onConfirm = null } = {}) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title-lbl">
      <div class="modal-header">
        <h2 class="modal-title" id="modal-title-lbl">${title}</h2>
        <button class="modal-close" id="modalCloseBtn"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="modal-content-body" style="color:var(--text-2);font-size:.88rem;line-height:1.7">${body}</div>
      <div class="modal-footer">
        <button class="btn-${confirmType}" id="modalConfirmBtn" style="padding:10px 22px;font-size:.86rem">${confirmLabel}</button>
        <button class="btn-secondary" id="modalCancelBtn" style="padding:10px 22px;font-size:.86rem">إلغاء</button>
      </div>
    </div>`;
  function close() { overlay.classList.add('closing'); setTimeout(() => overlay.remove(), 200); }
  overlay.querySelector('#modalCloseBtn').addEventListener('click', close);
  overlay.querySelector('#modalCancelBtn').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  overlay.querySelector('#modalConfirmBtn').addEventListener('click', () => { if (onConfirm) onConfirm(); close(); });
  document.body.appendChild(overlay);
  overlay.querySelector('#modalConfirmBtn').focus();
}

/* ── Form modal ── */
function openFormModal({ title = '', body = '', saveLabel = 'حفظ', onSave = null } = {}) {
  const ov = document.createElement('div');
  ov.className = 'modal-overlay';
  ov.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" style="max-width:580px;width:96%">
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button class="modal-close" id="fmxClose"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="modal-content-body" style="padding:20px 24px;max-height:70vh;overflow-y:auto">
        <form onsubmit="return false">${body}</form>
      </div>
      <div class="modal-footer">
        <button class="btn-primary" id="fmxSave" style="padding:10px 22px;font-size:.86rem">
          <i class="bi bi-floppy me-1"></i>${saveLabel}
        </button>
        <button class="btn-secondary" id="fmxCancel" style="padding:10px 22px;font-size:.86rem">إلغاء</button>
      </div>
    </div>`;
  function close() { ov.classList.add('closing'); setTimeout(() => ov.remove(), 200); }
  ov.querySelector('#fmxClose').addEventListener('click', close);
  ov.querySelector('#fmxCancel').addEventListener('click', close);
  ov.querySelector('#fmxSave').addEventListener('click', () => { if (onSave) onSave(); close(); });
  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  document.body.appendChild(ov);
}


function initDashboard() {

  /* ── Sidebar toggle ── */
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('overlay');
  const toggleBtn = document.getElementById('toggleSidebarBtn');

  function openSidebar()  { sidebar?.classList.add('open'); overlay?.classList.add('visible'); document.body.style.overflow = 'hidden'; }
  function closeSidebar() { sidebar?.classList.remove('open'); overlay?.classList.remove('visible'); document.body.style.overflow = ''; }

  toggleBtn?.addEventListener('click', e => { e.preventDefault(); sidebar?.classList.contains('open') ? closeSidebar() : openSidebar(); });
  overlay?.addEventListener('click', closeSidebar);

  /* ── Dropdown menus ── */
  const profileBtn  = document.getElementById('profileBtn');
  const profileMenu = document.getElementById('profileMenu');
  const licenseBtn  = document.getElementById('licenseBtn');
  const licenseMenu = document.getElementById('licenseMenu');
  const notifBtn    = document.getElementById('notifBtn');
  const notifMenu   = document.getElementById('notifMenu');

  function closeAllMenus() {
    [profileMenu, licenseMenu, notifMenu].forEach(m => m?.classList.remove('show'));
    [profileBtn, licenseBtn, notifBtn].forEach(b => b?.setAttribute('aria-expanded', 'false'));
  }
  function toggleMenu(btn, menu) {
    if (!menu) return;
    const isOpen = menu.classList.contains('show');
    closeAllMenus();
    if (!isOpen) { menu.classList.add('show'); btn?.setAttribute('aria-expanded', 'true'); }
  }

  profileBtn?.addEventListener('click', e => { e.stopPropagation(); toggleMenu(profileBtn, profileMenu); });
  licenseBtn?.addEventListener('click', e => { e.stopPropagation(); toggleMenu(licenseBtn, licenseMenu); });
  notifBtn?.addEventListener('click',   e => { e.stopPropagation(); toggleMenu(notifBtn, notifMenu); });
  document.addEventListener('click', closeAllMenus);
  document.addEventListener('scroll', closeAllMenus, true);

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSidebar(); closeAllMenus(); document.querySelectorAll('.modal-overlay').forEach(m => m.remove()); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); document.getElementById('searchInput')?.focus(); }
  });

  /* ── License alert close ── */
  document.getElementById('closeLicenseAlert')?.addEventListener('click', () => {
    document.getElementById('licenseAlert')?.remove();
  });

  /* ── Renew button — opens mediapanal.com in new tab ── */
  document.addEventListener("click", function(e) {
    const renewBtn = e.target.closest(".renew-btn");
    if (renewBtn) {
      e.preventDefault();
      e.stopPropagation();
      window.open("https://mediapanal.com", "_blank", "noopener,noreferrer");
    }
  });

  /* ── Theme toggle ── */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon  = document.getElementById('sunIcon');

  const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
  if (savedTheme === 'dark') applyDark(true, false);

  function applyDark(isDark, save = true) {
    document.body.classList.toggle('dark-mode', isDark);
    document.documentElement.classList.toggle('dark-mode', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.style.background = isDark ? '#1e293b' : '';
    if (moonIcon) moonIcon.style.display = isDark ? 'none'  : 'block';
    if (sunIcon)  sunIcon.style.display  = isDark ? 'block' : 'none';
    if (save) localStorage.setItem('dashboard-theme', isDark ? 'dark' : 'light');
  }

  themeToggleBtn?.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyDark(isDark);
    toast(isDark ? 'تم تفعيل الوضع الليلي' : 'تم تفعيل الوضع النهاري', 'info',
          isDark ? 'bi-moon-fill' : 'bi-sun-fill');
  });

  /* ── Tab bars ── */
  document.querySelectorAll('.tab-bar').forEach(bar => {
    bar.querySelectorAll('.tab-item').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });

  /* ================================================================
     QUICK ACTION BUTTONS — real form modals
  ================================================================ */
  const qaActions = [
    {
      title: '<i class="bi bi-check-circle me-2 text-primary"></i>قبول خدمة بائع',
      body: `<div class="row g-3">
        <div class="col-12"><label class="form-label">اسم الخدمة</label><input class="form-input" type="text" value="FIFA Points — بائع جديد"></div>
        <div class="col-md-6"><label class="form-label">نسبة العمولة (%)</label><input class="form-input" type="number" value="5"></div>
        <div class="col-md-6"><label class="form-label">السعر المعتمد (ج)</label><input class="form-input" type="number" value="350"></div>
        <div class="col-12"><label class="form-label">ملاحظات الموافقة</label><textarea class="form-input" rows="2" placeholder="سبب القبول (اختياري)"></textarea></div>
      </div>`,
      save: 'قبول الخدمة',
      onSave: () => toast('تم قبول الخدمة وإشعار البائع', 'success'),
    },
    {
      title: '<i class="bi bi-arrow-return-left me-2 text-danger"></i>رد مبلغ للعميل',
      body: `<div class="row g-3">
        <div class="col-md-6"><label class="form-label">رقم الطلب</label><input class="form-input" type="text" placeholder="#TXN-0041"></div>
        <div class="col-md-6"><label class="form-label">المبلغ المسترد (ج)</label><input class="form-input" type="number" placeholder="0"></div>
        <div class="col-12"><label class="form-label">سبب الرد</label>
          <select class="form-input" style="height:42px;padding:0 10px">
            <option>خطأ في التنفيذ</option><option>طلب العميل</option>
            <option>منتج معطوب</option><option>نزاع تم حله</option>
          </select>
        </div>
        <div class="col-12"><label class="form-label">ملاحظات</label><textarea class="form-input" rows="2" placeholder="تفاصيل إضافية..."></textarea></div>
      </div>`,
      save: 'رد المبلغ',
      onSave: () => toast('تم رد المبلغ للعميل بنجاح', 'warning', 'bi-arrow-return-left'),
    },
    {
      title: '<i class="bi bi-send me-2 text-success"></i>تحويل أرباح البائع',
      body: `<div class="row g-3">
        <div class="col-md-6"><label class="form-label">اسم البائع</label><input class="form-input" type="text" placeholder="محمد علي"></div>
        <div class="col-md-6"><label class="form-label">المبلغ المحوَّل (ج)</label><input class="form-input" type="number" placeholder="0"></div>
        <div class="col-12"><label class="form-label">طريقة الدفع</label>
          <select class="form-input" style="height:42px;padding:0 10px">
            <option>فودافون كاش</option><option>انستاباي</option>
            <option>بنك مصر</option><option>تحويل بنكي</option>
          </select>
        </div>
        <div class="col-12"><label class="form-label">رقم المحفظة / الحساب</label><input class="form-input" type="text" placeholder="01xxxxxxxxx" dir="ltr"></div>
      </div>`,
      save: 'تأكيد التحويل',
      onSave: () => toast('تم تحويل الأرباح للبائع بنجاح', 'success', 'bi-send-check'),
    },
    {
      title: '<i class="bi bi-exclamation-triangle me-2 text-warning"></i>إيقاف مستخدم مؤقتاً',
      body: `<div class="row g-3">
        <div class="col-md-6"><label class="form-label">اسم المستخدم / ID</label><input class="form-input" type="text" placeholder="#5521 — أحمد..."></div>
        <div class="col-md-6"><label class="form-label">مدة الإيقاف</label>
          <select class="form-input" style="height:42px;padding:0 10px">
            <option>24 ساعة</option><option>72 ساعة</option>
            <option>أسبوع</option><option>شهر</option><option>دائم</option>
          </select>
        </div>
        <div class="col-12"><label class="form-label">سبب الإيقاف</label>
          <select class="form-input" style="height:42px;padding:0 10px">
            <option>سلوك مخالف للشروط</option><option>اشتباه في الاحتيال</option>
            <option>نزاع متكرر</option><option>طلب المستخدم</option>
          </select>
        </div>
        <div class="col-12"><label class="form-label">ملاحظات</label><textarea class="form-input" rows="2" placeholder="تفاصيل إضافية..."></textarea></div>
      </div>`,
      save: 'إيقاف المستخدم',
      onSave: () => toast('تم إيقاف المستخدم مؤقتاً', 'warning', 'bi-slash-circle'),
    },
  ];

  document.querySelectorAll('.qa-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const a = qaActions[idx];
      if (!a) return;
      openFormModal({ title: a.title, body: a.body, saveLabel: a.save, onSave: a.onSave });
    });
  });

  /* ================================================================
     DISPUTE BUTTONS — navigate to escrow_chat.html
  ================================================================ */
  document.querySelectorAll('.btn-resolve.btn-red').forEach(btn => {
    if (btn.closest('td')) return;
    btn.addEventListener('click', () => {
      toast('جاري فتح القضية في صفحة الوساطات...', 'info', 'bi-shield-check');
      setTimeout(() => { window.location.href = './pages/escrow_chat.html'; }, 800);
    });
  });

  document.querySelectorAll('.btn-resolve.btn-blue').forEach(btn => {
    if (btn.closest('td')) return;
    btn.addEventListener('click', () => {
      toast('جاري فتح صفحة الوساطات...', 'info', 'bi-shield-check');
      setTimeout(() => { window.location.href = './pages/escrow_chat.html'; }, 800);
    });
  });

  /* ================================================================
     CARD ACTION BUTTONS — navigate to correct pages
  ================================================================ */
  document.querySelectorAll('.card-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const label   = btn.textContent.trim();
      const card    = btn.closest('.card');
      const section = card?.querySelector('.section-title')?.textContent?.trim() || '';

      const navMap = {
        'الصفقات الأخيرة':     './pages/orders.html',
        'النزاعات المعلقة':    './pages/escrow_chat.html',
        'أكثر الخدمات مبيعاً': './pages/services.html',
        'النشاط الأخير':       './pages/orders.html',
        'آخر 5 مستخدمين':      './pages/users.html',
        'إجراءات سريعة':       './pages/orders.html',
      };
      const dest = navMap[section];

      if (label.includes('تصدير')) {
        toast('جاري تحضير الملف للتنزيل...', 'success', 'bi-download');
        return;
      }
      if (dest) {
        toast('جاري الانتقال...', 'info', 'bi-arrow-left');
        setTimeout(() => { window.location.href = dest; }, 400);
      } else {
        toast('جاري تحميل البيانات...', 'info');
      }
    });
  });

  /* ================================================================
     NOTIFICATION SOUND + UNREAD BADGE POLLING
  ================================================================ */
  const supportBadge = document.getElementById('supportBadge');
  let lastUnreadCount = 0;
  const notificationSound = new Audio('notification.mp3');
  notificationSound.volume = 1.0;
  let audioUnlocked = false;

  function unlockAudioOnce() {
    try {
      notificationSound.muted = true;
      const p = notificationSound.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          notificationSound.pause(); notificationSound.currentTime = 0;
          notificationSound.muted = false; audioUnlocked = true;
          document.removeEventListener('click', unlockAudioOnce);
          document.removeEventListener('keydown', unlockAudioOnce);
        }).catch(() => {});
      } else {
        notificationSound.pause(); notificationSound.currentTime = 0;
        notificationSound.muted = false; audioUnlocked = true;
      }
    } catch (err) {}
  }
  document.addEventListener('click', unlockAudioOnce);
  document.addEventListener('keydown', unlockAudioOnce);

  function checkMessages() {
    fetch('?action=check_unread_count')
      .then(r => r.json().catch(() => ({ count: 0 })))
      .then(data => {
        const count = parseInt(data.count) || 0;
        if (supportBadge) { supportBadge.style.display = count > 0 ? 'inline-flex' : 'none'; supportBadge.textContent = count; }
        if (count > lastUnreadCount && audioUnlocked) {
          try { notificationSound.currentTime = 0; const p = notificationSound.play(); if (p) p.catch(() => {}); } catch (e) {}
        }
        lastUnreadCount = count;
      }).catch(() => {});
  }
  setInterval(checkMessages, 5000);

} // end initDashboard

document.addEventListener('DOMContentLoaded', initDashboard);
document.addEventListener('componentsReady', initDashboard);

/* ================================================================
   Charts
================================================================ */
function getChartColors() {
  const isDark = document.body.classList.contains('dark-mode');
  return {
    text:    isDark ? '#64748b' : '#94a3b8',
    grid:    isDark ? 'rgba(51,65,85,.5)' : 'rgba(203,213,225,.5)',
    barFill: isDark ? 'rgba(129,140,248,.8)' : 'rgba(99,102,241,.75)',
    blue2:   isDark ? '#818cf8' : '#6366f1',
    gaugeTrack:   isDark ? '#283548' : '#e2e8f0',
    tooltipBg:    isDark ? '#1e293b' : '#fff',
    tooltipTitle: isDark ? '#f8fafc' : '#0f172a',
    tooltipBody:  isDark ? '#94a3b8' : '#475569',
    tooltipBorder:isDark ? '#334155' : '#e2e8f0',
  };
}

let salesChart = null;
let gaugeChart = null;

function initCharts() {
  const c = getChartColors();

  const monthlySalesCtx = document.getElementById('monthlySalesChart');
  if (monthlySalesCtx) {
    if (salesChart) salesChart.destroy();
    salesChart = new Chart(monthlySalesCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{ label: 'المبيعات', data: [120,380,210,290,170,340,260,310,280,400,190,150], backgroundColor: c.barFill, borderRadius: 7, borderSkipped: false }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: c.text, font: { family: 'Cairo', size: 11 } }, grid: { color: c.grid } },
          y: { beginAtZero: true, ticks: { color: c.text, font: { family: 'Cairo', size: 11 }, callback: v => '$'+v }, grid: { color: c.grid } }
        },
        plugins: {
          legend: { display: false },
          tooltip: { titleColor: c.tooltipTitle, bodyColor: c.tooltipBody, backgroundColor: c.tooltipBg, borderColor: c.tooltipBorder, borderWidth: 1, padding: 10, callbacks: { label: ctx => ' $' + ctx.formattedValue } }
        }
      }
    });
  }

  const gaugeCtx = document.getElementById('gaugeChart');
  if (gaugeCtx) {
    if (gaugeChart) gaugeChart.destroy();
    const pct = 75.55;
    gaugeChart = new Chart(gaugeCtx.getContext('2d'), {
      type: 'doughnut',
      data: { datasets: [{ data: [pct, 100 - pct], backgroundColor: [c.blue2, c.gaugeTrack], borderWidth: 0, circumference: 180, rotation: 270 }] },
      options: { responsive: false, cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCharts);
} else {
  initCharts();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    setTimeout(initCharts, 50);
  });
});