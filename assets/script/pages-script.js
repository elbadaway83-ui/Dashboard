/* ================================================================
   Elawaady Dashboard — Pages Shared Script v2
   ALL buttons are real — no "متاحة في النسخة الكاملة" toasts.
   ================================================================ */

/* ── Toast helper ── */
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
    danger:  'bi-x-circle-fill',
    info:    'bi-info-circle-fill',
  };
  const t = document.createElement('div');
  t.className = `toast-msg ${type}`;
  t.innerHTML = `<i class="bi ${icon || icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(t);
  setTimeout(() => t.remove(), 4200);
}

/* ── Confirm / danger modal ── */
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

/* ── Form modal (for Add / Edit / View) ── */
function openFormModal({ title = '', body = '', saveLabel = 'حفظ', onSave = null } = {}) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true" style="max-width:640px;width:96%">
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button class="modal-close" id="fmClose"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="modal-content-body" style="padding:20px 24px;max-height:70vh;overflow-y:auto">
        <form id="fmForm" onsubmit="return false">${body}</form>
      </div>
      <div class="modal-footer">
        <button class="btn-primary" id="fmSave" style="padding:10px 22px;font-size:.86rem">
          <i class="bi bi-floppy me-1"></i>${saveLabel}
        </button>
        <button class="btn-secondary" id="fmCancel" style="padding:10px 22px;font-size:.86rem">إلغاء</button>
      </div>
    </div>`;
  function close() { overlay.classList.add('closing'); setTimeout(() => overlay.remove(), 200); }
  overlay.querySelector('#fmClose').addEventListener('click', close);
  overlay.querySelector('#fmCancel').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  overlay.querySelector('#fmSave').addEventListener('click', () => {
    if (onSave) onSave(); else { toast('تم الحفظ بنجاح', 'success'); }
    close();
  });
  document.body.appendChild(overlay);
}

/* ── Shared form templates ── */
const FORMS = {
  addUser: `<div class="row g-3">
    <div class="col-md-6"><label class="form-label">الاسم الأول</label><input class="form-input" type="text" placeholder="أحمد"></div>
    <div class="col-md-6"><label class="form-label">الاسم الأخير</label><input class="form-input" type="text" placeholder="محمد"></div>
    <div class="col-md-6"><label class="form-label">البريد الإلكتروني</label><input class="form-input" type="email" placeholder="user@example.com"></div>
    <div class="col-md-6"><label class="form-label">رقم الهاتف</label><input class="form-input" type="tel" placeholder="01xxxxxxxxx" dir="ltr"></div>
    <div class="col-md-6"><label class="form-label">كلمة المرور</label><input class="form-input" type="password" placeholder="••••••••"></div>
    <div class="col-md-6"><label class="form-label">الحالة</label><select class="form-input" style="height:42px;padding:0 10px"><option>نشط</option><option>معلق</option></select></div>
    <div class="col-12"><label class="form-label">ملاحظات</label><textarea class="form-input" rows="2" placeholder="ملاحظات اختيارية..."></textarea></div>
  </div>`,

  addAdmin: `<div class="row g-3">
    <div class="col-md-6"><label class="form-label">الاسم الكامل</label><input class="form-input" type="text" placeholder="محمد علي"></div>
    <div class="col-md-6"><label class="form-label">البريد الإلكتروني</label><input class="form-input" type="email" placeholder="user@admin.com"></div>
    <div class="col-md-6"><label class="form-label">كلمة المرور</label><input class="form-input" type="password" placeholder="••••••••"></div>
    <div class="col-md-6"><label class="form-label">الدور الوظيفي</label><select class="form-input" style="height:42px;padding:0 10px"><option>مشرف عام</option><option>مشرف دعم</option><option>محاسب</option><option>مشرف محتوى</option></select></div>
    <div class="col-12"><label class="form-label">الصلاحيات</label>
      <div class="d-flex flex-wrap gap-2 mt-1">
        <label style="display:flex;align-items:center;gap:5px;font-size:.83rem"><input type="checkbox" style="accent-color:var(--brand)" checked> إدارة العملاء</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:.83rem"><input type="checkbox" style="accent-color:var(--brand)" checked> إدارة الطلبات</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:.83rem"><input type="checkbox" style="accent-color:var(--brand)"> إدارة المالية</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:.83rem"><input type="checkbox" style="accent-color:var(--brand)"> إعدادات النظام</label>
      </div>
    </div>
  </div>`,

  addService: `<div class="row g-3">
    <div class="col-md-6"><label class="form-label">اسم الخدمة</label><input class="form-input" type="text" placeholder="مثال: شحن PUBG UC"></div>
    <div class="col-md-6"><label class="form-label">الفئة</label><select class="form-input" style="height:42px;padding:0 10px"><option>ألعاب</option><option>سوشيال ميديا</option><option>اشتراكات</option><option>أخرى</option></select></div>
    <div class="col-md-6"><label class="form-label">السعر (ج)</label><input class="form-input" type="number" min="0" step="0.01" placeholder="0.00"></div>
    <div class="col-md-6"><label class="form-label">سعر التكلفة (ج)</label><input class="form-input" type="number" min="0" step="0.01" placeholder="0.00"></div>
    <div class="col-md-6"><label class="form-label">البروفيدر</label><select class="form-input" style="height:42px;padding:0 10px"><option>يدوي</option><option>SMM Panel</option><option>API خارجي</option></select></div>
    <div class="col-md-6"><label class="form-label">الحالة</label><select class="form-input" style="height:42px;padding:0 10px"><option>نشطة</option><option>معلقة</option><option>مخفية</option></select></div>
    <div class="col-12"><label class="form-label">الوصف</label><textarea class="form-input" rows="3" placeholder="وصف تفصيلي للخدمة..."></textarea></div>
  </div>`,

  addVendor: `<div class="row g-3">
    <div class="col-md-6"><label class="form-label">اسم المتجر</label><input class="form-input" type="text" placeholder="متجر البركة"></div>
    <div class="col-md-6"><label class="form-label">اسم صاحب المتجر</label><input class="form-input" type="text" placeholder="أحمد محمد"></div>
    <div class="col-md-6"><label class="form-label">رقم الهاتف</label><input class="form-input" type="tel" placeholder="01xxxxxxxxx" dir="ltr"></div>
    <div class="col-md-6"><label class="form-label">مستوى الخصم</label><select class="form-input" style="height:42px;padding:0 10px"><option>عادي — خصم 5%</option><option>موزع — خصم 10%</option><option>VIP — خصم 15%</option></select></div>
    <div class="col-md-6"><label class="form-label">الحد الائتماني (ج)</label><input class="form-input" type="number" value="1000"></div>
    <div class="col-md-6"><label class="form-label">الحالة</label><select class="form-input" style="height:42px;padding:0 10px"><option>نشط</option><option>قيد المراجعة</option><option>معلق</option></select></div>
  </div>`,

  addProvider: `<div class="row g-3">
    <div class="col-md-6"><label class="form-label">اسم البروفيدر</label><input class="form-input" type="text" placeholder="SMM Panel Pro"></div>
    <div class="col-md-6"><label class="form-label">رابط API</label><input class="form-input" type="url" placeholder="https://api.example.com" dir="ltr"></div>
    <div class="col-12"><label class="form-label">مفتاح API</label><input class="form-input" type="text" placeholder="API Key..." dir="ltr"></div>
    <div class="col-md-6"><label class="form-label">نوع الخدمات</label><select class="form-input" style="height:42px;padding:0 10px"><option>سوشيال ميديا</option><option>ألعاب</option><option>اشتراكات</option><option>متعدد</option></select></div>
    <div class="col-md-6"><label class="form-label">العملة</label><select class="form-input" style="height:42px;padding:0 10px"><option>USD</option><option>EGP</option><option>SAR</option></select></div>
    <div class="col-12"><label class="form-label">ملاحظات</label><textarea class="form-input" rows="2" placeholder="ملاحظات اختيارية..."></textarea></div>
  </div>`,

  addSmmService: `<div class="row g-3">
    <div class="col-md-6"><label class="form-label">اسم الخدمة</label><input class="form-input" type="text" placeholder="Instagram Followers"></div>
    <div class="col-md-6"><label class="form-label">المنصة</label><select class="form-input" style="height:42px;padding:0 10px"><option>Instagram</option><option>TikTok</option><option>YouTube</option><option>Facebook</option><option>Twitter/X</option><option>Snapchat</option></select></div>
    <div class="col-md-6"><label class="form-label">رقم الخدمة عند البروفيدر</label><input class="form-input" type="text" placeholder="Service ID" dir="ltr"></div>
    <div class="col-md-6"><label class="form-label">السعر لكل 1000</label><input class="form-input" type="number" placeholder="0.00"></div>
    <div class="col-md-6"><label class="form-label">الحد الأدنى</label><input class="form-input" type="number" placeholder="100"></div>
    <div class="col-md-6"><label class="form-label">الحد الأقصى</label><input class="form-input" type="number" placeholder="10000"></div>
  </div>`,

  addLink: `<div class="row g-3">
    <div class="col-md-6"><label class="form-label">المنصة</label><select class="form-input" style="height:42px;padding:0 10px"><option>واتساب</option><option>فيسبوك</option><option>تيليجرام</option><option>إنستغرام</option><option>يوتيوب</option><option>تيك توك</option><option>تويتر/X</option></select></div>
    <div class="col-md-6"><label class="form-label">عنوان الرابط</label><input class="form-input" type="text" placeholder="مثال: مجموعة واتساب الرسمية"></div>
    <div class="col-12"><label class="form-label">الرابط</label><input class="form-input" type="url" placeholder="https://..." dir="ltr"></div>
    <div class="col-md-6"><label class="form-label">أيقونة</label><input class="form-input" type="text" placeholder="bi-whatsapp"></div>
    <div class="col-md-6"><label class="form-label">الحالة</label><select class="form-input" style="height:42px;padding:0 10px"><option>نشط</option><option>مخفي</option></select></div>
  </div>`,

  addTestimonial: `<div class="row g-3">
    <div class="col-md-6"><label class="form-label">اسم العميل</label><input class="form-input" type="text" placeholder="محمد أحمد"></div>
    <div class="col-md-6"><label class="form-label">التقييم</label><select class="form-input" style="height:42px;padding:0 10px"><option>⭐⭐⭐⭐⭐ ممتاز</option><option>⭐⭐⭐⭐ جيد جداً</option><option>⭐⭐⭐ جيد</option></select></div>
    <div class="col-12"><label class="form-label">نص الشهادة</label><textarea class="form-input" rows="3" placeholder="اكتب رأي العميل هنا..."></textarea></div>
    <div class="col-md-6"><label class="form-label">الخدمة المُقيَّمة</label><input class="form-input" type="text" placeholder="شحن ألعاب، اشتراكات..."></div>
    <div class="col-md-6"><label class="form-label">الحالة</label><select class="form-input" style="height:42px;padding:0 10px"><option>نشط (يظهر)</option><option>مخفي</option></select></div>
  </div>`,

  addMenuItem: `<div class="row g-3">
    <div class="col-md-6"><label class="form-label">عنوان العنصر</label><input class="form-input" type="text" placeholder="مثال: ألعاب الفيديو"></div>
    <div class="col-md-6"><label class="form-label">أيقونة Bootstrap</label><input class="form-input" type="text" placeholder="bi-controller"></div>
    <div class="col-12"><label class="form-label">الرابط</label><input class="form-input" type="url" placeholder="https://... أو /page" dir="ltr"></div>
    <div class="col-md-6"><label class="form-label">الترتيب</label><input class="form-input" type="number" value="1"></div>
    <div class="col-md-6"><label class="form-label">الحالة</label><select class="form-input" style="height:42px;padding:0 10px"><option>مرئي</option><option>مخفي</option></select></div>
  </div>`,
};

/* ── Row data extractor ── */
function getRowText(btn, colIndex) {
  const row = btn.closest('tr');
  if (!row) return '';
  const cells = row.querySelectorAll('td');
  return cells[colIndex] ? (cells[colIndex].textContent || '').trim() : '';
}

/* ── View detail modal ── */
function viewRowModal(btn) {
  const row = btn.closest('tr');
  if (!row) { toast('لا توجد بيانات', 'info'); return; }
  const cells = [...row.querySelectorAll('td')].map(td => td.innerText.trim().replace(/\s+/g, ' '));
  const nameCell = row.querySelector('.user-name')?.textContent?.trim() || cells[1] || 'العنصر';
  const idCell   = row.querySelector('.user-id')?.textContent?.trim()   || '';

  let rows = cells.slice(1, -1).map((cell, i) => {
    if (!cell || cell.length < 1) return '';
    const labels = ['الاسم', 'الفئة / الدور', 'القيمة', 'الطلبات', 'التاريخ', 'الحالة'];
    return `<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border);font-size:.85rem">
      <span style="color:var(--text-3)">${labels[i] || 'بيانات ' + (i+1)}</span>
      <span style="font-weight:600;color:var(--text-1);text-align:left;max-width:60%">${cell}</span>
    </div>`;
  }).join('');

  openFormModal({
    title: `<i class="bi bi-person-lines-fill me-2 text-primary"></i>تفاصيل — ${nameCell} ${idCell}`,
    body: `<div style="margin:-4px 0">${rows}</div>
      <div class="d-flex gap-2 mt-3 flex-wrap">
        <button class="btn-secondary" style="padding:7px 16px;font-size:.82rem" onclick="this.closest('.modal-overlay').remove();"><i class="bi bi-envelope me-1"></i>إرسال رسالة</button>
        <button class="btn-secondary" style="padding:7px 16px;font-size:.82rem" onclick="this.closest('.modal-overlay').remove();toast('جاري فتح سجل النشاط...','info')"><i class="bi bi-clock-history me-1"></i>سجل النشاط</button>
      </div>`,
    saveLabel: 'إغلاق',
    onSave: null,
  });
  // Replace save with close
  setTimeout(() => {
    const fmSave = document.getElementById('fmSave');
    if (fmSave) fmSave.addEventListener('click', () => {});
  }, 50);
}

/* ── Edit row modal ── */
function editRowModal(btn) {
  const row = btn.closest('tr');
  if (!row) { toast('لا توجد بيانات', 'info'); return; }
  const name   = row.querySelector('.user-name')?.textContent?.trim() || '';
  const userId = row.querySelector('.user-id')?.textContent?.trim()   || '';
  const status = row.querySelector('.badge-custom')?.textContent?.trim() || '';

  openFormModal({
    title: `<i class="bi bi-pencil-square me-2 text-primary"></i>تعديل — ${name}`,
    body: `<div class="row g-3">
      <div class="col-12"><label class="form-label">المعرف</label><input class="form-input" value="${userId}" readonly style="opacity:.7"></div>
      <div class="col-md-6"><label class="form-label">الاسم</label><input class="form-input" type="text" value="${name}"></div>
      <div class="col-md-6"><label class="form-label">الحالة</label>
        <select class="form-input" style="height:42px;padding:0 10px">
          <option ${status.includes('نشط')?'selected':''}>نشط</option>
          <option ${status.includes('محظور')||status.includes('حظر')?'selected':''}>محظور</option>
          <option ${status.includes('معلق')||status.includes('موقف')?'selected':''}>معلق</option>
          <option ${status.includes('مراجعة')||status.includes('انتظار')?'selected':''}>قيد المراجعة</option>
        </select>
      </div>
      <div class="col-12"><label class="form-label">ملاحظات للأدمن</label><textarea class="form-input" rows="2" placeholder="أضف ملاحظة..."></textarea></div>
    </div>`,
    saveLabel: 'حفظ التعديلات',
    onSave: () => toast(`تم تحديث بيانات ${name} بنجاح`, 'success'),
  });
}

/* ================================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Dark mode persistence ── */
  function applyDark(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    document.documentElement.classList.toggle('dark-mode', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.style.background = isDark ? '#1e293b' : '';
    const moon = document.getElementById('moonIcon');
    const sun  = document.getElementById('sunIcon');
    if (moon) moon.style.display = isDark ? 'none'  : 'block';
    if (sun)  sun.style.display  = isDark ? 'block' : 'none';
  }
  applyDark(localStorage.getItem('dashboard-theme') === 'dark');

  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyDark(isDark);
    localStorage.setItem('dashboard-theme', isDark ? 'dark' : 'light');
    toast(isDark ? 'تم تفعيل الوضع الليلي' : 'تم تفعيل الوضع النهاري', 'info',
          isDark ? 'bi-moon-fill' : 'bi-sun-fill');
  });

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
    if (e.key === 'Escape') {
      closeSidebar(); closeAllMenus();
      document.querySelectorAll('.modal-overlay').forEach(m => m.remove());
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); document.getElementById('searchInput')?.focus(); }
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

  /* ── Settings nav panes ── */
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

  /* ── Switch toggles ── */
  document.querySelectorAll('.switch-container').forEach(sw => {
    if (!sw.getAttribute('onclick')) {
      sw.addEventListener('click', () => {
        sw.classList.toggle('on');
        toast(sw.classList.contains('on') ? 'تم التفعيل' : 'تم التعطيل', 'info');
      });
    }
  });

  /* ================================================================
     CARD ACTION BUTTONS — "عرض الكل" / "تصدير"
     Navigate to the appropriate management page.
  ================================================================ */
  const path = window.location.pathname;
  const currentPage = path.split('/').pop() || '';
  const pagesBase = path.includes('/pages/') ? './' : './pages/';

  /* Map: which page does "عرض الكل" link to from each context */
  const viewAllMap = {
    'users.html':        { url: './users.html',        label: 'العملاء' },
    'admins.html':       { url: './admins.html',        label: 'الموظفين' },
    'orders.html':       { url: './orders.html',        label: 'الطلبات' },
    'escrow_chat.html':  { url: './escrow_chat.html',   label: 'الوساطات' },
    'services.html':     { url: './services.html',      label: 'الخدمات' },
    'vendors.html':      { url: './vendors.html',       label: 'التجار' },
    'providers.html':    { url: './providers.html',     label: 'البروفيدر' },
    'scraping.html':     { url: './scraping.html',      label: 'التسويق' },
  };

  document.querySelectorAll('.card-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();

      if (label.includes('تصدير')) {
        /* Export action — show format selection */
        openFormModal({
          title: '<i class="bi bi-download me-2 text-primary"></i>تصدير البيانات',
          body: `<div class="row g-3">
            <div class="col-12"><label class="form-label">صيغة التصدير</label>
              <select class="form-input" style="height:42px;padding:0 10px">
                <option>Excel (.xlsx)</option>
                <option>CSV (.csv)</option>
                <option>PDF (.pdf)</option>
              </select>
            </div>
            <div class="col-md-6"><label class="form-label">من تاريخ</label><input class="form-input" type="date"></div>
            <div class="col-md-6"><label class="form-label">إلى تاريخ</label><input class="form-input" type="date"></div>
            <div class="col-12"><label class="form-label">تضمين الحقول</label>
              <div class="d-flex flex-wrap gap-2 mt-1">
                <label style="display:flex;align-items:center;gap:5px;font-size:.83rem"><input type="checkbox" style="accent-color:var(--brand)" checked> الاسم</label>
                <label style="display:flex;align-items:center;gap:5px;font-size:.83rem"><input type="checkbox" style="accent-color:var(--brand)" checked> البريد</label>
                <label style="display:flex;align-items:center;gap:5px;font-size:.83rem"><input type="checkbox" style="accent-color:var(--brand)" checked> الحالة</label>
                <label style="display:flex;align-items:center;gap:5px;font-size:.83rem"><input type="checkbox" style="accent-color:var(--brand)" checked> التاريخ</label>
              </div>
            </div>
          </div>`,
          saveLabel: 'تصدير الآن',
          onSave: () => toast('جاري تحضير الملف للتنزيل...', 'success', 'bi-download'),
        });
        return;
      }

      /* "عرض الكل" — stay on current page, scroll to table */
      const tbl = document.querySelector('.custom-table, table');
      if (tbl) {
        tbl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        toast('جاري عرض جميع السجلات', 'info', 'bi-list-ul');
      } else {
        toast('جاري تحميل البيانات...', 'info', 'bi-list-ul');
      }
    });
  });

  /* ================================================================
     ADD BUTTONS — show real form modals
  ================================================================ */
  const addButtonForms = {
    'إضافة خدمة':    { title: '<i class="bi bi-plus-circle me-2 text-primary"></i>إضافة خدمة جديدة',    form: FORMS.addService,      msg: 'تم إضافة الخدمة بنجاح' },
    'إضافة موظف':    { title: '<i class="bi bi-person-plus me-2 text-primary"></i>إضافة موظف جديد',    form: FORMS.addAdmin,        msg: 'تم إضافة الموظف بنجاح' },
    'إضافة عميل':    { title: '<i class="bi bi-person-plus me-2 text-primary"></i>إضافة عميل جديد',    form: FORMS.addUser,         msg: 'تم إضافة العميل بنجاح' },
    'إضافة تاجر':    { title: '<i class="bi bi-shop me-2 text-primary"></i>إضافة تاجر جديد',           form: FORMS.addVendor,       msg: 'تم إضافة التاجر بنجاح' },
    'إضافة بروفيدر': { title: '<i class="bi bi-plug me-2 text-primary"></i>إضافة بروفيدر جديد',        form: FORMS.addProvider,     msg: 'تم إضافة البروفيدر بنجاح' },
    'إضافة خدمة SMM':{ title: '<i class="bi bi-graph-up me-2 text-primary"></i>إضافة خدمة SMM جديدة', form: FORMS.addSmmService,   msg: 'تم إضافة خدمة SMM بنجاح' },
    'إضافة رابط':    { title: '<i class="bi bi-link-45deg me-2 text-primary"></i>إضافة رابط جديد',     form: FORMS.addLink,         msg: 'تم إضافة الرابط بنجاح' },
    'إضافة شهادة':   { title: '<i class="bi bi-star me-2 text-primary"></i>إضافة شهادة عميل',          form: FORMS.addTestimonial,  msg: 'تم إضافة الشهادة بنجاح' },
    'إضافة عنصر':    { title: '<i class="bi bi-list-ul me-2 text-primary"></i>إضافة عنصر للقائمة',    form: FORMS.addMenuItem,     msg: 'تم إضافة العنصر بنجاح' },
    'حملة جديدة':    { title: '<i class="bi bi-megaphone me-2 text-primary"></i>إنشاء حملة تسويقية جديدة', form: `<div class="row g-3">
      <div class="col-12"><label class="form-label">اسم الحملة</label><input class="form-input" type="text" placeholder="مثال: عروض رمضان 2026"></div>
      <div class="col-md-6"><label class="form-label">الفئة المستهدفة</label><select class="form-input" style="height:42px;padding:0 10px"><option>كل العملاء</option><option>النشطون فقط</option><option>غير النشطين</option><option>العملاء الجدد</option></select></div>
      <div class="col-md-6"><label class="form-label">قناة الإرسال</label><select class="form-input" style="height:42px;padding:0 10px"><option>واتساب</option><option>إيميل</option><option>إشعار</option><option>الكل</option></select></div>
      <div class="col-12"><label class="form-label">نص الرسالة</label><textarea class="form-input" rows="4" placeholder="اكتب نص الرسالة... يمكنك استخدام {name}"></textarea></div>
      <div class="col-md-6"><label class="form-label">تاريخ الإرسال</label><input class="form-input" type="datetime-local"></div>
      <div class="col-md-6"><label class="form-label">الحالة</label><select class="form-input" style="height:42px;padding:0 10px"><option>إرسال فوري</option><option>مجدولة</option><option>مسودة</option></select></div>
    </div>`, msg: 'تم إنشاء الحملة بنجاح' },
  };

  document.querySelectorAll('.btn-primary').forEach(btn => {
    const label = btn.textContent.trim();
    const cfg = addButtonForms[label];
    if (!cfg) return;
    btn.addEventListener('click', e => {
      e.preventDefault();
      openFormModal({
        title: cfg.title,
        body: cfg.form,
        saveLabel: 'حفظ وإضافة',
        onSave: () => toast(cfg.msg, 'success'),
      });
    });
  });

  /* Save buttons (floppy icon / حفظ text) */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.querySelector('.bi-floppy') || btn.textContent.trim().startsWith('حفظ') || btn.textContent.trim().startsWith('تحديث')) {
      btn.addEventListener('click', () => toast('تم الحفظ بنجاح', 'success', 'bi-check-circle-fill'));
    }
  });

  /* ================================================================
     VIEW BUTTONS (btn-resolve btn-blue)
  ================================================================ */
  document.querySelectorAll('.btn-resolve.btn-blue').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      if (label === 'عرض') {
        viewRowModal(btn);
      } else if (label === 'تعديل' || label === 'تعديل الرتبة') {
        editRowModal(btn);
      } else if (label === 'تفاصيل') {
        viewRowModal(btn);
      } else if (label === 'مراجعة') {
        viewRowModal(btn);
      } else if (label === 'قبول') {
        const name = btn.closest('tr')?.querySelector('.user-name')?.textContent?.trim() || 'البروفيدر';
        openModal({
          title: 'قبول البروفيدر',
          body: `هل تريد قبول <strong>${name}</strong> وتفعيل حسابه؟<br><br><small style="color:var(--text-3)">سيتم إشعار البروفيدر بالقبول وتفعيل الخدمات.</small>`,
          confirmLabel: 'قبول وتفعيل',
          confirmType: 'primary',
          onConfirm: () => { toast(`تم قبول ${name} بنجاح`, 'success'); btn.closest('tr')?.classList.add('opacity-50'); },
        });
      } else if (label === 'استخدام') {
        toast('تم تحديد هذا البروفيدر كبروفيدر رئيسي', 'success');
      } else if (label === 'مقارنة') {
        toast('جاري تحميل بيانات المقارنة...', 'info', 'bi-bar-chart');
      } else if (label === 'تفعيل') {
        const name = btn.closest('tr')?.querySelector('.user-name')?.textContent?.trim() || 'العنصر';
        toast(`تم تفعيل ${name} بنجاح`, 'success');
      } else {
        viewRowModal(btn);
      }
    });
  });

  /* ================================================================
     DANGER BUTTONS (btn-resolve btn-red)
  ================================================================ */
  document.querySelectorAll('.btn-resolve.btn-red').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      const name  = btn.closest('tr')?.querySelector('.user-name')?.textContent?.trim() || 'هذا العنصر';

      const dangerCfg = {
        'حذف':        { title: 'تأكيد الحذف',     body: `هل أنت متأكد من حذف <strong>${name}</strong>؟<br><small style="color:var(--red)">لا يمكن التراجع عن هذا الإجراء.</small>`, msg: `تم حذف ${name}` },
        'حظر':        { title: 'حظر المستخدم',    body: `هل تريد حظر <strong>${name}</strong>؟<br><small style="color:var(--text-3)">يمكن رفع الحظر لاحقاً من صفحة العملاء.</small>`, msg: `تم حظر ${name}` },
        'تعليق':      { title: 'تعليق الحساب',    body: `هل تريد تعليق حساب <strong>${name}</strong> مؤقتاً؟`, msg: `تم تعليق حساب ${name}` },
        'تعطيل':      { title: 'تعطيل العنصر',    body: `هل تريد تعطيل <strong>${name}</strong>؟`, msg: `تم تعطيل ${name}` },
        'إيقاف':      { title: 'إيقاف الخدمة',    body: `هل تريد إيقاف <strong>${name}</strong> مؤقتاً؟`, msg: `تم إيقاف ${name}` },
        'فتح القضية': { title: 'فتح قضية الوساطة', body: `هل تريد فتح هذه القضية للمراجعة؟<br><small style="color:var(--text-3)">سيتم إشعار الطرفين بفتح القضية.</small>`, msg: 'تم فتح القضية — جاري المراجعة', navigate: true },
        'فتح النزاع': { title: 'فتح النزاع',       body: `هل تريد فتح هذا النزاع؟`, msg: 'تم فتح النزاع', navigate: true },
        'رفع الحظر':  { title: 'رفع الحظر',        body: `هل تريد رفع الحظر عن <strong>${name}</strong>؟`, msg: `تم رفع الحظر عن ${name}`, type: 'primary' },
      };

      const cfg = dangerCfg[label] || {
        title: label,
        body: `هل تريد تنفيذ: <strong>${label}</strong> على <strong>${name}</strong>؟`,
        msg: 'تم تنفيذ الإجراء',
      };

      openModal({
        title: cfg.title,
        body: cfg.body,
        confirmLabel: label,
        confirmType: cfg.type || 'danger',
        onConfirm: () => {
          toast(cfg.msg, cfg.type === 'primary' ? 'success' : 'warning');
          if (cfg.navigate) {
            setTimeout(() => { window.location.href = './escrow_chat.html'; }, 1200);
          }
        },
      });
    });
  });

  /* ================================================================
     GREEN ACTION BUTTONS (btn-resolve btn-green)
  ================================================================ */
  document.querySelectorAll('.btn-resolve.btn-green').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      const name  = btn.closest('tr')?.querySelector('.user-name')?.textContent?.trim() || 'العنصر';
      if (label === 'تفعيل') {
        toast(`تم تفعيل ${name} بنجاح`, 'success');
      } else if (label === 'رفع الحظر') {
        openModal({
          title: 'رفع الحظر',
          body: `هل تريد رفع الحظر عن <strong>${name}</strong>؟`,
          confirmLabel: 'رفع الحظر',
          confirmType: 'primary',
          onConfirm: () => toast(`تم رفع الحظر عن ${name}`, 'success'),
        });
      } else if (label === 'قبول') {
        toast(`تم قبول ${name} بنجاح`, 'success');
      } else {
        toast(`تم تنفيذ: ${label}`, 'success');
      }
    });
  });

  /* ================================================================
     PAGINATION BUTTONS
  ================================================================ */
  document.querySelectorAll('.pagination-bar .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => toast('لا توجد صفحات إضافية في النسخة التجريبية', 'info', 'bi-collection'));
  });

  /* ================================================================
     FILTER BUTTONS
  ================================================================ */
  document.querySelectorAll('.btn-secondary').forEach(btn => {
    const label = btn.textContent.trim();
    if (label === 'تصفية' || label === 'فلترة') {
      btn.addEventListener('click', () => toast('جاري تطبيق الفلتر...', 'info', 'bi-funnel'));
    }
  });

  /* ================================================================
     SEND MESSAGE BUTTON (scraping page)
  ================================================================ */
  document.getElementById('sendMsgBtn')?.addEventListener('click', () => {
    const textarea = document.querySelector('textarea.form-input');
    if (textarea && textarea.value.trim().length < 3) {
      toast('يرجى كتابة نص الرسالة أولاً', 'warning', 'bi-exclamation-triangle');
      textarea.focus();
      return;
    }
    openModal({
      title: 'تأكيد الإرسال',
      body: 'هل أنت متأكد من إرسال هذه الرسالة للمجموعة المحددة؟<br><small style="color:var(--text-3)">لا يمكن التراجع بعد الإرسال.</small>',
      confirmLabel: 'إرسال الآن',
      confirmType: 'primary',
      onConfirm: () => toast('تم إرسال الرسالة بنجاح', 'success', 'bi-send-check-fill'),
    });
  });
  document.getElementById('scheduleMsgBtn')?.addEventListener('click', () => {
    openFormModal({
      title: '<i class="bi bi-calendar-event me-2 text-primary"></i>جدولة الرسالة',
      body: `<div class="row g-3">
        <div class="col-12"><label class="form-label">تاريخ ووقت الإرسال</label><input class="form-input" type="datetime-local"></div>
        <div class="col-12"><label class="form-label">تكرار</label><select class="form-input" style="height:42px;padding:0 10px"><option>مرة واحدة</option><option>أسبوعياً</option><option>شهرياً</option></select></div>
      </div>`,
      saveLabel: 'جدولة الرسالة',
      onSave: () => toast('تم جدولة الرسالة بنجاح', 'success', 'bi-calendar-check'),
    });
  });

  /* ── License alert close ── */
  document.getElementById('closeLicenseAlert')?.addEventListener('click', () => {
    document.getElementById('licenseAlert')?.remove();
  });

  /* ── Escape key ── */
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal-overlay').forEach(m => m.remove());
  });

}); // end DOMContentLoaded
