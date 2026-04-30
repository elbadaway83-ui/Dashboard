/* ================================================================
   Elawaady Dashboard — Shared Components
   Injects Sidebar & Header into every page dynamically.
   ================================================================ */

(function () {
  /* ── Path detection ── */
  const path = window.location.pathname;
  const isRoot = !path.includes('/pages/');

  const root = isRoot ? './' : '../';
  const pages = isRoot ? './pages/' : './';

  const currentFile = path.split('/').pop() || 'index.html';

  /* ================================================================
     SIDEBAR HTML
     ================================================================ */
  const sidebarHTML = `
<aside id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon"><i class="bi bi-controller"></i></div>
    <span class="brand-name">El<span>awaady</span></span>
  </div>

  <div class="sidebar-scroll">
    <div class="nav-group">
      <span class="nav-label">الرئيسية</span>
      <a href="${root}index.html" class="nav-item" id="nav-dashboard"><i class="bi bi-speedometer2"></i>لوحة التحكم</a>
      <a href="${pages}admins.html" class="nav-item" id="nav-admins"><i class="bi bi-person-badge"></i>الموظفين</a>
      <a href="${pages}users.html" class="nav-item" id="nav-users"><i class="bi bi-people"></i>العملاء</a>
      <a href="${pages}vendors.html" class="nav-item" id="nav-vendors"><i class="bi bi-shop"></i>التجار</a>
    </div>

    <div class="nav-group">
      <span class="nav-label">التسويق والمبيعات</span>
      <a href="${pages}scraping.html" class="nav-item" id="nav-scraping"><i class="bi bi-megaphone"></i>التسويق</a>
      <a href="${pages}orders.html" class="nav-item" id="nav-orders"><i class="bi bi-bag-check"></i>الطلبات</a>
      <a href="${pages}services.html" class="nav-item" id="nav-services"><i class="bi bi-grid-3x3-gap"></i>خدمات الكروت</a>
      <a href="${pages}providers.html" class="nav-item" id="nav-providers"><i class="bi bi-plug"></i>بروفيدر الخدمات</a>
      <a href="${pages}smm_compare.html" class="nav-item" id="nav-smm-compare"><i class="bi bi-bar-chart-line"></i>مقارنة الخدمات</a>
      <a href="${pages}smm_services.html" class="nav-item" id="nav-smm-services"><i class="bi bi-graph-up-arrow"></i>خدمات السوشيال ميديا</a>
    </div>

    <div class="nav-group">
      <span class="nav-label">الدعم والتواصل</span>
      <a href="${pages}chat.html" class="nav-item" id="supportLink"><i class="bi bi-headset"></i>الدعم الفني<span id="supportBadge" class="nav-badge" style="display:none">0</span></a>
      <a href="${pages}escrow_chat.html" class="nav-item" id="mediationLink"><i class="bi bi-shield-check"></i>الوساطات</a>
    </div>

    <div class="nav-group">
      <span class="nav-label">إدارة الموقع</span>
      <a href="${pages}home_sections.html" class="nav-item" id="nav-home-sections"><i class="bi bi-layout-text-sidebar-reverse"></i>إدارة الموقع</a>
      <a href="${pages}side_menu.html" class="nav-item" id="nav-side-menu"><i class="bi bi-list-ul"></i>القائمة الجانبية</a>
      <a href="${pages}social_links.html" class="nav-item" id="nav-social-links"><i class="bi bi-link-45deg"></i>صفحاتنا وجروباتنا</a>
      <a href="${pages}testimonials.html" class="nav-item" id="nav-testimonials"><i class="bi bi-star-half"></i>آراء العملاء</a>
      <a href="${pages}settings.html" class="nav-item" id="nav-settings"><i class="bi bi-gear"></i>الإعدادات</a>
    </div>
  </div>

  <div class="sidebar-footer">
    <a href="${root}logout.html" class="logout-btn">
      <i class="bi bi-box-arrow-left"></i>تسجيل الخروج
    </a>
  </div>
</aside>`;

  /* ================================================================
     HEADER / TOPBAR HTML
     ================================================================ */
  const headerHTML = `
<header class="topbar">
  <div class="topbar-start">
    <button id="toggleSidebarBtn" class="menu-toggle" aria-label="القائمة"><i class="bi bi-list"></i></button>
    <div class="search-wrapper" id="searchWrapper">
      <i class="bi bi-search search-icon"></i>
      <input type="text" class="search-input" id="searchInput" placeholder="بحث أو اكتب أمر..." autocomplete="off">
      <span class="search-kbd"><i class="bi bi-command"></i>K</span>
      <div class="search-dropdown" id="searchDropdown">
        <div class="search-section-label">الصفحات</div>
        <a href="${root}index.html" class="search-result-item"><i class="bi bi-speedometer2"></i>لوحة التحكم</a>
        <a href="${pages}users.html" class="search-result-item"><i class="bi bi-people"></i>العملاء</a>
        <a href="${pages}orders.html" class="search-result-item"><i class="bi bi-bag-check"></i>الطلبات</a>
        <a href="${pages}chat.html" class="search-result-item"><i class="bi bi-headset"></i>الدعم الفني</a>
        <a href="${pages}settings.html" class="search-result-item"><i class="bi bi-gear"></i>الإعدادات</a>
      </div>
    </div>
  </div>

  <div class="topbar-end">
    <button class="icon-action-btn" id="themeToggleBtn" title="تبديل الوضع"><i class="bi bi-moon" id="moonIcon"></i><i class="bi bi-sun" id="sunIcon" style="display:none"></i></button>

    <div class="dropdown-wrapper">
      <button class="icon-action-btn pos-rel" id="notifBtn" title="الإشعارات"><i class="bi bi-bell"></i><span class="notif-dot"></span></button>
      <div class="dropdown-menu notif-menu" id="notifMenu">
        <div class="dropdown-header">الإشعارات</div>
        <div class="notif-item unread"><div class="notif-avatar av-blue">ن</div><div class="notif-body"><div class="notif-text"><strong>نورا حسن</strong> شحنت محفظتها بـ ٨٠٠ج</div><div class="notif-time"><i class="bi bi-clock"></i> منذ ٥ دقائق</div></div></div>
        <div class="notif-item unread"><div class="notif-avatar av-green">ع</div><div class="notif-body"><div class="notif-text"><strong>عمر خالد</strong> أكمل صفقة PUBG بنجاح</div><div class="notif-time"><i class="bi bi-clock"></i> منذ ٢٠ دقيقة</div></div></div>
        <div class="notif-item"><div class="notif-avatar av-red">س</div><div class="notif-body"><div class="notif-text"><strong>سارة محمود</strong> فتحت نزاعاً جديداً</div><div class="notif-time"><i class="bi bi-clock"></i> منذ ٢ ساعة</div></div></div>
        <div class="dropdown-footer"><a href="#" class="see-all-notif">عرض كل الإشعارات</a></div>
      </div>
    </div>

    <div class="dropdown-wrapper">
      <button id="licenseBtn" class="topbar-btn" aria-haspopup="true" aria-expanded="false"><i class="bi bi-key"></i><span class="license-days">215 يوم</span></button>
      <div id="licenseMenu" class="dropdown-menu">
        <div class="dropdown-header">معلومات الترخيص</div>
        <div class="dropdown-row"><span class="dr-label">الحالة</span><span class="status-pill active"><i class="bi bi-circle-fill" style="font-size:.5rem"></i>مفتوح</span></div>
        <div class="dropdown-row"><span class="dr-label">تاريخ الانتهاء</span><span class="dr-value">2026-11-16</span></div>
        <div class="dropdown-row"><span class="dr-label">المتبقي</span><span class="dr-value">215 يوم &bull; 7 ساعة</span></div>
        <div class="dropdown-footer"><a href="https://mediapanal.com" target="_blank" rel="noopener" class="renew-btn">تجديد الاشتراك</a></div>
      </div>
    </div>

    <div class="dropdown-wrapper">
      <button id="profileBtn" class="topbar-profile" aria-haspopup="true" aria-expanded="false">
        <div class="avatar">E</div>
        <span class="profile-name">elawaady</span>
        <i class="bi bi-chevron-down chevron"></i>
      </button>
      <div id="profileMenu" class="dropdown-menu dropdown-menu-wide">
        <div class="dropdown-header-profile"><div class="avatar">E</div><div><div class="profile-menu-name">elawaady</div><div class="profile-menu-role">مدير النظام</div></div></div>
        <a href="${pages}profile.html" class="dropdown-item-link"><i class="bi bi-person"></i>الملف الشخصي</a>
        <a href="${pages}settings.html" class="dropdown-item-link"><i class="bi bi-gear"></i>الإعدادات</a>
        <div class="dropdown-divider"></div>
        <a href="${root}logout.html" class="dropdown-item-link logout-link"><i class="bi bi-box-arrow-left"></i>تسجيل الخروج</a>
      </div>
    </div>
  </div>
</header>`;

  /* ================================================================
     INJECT INTO PAGE
     ================================================================ */
  const sidebarContainer = document.getElementById('sidebar-container');
  const headerContainer = document.getElementById('header-container');

  if (sidebarContainer) sidebarContainer.outerHTML = sidebarHTML;
  if (headerContainer) headerContainer.outerHTML = headerHTML;

  /* ================================================================
     AUTO-MARK ACTIVE NAV LINK
     ================================================================ */
  const navMap = {
    'index.html': 'nav-dashboard',
    '': 'nav-dashboard',
    'admins.html': 'nav-admins',
    'users.html': 'nav-users',
    'vendors.html': 'nav-vendors',
    'scraping.html': 'nav-scraping',
    'orders.html': 'nav-orders',
    'services.html': 'nav-services',
    'providers.html': 'nav-providers',
    'smm_compare.html': 'nav-smm-compare',
    'smm_services.html': 'nav-smm-services',
    'chat.html': 'supportLink',
    'escrow_chat.html': 'mediationLink',
    'home_sections.html': 'nav-home-sections',
    'side_menu.html': 'nav-side-menu',
    'social_links.html': 'nav-social-links',
    'testimonials.html': 'nav-testimonials',
    'settings.html': 'nav-settings',
    'profile.html': 'nav-settings',
  };

  const activeId = navMap[currentFile];
  if (activeId) {
    const activeLink = document.getElementById(activeId);
    if (activeLink) activeLink.classList.add('active');
  }
})();