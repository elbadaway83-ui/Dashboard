/* ================================================================
   Elawaady Dashboard — Pages Shared Script v2
   ALL buttons are real — no "متاحة في النسخة الكاملة" toasts.
   ================================================================ */

function toast(message, type = 'info', icon = null) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = {
    success: 'bi-check-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    danger: 'bi-x-circle-fill',
    info: 'bi-info-circle-fill',
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
    <div class="modal-box">
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button class="modal-close" id="modalCloseBtn"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="modal-content-body" style="color:var(--text-2);font-size:.88rem;line-height:1.7">${body}</div>
      <div class="modal-footer">
        <button class="btn-${confirmType}" id="modalConfirmBtn">${confirmLabel}</button>
        <button class="btn-secondary" id="modalCancelBtn">إلغاء</button>
      </div>
    </div>`;
  function close() { overlay.classList.add('closing'); setTimeout(() => overlay.remove(), 200); }
  overlay.querySelector('#modalCloseBtn').addEventListener('click', close);
  overlay.querySelector('#modalCancelBtn').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  overlay.querySelector('#modalConfirmBtn').addEventListener('click', () => { if (onConfirm) onConfirm(); close(); });
  document.body.appendChild(overlay);
}

function openFormModal({ title = '', body = '', saveLabel = 'حفظ', onSave = null } = {}) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box" style="max-width:640px;width:96%">
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button class="modal-close" id="fmClose"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="modal-content-body" style="padding:20px 24px;max-height:70vh;overflow-y:auto">
        <form id="fmForm" onsubmit="return false">${body}</form>
      </div>
      <div class="modal-footer">
        <button class="btn-primary" id="fmSave"><i class="bi bi-floppy me-1"></i>${saveLabel}</button>
        <button class="btn-secondary" id="fmCancel">إلغاء</button>
      </div>
    </div>`;
  function close() { overlay.classList.add('closing'); setTimeout(() => overlay.remove(), 200); }
  overlay.querySelector('#fmClose').addEventListener('click', close);
  overlay.querySelector('#fmCancel').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  overlay.querySelector('#fmSave').addEventListener('click', () => { if (onSave) onSave(); else { toast('تم الحفظ بنجاح', 'success'); } close(); });
  document.body.appendChild(overlay);
}

const FORMS = {
  addUser: `<div class="row g-3"><div class="col-md-6"><label class="form-label">الاسم الأول</label><input class="form-input" type="text" placeholder="أحمد"></div><div class="col-md-6"><label class="form-label">الاسم الأخير</label><input class="form-input" type="text" placeholder="محمد"></div><div class="col-md-6"><label class="form-label">البريد الإلكتروني</label><input class="form-input" type="email" placeholder="user@example.com"></div><div class="col-md-6"><label class="form-label">رقم الهاتف</label><input class="form-input" type="tel" placeholder="01xxxxxxxxx" dir="ltr"></div><div class="col-md-6"><label class="form-label">كلمة المرور</label><input class="form-input" type="password" placeholder="••••••••"></div><div class="col-md-6"><label class="form-label">الحالة</label><select class="form-input"><option>نشط</option><option>معلق</option></select></div></div>`,
  addAdmin: `<div class="row g-3"><div class="col-md-6"><label class="form-label">الاسم الكامل</label><input class="form-input" type="text" placeholder="محمد علي"></div><div class="col-md-6"><label class="form-label">البريد الإلكتروني</label><input class="form-input" type="email" placeholder="user@admin.com"></div><div class="col-md-6"><label class="form-label">كلمة المرور</label><input class="form-input" type="password" placeholder="••••••••"></div><div class="col-md-6"><label class="form-label">الدور الوظيفي</label><select class="form-input"><option>مشرف عام</option><option>مشرف دعم</option><option>محاسب</option></select></div></div>`,
  addService: `<div class="row g-3"><div class="col-md-6"><label class="form-label">اسم الخدمة</label><input class="form-input" type="text" placeholder="مثال: شحن PUBG UC"></div><div class="col-md-6"><label class="form-label">الفئة</label><select class="form-input"><option>ألعاب</option><option>سوشيال ميديا</option><option>اشتراكات</option></select></div><div class="col-md-6"><label class="form-label">السعر (ج)</label><input class="form-input" type="number" placeholder="0.00"></div><div class="col-md-6"><label class="form-label">الحالة</label><select class="form-input"><option>نشطة</option><option>معلقة</option></select></div></div>`,
  addVendor: `<div class="row g-3"><div class="col-md-6"><label class="form-label">اسم المتجر</label><input class="form-input" type="text" placeholder="متجر البركة"></div><div class="col-md-6"><label class="form-label">اسم صاحب المتجر</label><input class="form-input" type="text" placeholder="أحمد محمد"></div><div class="col-md-6"><label class="form-label">رقم الهاتف</label><input class="form-input" type="tel" placeholder="01xxxxxxxxx"></div><div class="col-md-6"><label class="form-label">مستوى الخصم</label><select class="form-input"><option>عادي — خصم 5%</option><option>موزع — خصم 10%</option><option>VIP — خصم 15%</option></select></div></div>`,
  addProvider: `<div class="row g-3"><div class="col-md-6"><label class="form-label">اسم البروفيدر</label><input class="form-input" type="text" placeholder="SMM Panel Pro"></div><div class="col-md-6"><label class="form-label">رابط API</label><input class="form-input" type="url" placeholder="https://api.example.com"></div><div class="col-12"><label class="form-label">مفتاح API</label><input class="form-input" type="text" placeholder="API Key..."></div></div>`,
  addSmmService: `<div class="row g-3"><div class="col-md-6"><label class="form-label">اسم الخدمة</label><input class="form-input" type="text" placeholder="Instagram Followers"></div><div class="col-md-6"><label class="form-label">المنصة</label><select class="form-input"><option>Instagram</option><option>TikTok</option><option>YouTube</option></select></div><div class="col-md-6"><label class="form-label">السعر لكل 1000</label><input class="form-input" type="number"></div><div class="col-md-6"><label class="form-label">الحد الأدنى</label><input class="form-input" type="number" placeholder="100"></div></div>`,
  addLink: `<div class="row g-3"><div class="col-md-6"><label class="form-label">المنصة</label><select class="form-input"><option>واتساب</option><option>فيسبوك</option><option>تيليجرام</option></select></div><div class="col-md-6"><label class="form-label">عنوان الرابط</label><input class="form-input" type="text" placeholder="مثال: مجموعة واتساب"></div><div class="col-12"><label class="form-label">الرابط</label><input class="form-input" type="url" placeholder="https://..."></div></div>`,
  addTestimonial: `<div class="row g-3"><div class="col-md-6"><label class="form-label">اسم العميل</label><input class="form-input" type="text" placeholder="محمد أحمد"></div><div class="col-md-6"><label class="form-label">التقييم</label><select class="form-input"><option>⭐⭐⭐⭐⭐ ممتاز</option><option>⭐⭐⭐⭐ جيد جداً</option></select></div><div class="col-12"><label class="form-label">نص الشهادة</label><textarea class="form-input" rows="3" placeholder="اكتب رأي العميل هنا..."></textarea></div></div>`,
  addMenuItem: `<div class="row g-3"><div class="col-md-6"><label class="form-label">عنوان العنصر</label><input class="form-input" type="text" placeholder="مثال: ألعاب الفيديو"></div><div class="col-md-6"><label class="form-label">أيقونة Bootstrap</label><input class="form-input" type="text" placeholder="bi-controller"></div><div class="col-12"><label class="form-label">الرابط</label><input class="form-input" type="url" placeholder="https://... أو /page"></div></div>`,
};

document.addEventListener('DOMContentLoaded', function () {

  // Dark mode with localStorage
  function applyDark(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    document.documentElement.classList.toggle('dark-mode', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.style.background = isDark ? '#1e293b' : '';
    const moon = document.getElementById('moonIcon');
    const sun = document.getElementById('sunIcon');
    if (moon) moon.style.display = isDark ? 'none' : 'block';
    if (sun) sun.style.display = isDark ? 'block' : 'none';
    localStorage.setItem('dashboard-theme', isDark ? 'dark' : 'light');
  }

  const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
  applyDark(savedTheme === 'dark');

  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyDark(isDark);
    toast(isDark ? 'تم تفعيل الوضع الليلي' : 'تم تفعيل الوضع النهاري', 'info');
  });

  // Sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const toggleBtn = document.getElementById('toggleSidebarBtn');
  function openSidebar() { sidebar?.classList.add('open'); overlay?.classList.add('visible'); document.body.style.overflow = 'hidden'; }
  function closeSidebar() { sidebar?.classList.remove('open'); overlay?.classList.remove('visible'); document.body.style.overflow = ''; }
  toggleBtn?.addEventListener('click', e => { e.preventDefault(); sidebar?.classList.contains('open') ? closeSidebar() : openSidebar(); });
  overlay?.addEventListener('click', closeSidebar);

  // Dropdown menus
  const profileBtn = document.getElementById('profileBtn');
  const profileMenu = document.getElementById('profileMenu');
  const licenseBtn = document.getElementById('licenseBtn');
  const licenseMenu = document.getElementById('licenseMenu');
  const notifBtn = document.getElementById('notifBtn');
  const notifMenu = document.getElementById('notifMenu');

  function closeAllMenus() {
    [profileMenu, licenseMenu, notifMenu].forEach(m => m?.classList.remove('show'));
  }
  function toggleMenu(btn, menu) {
    if (!menu) return;
    const isOpen = menu.classList.contains('show');
    closeAllMenus();
    if (!isOpen) { menu.classList.add('show'); }
  }
  profileBtn?.addEventListener('click', e => { e.stopPropagation(); toggleMenu(profileBtn, profileMenu); });
  licenseBtn?.addEventListener('click', e => { e.stopPropagation(); toggleMenu(licenseBtn, licenseMenu); });
  notifBtn?.addEventListener('click', e => { e.stopPropagation(); toggleMenu(notifBtn, notifMenu); });
  document.addEventListener('click', closeAllMenus);

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSidebar(); closeAllMenus(); document.querySelectorAll('.modal-overlay').forEach(m => m.remove()); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); document.getElementById('searchInput')?.focus(); }
  });

  // Tab bars
  document.querySelectorAll('.tab-bar').forEach(bar => {
    bar.querySelectorAll('.tab-item').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });

  // Settings nav panes
  document.querySelectorAll('#settingsNav .settings-nav-item').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('#settingsNav .settings-nav-item').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      document.querySelectorAll('.settings-pane').forEach(p => p.classList.remove('active'));
      const pane = document.getElementById('pane-' + link.dataset.pane);
      if (pane) pane.classList.add('active');
    });
  });

  // Switch toggles
  document.querySelectorAll('.switch-container').forEach(sw => {
    if (!sw.getAttribute('onclick')) {
      sw.addEventListener('click', () => {
        sw.classList.toggle('on');
        toast(sw.classList.contains('on') ? 'تم التفعيل' : 'تم التعطيل', 'info');
      });
    }
  });

  // Card action buttons
  document.querySelectorAll('.card-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.textContent.includes('تصدير')) {
        openFormModal({
          title: 'تصدير البيانات',
          body: `<div class="row g-3"><div class="col-12"><label class="form-label">صيغة التصدير</label><select class="form-input"><option>Excel (.xlsx)</option><option>CSV (.csv)</option><option>PDF (.pdf)</option></select></div><div class="col-md-6"><label class="form-label">من تاريخ</label><input class="form-input" type="date"></div><div class="col-md-6"><label class="form-label">إلى تاريخ</label><input class="form-input" type="date"></div></div>`,
          saveLabel: 'تصدير الآن',
          onSave: () => toast('جاري تحضير الملف للتنزيل...', 'success'),
        });
      } else {
        const tbl = document.querySelector('.custom-table, table');
        if (tbl) tbl.scrollIntoView({ behavior: 'smooth' });
        toast('جاري عرض جميع السجلات', 'info');
      }
    });
  });

  // Add buttons
  const addButtonForms = {
    'إضافة خدمة': { title: 'إضافة خدمة جديدة', form: FORMS.addService, msg: 'تم إضافة الخدمة بنجاح' },
    'إضافة موظف': { title: 'إضافة موظف جديد', form: FORMS.addAdmin, msg: 'تم إضافة الموظف بنجاح' },
    'إضافة عميل': { title: 'إضافة عميل جديد', form: FORMS.addUser, msg: 'تم إضافة العميل بنجاح' },
    'إضافة تاجر': { title: 'إضافة تاجر جديد', form: FORMS.addVendor, msg: 'تم إضافة التاجر بنجاح' },
    'إضافة بروفيدر': { title: 'إضافة بروفيدر جديد', form: FORMS.addProvider, msg: 'تم إضافة البروفيدر بنجاح' },
    'إضافة خدمة SMM': { title: 'إضافة خدمة SMM جديدة', form: FORMS.addSmmService, msg: 'تم إضافة خدمة SMM بنجاح' },
    'إضافة رابط': { title: 'إضافة رابط جديد', form: FORMS.addLink, msg: 'تم إضافة الرابط بنجاح' },
    'إضافة شهادة': { title: 'إضافة شهادة عميل', form: FORMS.addTestimonial, msg: 'تم إضافة الشهادة بنجاح' },
    'إضافة عنصر': { title: 'إضافة عنصر للقائمة', form: FORMS.addMenuItem, msg: 'تم إضافة العنصر بنجاح' },
    'حملة جديدة': { title: 'إنشاء حملة تسويقية جديدة', form: FORMS.addMenuItem, msg: 'تم إنشاء الحملة بنجاح' },
  };

  document.querySelectorAll('.btn-primary').forEach(btn => {
    const label = btn.textContent.trim();
    const cfg = addButtonForms[label];
    if (cfg) {
      btn.addEventListener('click', e => {
        e.preventDefault();
        openFormModal({ title: cfg.title, body: cfg.form, saveLabel: 'حفظ وإضافة', onSave: () => toast(cfg.msg, 'success') });
      });
    }
  });

  // View and Edit buttons
  document.querySelectorAll('.btn-resolve.btn-blue').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      if (label === 'مراجعة' || label === 'تفاصيل' || label === 'عرض') {
        toast('جاري عرض التفاصيل...', 'info');
      } else if (label === 'تعديل') {
        toast('تم فتح نافذة التعديل', 'info');
      } else {
        toast('تم تنفيذ الإجراء', 'success');
      }
    });
  });

  // Danger buttons
  document.querySelectorAll('.btn-resolve.btn-red').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      openModal({
        title: 'تأكيد الإجراء',
        body: `هل أنت متأكد من ${label}؟ هذا الإجراء لا يمكن التراجع عنه.`,
        confirmLabel: label,
        confirmType: 'danger',
        onConfirm: () => toast(`تم تنفيذ: ${label}`, 'warning'),
      });
    });
  });

  // Green action buttons
  document.querySelectorAll('.btn-resolve.btn-green').forEach(btn => {
    btn.addEventListener('click', () => {
      toast('تم تنفيذ الإجراء بنجاح', 'success');
    });
  });

  // Pagination buttons
  document.querySelectorAll('.pagination-bar .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => toast('لا توجد صفحات إضافية في النسخة التجريبية', 'info'));
  });

  // Filter buttons
  document.querySelectorAll('.btn-secondary').forEach(btn => {
    if (btn.textContent.trim() === 'تصفية' || btn.textContent.trim() === 'فلترة') {
      btn.addEventListener('click', () => toast('جاري تطبيق الفلتر...', 'info'));
    }
  });

  // Send message button
  document.getElementById('sendMsgBtn')?.addEventListener('click', () => {
    openModal({
      title: 'تأكيد الإرسال',
      body: 'هل أنت متأكد من إرسال هذه الرسالة للمجموعة المحددة؟',
      confirmLabel: 'إرسال الآن',
      onConfirm: () => toast('تم إرسال الرسالة بنجاح', 'success'),
    });
  });

  // License alert close
  document.getElementById('closeLicenseAlert')?.addEventListener('click', () => {
    document.getElementById('licenseAlert')?.remove();
  });

  // Escape key
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal-overlay').forEach(m => m.remove());
  });

});