document.addEventListener('DOMContentLoaded', function () {

  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('overlay');
  const toggleBtn = document.getElementById('toggleSidebarBtn');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  overlay?.addEventListener('click', closeSidebar);

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
    const isOpen = menu.classList.contains('show');
    closeAllMenus();
    if (!isOpen) {
      menu.classList.add('show');
      btn.setAttribute('aria-expanded', 'true');
    }
  }

  profileBtn?.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(profileBtn, profileMenu); });
  licenseBtn?.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(licenseBtn, licenseMenu); });
  notifBtn?.addEventListener('click',   (e) => { e.stopPropagation(); toggleMenu(notifBtn, notifMenu); });

  document.addEventListener('click', closeAllMenus);
  document.addEventListener('scroll', closeAllMenus, true);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSidebar(); closeAllMenus(); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('searchInput')?.focus();
    }
  });

  document.getElementById('closeLicenseAlert')?.addEventListener('click', function () {
    document.getElementById('licenseAlert')?.remove();
  });

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon  = document.getElementById('sunIcon');
  let darkMode = false;

  themeToggleBtn?.addEventListener('click', () => {
    darkMode = !darkMode;
    if (darkMode) {
      document.body.style.filter = 'invert(1) hue-rotate(180deg)';
      moonIcon.style.display = 'none';
      sunIcon.style.display  = 'block';
    } else {
      document.body.style.filter = '';
      moonIcon.style.display = 'block';
      sunIcon.style.display  = 'none';
    }
  });

  document.querySelectorAll('.tab-bar').forEach(bar => {
    bar.querySelectorAll('.tab-item').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });

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
          notificationSound.pause();
          notificationSound.currentTime = 0;
          notificationSound.muted = false;
          audioUnlocked = true;
          document.removeEventListener('click', unlockAudioOnce);
          document.removeEventListener('keydown', unlockAudioOnce);
        }).catch(() => {});
      } else {
        notificationSound.pause();
        notificationSound.currentTime = 0;
        notificationSound.muted = false;
        audioUnlocked = true;
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
        if (supportBadge) {
          supportBadge.style.display = count > 0 ? 'inline-flex' : 'none';
          supportBadge.textContent = count;
        }
        if (count > lastUnreadCount && audioUnlocked) {
          try {
            notificationSound.currentTime = 0;
            const p = notificationSound.play();
            if (p) p.catch(() => {});
          } catch (e) {}
        }
        lastUnreadCount = count;
      })
      .catch(() => {});
  }

  setInterval(checkMessages, 5000);

});

const C_TEXT   = '#64748b';
const C_GRID   = 'rgba(203,213,225,.5)';
const C_BLUE   = '#3b82f6';
const C_BLUE2  = '#6366f1';
const C_GREEN  = '#10b981';
const C_YELLOW = '#f59e0b';
const C_RED    = '#f43f5e';
const C_PURPLE = '#8b5cf6';

const monthlySalesCtx = document.getElementById('monthlySalesChart');
if (monthlySalesCtx) {
  new Chart(monthlySalesCtx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [{
        label: 'المبيعات',
        data: [120, 380, 210, 290, 170, 340, 260, 310, 280, 400, 190, 150],
        backgroundColor: 'rgba(99,102,241,.75)',
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { color: C_TEXT, font: { family: 'Cairo', size: 11 } }, grid: { color: C_GRID } },
        y: { beginAtZero: true, ticks: { color: C_TEXT, font: { family: 'Cairo', size: 11 }, callback: v => '$'+v }, grid: { color: C_GRID } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          titleColor: '#0f172a', bodyColor: '#475569', backgroundColor: '#fff',
          borderColor: '#e2e8f0', borderWidth: 1, padding: 10,
          callbacks: { label: ctx => ' $' + ctx.formattedValue }
        }
      }
    }
  });
}

const gaugeCtx = document.getElementById('gaugeChart');
if (gaugeCtx) {
  const pct = 75.55;
  new Chart(gaugeCtx.getContext('2d'), {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [pct, 100 - pct],
        backgroundColor: [C_BLUE2, '#e2e8f0'],
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