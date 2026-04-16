/* ================================================================
   Elawaady Dashboard — Main Script
   ================================================================ */

/* ── Toast helper (global) ── */
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

/* ── Modal helper (global) ── */
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
        <button class="btn-${confirmType}" id="modalConfirmBtn" style="padding:10px 22px;font-size:.86rem">
          ${confirmLabel}
        </button>
        <button class="btn-secondary" id="modalCancelBtn" style="padding:10px 22px;font-size:.86rem">إلغاء</button>
      </div>
    </div>`;

  function close() {
    overlay.classList.add('closing');
    setTimeout(() => overlay.remove(), 200);
  }
  overlay.querySelector('#modalCloseBtn').addEventListener('click', close);
  overlay.querySelector('#modalCancelBtn').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  overlay.querySelector('#modalConfirmBtn').addEventListener('click', () => {
    if (onConfirm) onConfirm();
    close();
  });
  document.body.appendChild(overlay);
  overlay.querySelector('#modalConfirmBtn').focus();
}

/* ================================================================ */
document.addEventListener('DOMContentLoaded', function () {

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
    if (e.key === 'Escape') { closeSidebar(); closeAllMenus(); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); document.getElementById('searchInput')?.focus(); }
  });

  /* ── License alert close ── */
  document.getElementById('closeLicenseAlert')?.addEventListener('click', () => {
    document.getElementById('licenseAlert')?.remove();
  });

  /* ── Theme toggle (dark mode) — uses body.dark-mode class ── */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon  = document.getElementById('sunIcon');

  // Load saved preference
  const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
  if (savedTheme === 'dark') applyDark(true, false);

  function applyDark(isDark, save = true) {
    document.body.classList.toggle('dark-mode', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
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

  /* ── Quick action buttons (dashboard) ── */
  const qaActions = {
    0: { title: 'قبول خدمة بائع', body: 'هل تريد مراجعة وقبول الخدمة المعلقة؟<br><br><small style="color:var(--text-3)">سيتم إشعار البائع بالقبول.</small>', label: 'قبول', type: 'primary', msg: 'تم قبول الخدمة بنجاح', mtype: 'success' },
    1: { title: 'رد مبلغ للعميل', body: 'هل أنت متأكد من رد المبلغ للمشتري؟<br><br><small style="color:var(--text-3)">لا يمكن التراجع عن هذا الإجراء.</small>', label: 'رد المبلغ', type: 'danger', msg: 'تم رد المبلغ للعميل', mtype: 'warning' },
    2: { title: 'تحويل أرباح البائع', body: 'هل تريد صرف الأرباح للبائع؟<br><br><small style="color:var(--text-3)">سيتم التحويل الفوري للمحفظة.</small>', label: 'تأكيد الصرف', type: 'primary', msg: 'تم تحويل الأرباح بنجاح', mtype: 'success' },
    3: { title: 'إيقاف مستخدم مؤقتاً', body: 'هل تريد إيقاف هذا المستخدم مؤقتاً؟<br><br><small style="color:var(--text-3)">يمكن التراجع لاحقاً من إدارة العملاء.</small>', label: 'إيقاف', type: 'danger', msg: 'تم إيقاف المستخدم مؤقتاً', mtype: 'warning' },
  };

  document.querySelectorAll('.qa-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const a = qaActions[idx];
      if (!a) return;
      openModal({
        title: a.title, body: a.body, confirmLabel: a.label, confirmType: a.type,
        onConfirm: () => toast(a.msg, a.mtype)
      });
    });
  });

  /* ── Dispute / resolve buttons ── */
  document.querySelectorAll('.btn-resolve.btn-red').forEach(btn => {
    btn.addEventListener('click', e => {
      const label = btn.textContent.trim();
      // Only intercept if the click is direct (not inside a table action cell further wired separately)
      if (!btn.closest('td') && !btn.dataset.wired) {
        btn.dataset.wired = '1';
        btn.addEventListener('click', () => {
          openModal({
            title: 'تأكيد الإجراء', body: `هل تريد تنفيذ: <strong>${label}</strong>؟`,
            confirmLabel: label, confirmType: 'danger',
            onConfirm: () => toast('تم تنفيذ الإجراء', 'danger')
          });
        });
      }
    });
  });

  document.querySelectorAll('.btn-resolve.btn-blue').forEach(btn => {
    if (btn.closest('td')) return; // table buttons handled separately
    btn.addEventListener('click', () => toast('جاري فتح المراجعة...', 'info'));
  });

  /* ── Card action buttons "عرض الكل" ── */
  document.querySelectorAll('.card-action-btn').forEach(btn => {
    btn.addEventListener('click', () => toast('هذه الميزة متاحة في النسخة الكاملة', 'info', 'bi-info-circle'));
  });

  /* ── Notification sound + unread badge polling ── */
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

}); // end DOMContentLoaded

/* ================================================================
   Charts — initialized after DOM is ready to pick up CSS variables
   ================================================================ */
function getChartColors() {
  const isDark = document.body.classList.contains('dark-mode');
  return {
    text:    isDark ? '#64748b' : '#94a3b8',
    grid:    isDark ? 'rgba(51,65,85,.5)' : 'rgba(203,213,225,.5)',
    barFill: isDark ? 'rgba(129,140,248,.8)' : 'rgba(99,102,241,.75)',
    blue2:   isDark ? '#818cf8' : '#6366f1',
    gaugeTrack: isDark ? '#283548' : '#e2e8f0',
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
        datasets: [{
          label: 'المبيعات',
          data: [120, 380, 210, 290, 170, 340, 260, 310, 280, 400, 190, 150],
          backgroundColor: c.barFill,
          borderRadius: 7,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: c.text, font: { family: 'Cairo', size: 11 } }, grid: { color: c.grid } },
          y: { beginAtZero: true, ticks: { color: c.text, font: { family: 'Cairo', size: 11 }, callback: v => '$'+v }, grid: { color: c.grid } }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            titleColor: c.tooltipTitle, bodyColor: c.tooltipBody,
            backgroundColor: c.tooltipBg,
            borderColor: c.tooltipBorder, borderWidth: 1, padding: 10,
            callbacks: { label: ctx => ' $' + ctx.formattedValue }
          }
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
      data: {
        datasets: [{
          data: [pct, 100 - pct],
          backgroundColor: [c.blue2, c.gaugeTrack],
          borderWidth: 0,
          circumference: 180,
          rotation: 270
        }]
      },
      options: {
        responsive: false,
        cutout: '70%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      }
    });
  }
}

/* Init charts after page load */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCharts);
} else {
  initCharts();
}

/* Re-init charts on theme toggle to update colors */
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      /* Wait for class toggle to apply, then refresh charts */
      setTimeout(initCharts, 50);
    });
  }
});