/* ============================================================
   وسيط برو — app.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Page routing ─────────────────────────────────────── */
  const pages = {
    dashboard:    { title: 'لوحة التحكم 📊',          sub: 'مرحباً أحمد، إليك ملخص اليوم 👋' },
    live:         { title: 'النشاط المباشر ⚡',         sub: 'الصفقات الجارية الآن في الوقت الفعلي' },
    deals:        { title: 'الصفقات 💰',               sub: 'كل المعاملات والصفقات على المنصة' },
    disputes:     { title: 'النزاعات ⚖️',              sub: 'الحالات التي تحتاج لقرار من الأدمن' },
    vault:        { title: 'الخزنة الآمنة 🔒',          sub: 'الأموال المجمّدة تحت إشراف الوساطة' },
    payments:     { title: 'المدفوعات 💳',              sub: 'وسائل الدفع وسجل التحويلات' },
    buyers:       { title: 'المشترون 🛒',              sub: 'قائمة العملاء المسجلين' },
    sellers:      { title: 'البائعون 🏪',              sub: 'الموردون وطلبات الانضمام المعلقة' },
    services:     { title: 'الخدمات 📦',               sub: 'كل الخدمات المتاحة على المنصة' },
    settings:     { title: 'الإعدادات العامة ⚙️',       sub: 'ضبط إعدادات المنصة والوساطة' },
    reports:      { title: 'تقارير وإحصائيات 📋',      sub: 'أداء المنصة والتحليلات' },
  };

  function navigateTo(pageKey) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));

    // Show target
    const target = document.getElementById('page-' + pageKey);
    if (target) target.classList.add('active');

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.nav-item[data-page="' + pageKey + '"]')
      .forEach(n => n.classList.add('active'));

    // Update topbar
    const info = pages[pageKey];
    if (info) {
      const t = document.getElementById('topbar-title');
      const s = document.getElementById('topbar-sub');
      if (t) t.textContent = info.title;
      if (s) s.textContent = info.sub;
    }

    // Animate stat cards on dashboard
    if (pageKey === 'dashboard') animateStats();
  }

  // Bind nav clicks
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', function () {
      navigateTo(this.dataset.page);
    });
  });

  /* ── Tab switching ────────────────────────────────────── */
  document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', function () {
      const group = this.closest('.tab-bar').dataset.group;
      document.querySelectorAll(`.tab-bar[data-group="${group}"] .tab-item`)
        .forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ── Stat cards animation ─────────────────────────────── */
  function animateStats() {
    document.querySelectorAll('#page-dashboard .stat-card').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      setTimeout(() => {
        el.style.transition = 'opacity .35s ease, transform .35s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 70);
    });
  }

  /* ── Dispute resolve buttons ──────────────────────────── */
  document.querySelectorAll('.btn-resolve').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const item = this.closest('.dispute-item');
      const title = item ? item.querySelector('.dispute-title')?.textContent : 'النزاع';
      // Simple demo: just navigate to disputes page
      navigateTo('disputes');
    });
  });

  /* ── Quick action buttons ─────────────────────────────── */
  document.querySelectorAll('.qa-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', function () {
      navigateTo(this.dataset.page);
    });
  });

  /* ── Topbar notification / buttons ───────────────────── */
  const notifBtn = document.getElementById('notif-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      const dot = notifBtn.querySelector('.notif-dot');
      if (dot) dot.style.display = 'none';
    });
  }

  /* ── Live clock in topbar ─────────────────────────────── */
  function updateClock() {
    const el = document.getElementById('live-clock');
    if (!el) return;
    const now = new Date();
    const days = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    el.textContent =
      `${days[now.getDay()]}، ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} — مرحباً أحمد 👋`;
  }
  updateClock();
  setInterval(updateClock, 60000);

  /* ── Live deals counter on live page ─────────────────── */
  function pulseLive() {
    const badge = document.getElementById('live-count');
    if (badge) {
      let n = parseInt(badge.textContent) || 3;
      // slight random +/- for demo
      if (Math.random() > .7) n = Math.max(1, n + (Math.random() > .5 ? 1 : -1));
      badge.textContent = n;
    }
  }
  setInterval(pulseLive, 8000);

  /* ── Vault countdown timers ───────────────────────────── */
  function updateVaultTimers() {
    document.querySelectorAll('[data-countdown]').forEach(el => {
      let secs = parseInt(el.dataset.countdown) - 60;
      if (secs < 0) secs = 0;
      el.dataset.countdown = secs;
      const h = Math.floor(secs / 3600);
      const m = Math.floor((secs % 3600) / 60);
      el.textContent = `${h}س ${m}د متبقية`;
    });
  }
  setInterval(updateVaultTimers, 60000);

  /* ── Sellers: approve/reject ──────────────────────────── */
  document.querySelectorAll('.btn-approve').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = this.closest('.seller-pending-card');
      if (card) {
        card.style.transition = 'all .3s';
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        setTimeout(() => card.remove(), 300);
      }
      // update badge
      const badge = document.querySelector('.nav-item[data-page="sellers"] .nav-badge');
      if (badge) {
        let n = parseInt(badge.textContent) - 1;
        if (n <= 0) badge.style.display = 'none';
        else badge.textContent = n;
      }
    });
  });

  document.querySelectorAll('.btn-reject').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = this.closest('.seller-pending-card');
      if (card) {
        card.style.transition = 'all .3s';
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';
        setTimeout(() => card.remove(), 300);
      }
    });
  });

  /* ── Settings: toggle switches ───────────────────────── */
  document.querySelectorAll('.setting-toggle').forEach(toggle => {
    toggle.addEventListener('change', function () {
      const label = this.closest('.d-flex')?.querySelector('.toggle-label');
      if (label) {
        label.textContent = this.checked ? 'مفعّل' : 'معطّل';
        label.style.color = this.checked ? 'var(--success)' : '#94a3b8';
      }
    });
  });

  /* ── Boot: go to dashboard ────────────────────────────── */
  navigateTo('dashboard');
  setTimeout(animateStats, 100);
});