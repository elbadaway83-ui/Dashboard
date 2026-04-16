/* ================================================================
   Elawaady Dashboard — Pages Shared Script
   Handles: dark mode, toasts, modals, tab bars, and button events
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

/* ── Modal helper ── */
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

  /* ── Dark mode persistence (synced from localStorage) ── */
  function applyDark(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
  applyDark(savedTheme === 'dark');

  /* Optional: allow toggling dark mode within sub-pages too */
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = !document.body.classList.contains('dark-mode');
      applyDark(isDark);
      localStorage.setItem('dashboard-theme', isDark ? 'dark' : 'light');
      toast(isDark ? 'تم تفعيل الوضع الليلي' : 'تم تفعيل الوضع النهاري', 'info',
            isDark ? 'bi-moon-fill' : 'bi-sun-fill');
    });
  }

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
  const settingsNav = document.querySelectorAll('#settingsNav .settings-nav-item');
  settingsNav.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      settingsNav.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      document.querySelectorAll('.settings-pane').forEach(p => p.classList.remove('active'));
      const pane = document.getElementById('pane-' + link.dataset.pane);
      if (pane) pane.classList.add('active');
    });
  });

  /* ── Generic "إضافة" / "btn-primary" buttons ── */
  const addLabels = {
    'إضافة خدمة':   { title: 'إضافة خدمة جديدة',   body: 'سيتم فتح نموذج إضافة خدمة جديدة.<br><small style="color:var(--text-3)">أدخل البيانات المطلوبة ثم احفظ.</small>' },
    'إضافة موظف':   { title: 'إضافة موظف جديد',     body: 'سيتم فتح نموذج إضافة موظف جديد.<br><small style="color:var(--text-3)">أدخل البيانات وحدد الصلاحيات.</small>' },
    'إضافة عميل':   { title: 'إضافة عميل جديد',     body: 'سيتم فتح نموذج لإضافة حساب عميل.<br><small style="color:var(--text-3)">هذه الميزة متاحة في النسخة الكاملة.</small>' },
    'إضافة بروفيدر':{ title: 'إضافة بروفيدر',        body: 'سيتم ربط بروفيدر خدمة جديد.<br><small style="color:var(--text-3)">أدخل مفتاح API والإعدادات اللازمة.</small>' },
    'إضافة خدمة SMM':{ title: 'إضافة خدمة SMM',     body: 'إضافة خدمة سوشيال ميديا جديدة.<br><small style="color:var(--text-3)">هذه الميزة متاحة في النسخة الكاملة.</small>' },
    'إضافة رابط':   { title: 'إضافة رابط اجتماعي',  body: 'سيتم إضافة رابط منصة اجتماعية جديدة.<br><small style="color:var(--text-3)">أدخل الرابط واسم المنصة.</small>' },
    'إضافة شهادة':  { title: 'إضافة شهادة عميل',    body: 'سيتم إضافة رأي / شهادة عميل جديدة.<br><small style="color:var(--text-3)">هذه الميزة متاحة في النسخة الكاملة.</small>' },
    'إضافة عنصر':   { title: 'إضافة عنصر للقائمة',  body: 'إضافة عنصر جديد للقائمة الجانبية.<br><small style="color:var(--text-3)">أدخل الاسم والرابط.</small>' },
    'إضافة تاجر':   { title: 'إضافة تاجر جديد',     body: 'سيتم فتح نموذج تسجيل تاجر جديد.<br><small style="color:var(--text-3)">هذه الميزة متاحة في النسخة الكاملة.</small>' },
  };

  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', e => {
      const label = btn.textContent.trim();
      const cfg = addLabels[label];
      if (cfg) {
        openModal({
          title: cfg.title,
          body: cfg.body,
          confirmLabel: 'متابعة',
          confirmType: 'primary',
          onConfirm: () => toast('تم إرسال الطلب بنجاح — الميزة متاحة في النسخة الكاملة', 'info')
        });
      }
    });
  });

  /* ── Save buttons (.btn-primary with floppy icon) ── */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.querySelector('.bi-floppy') || btn.textContent.includes('حفظ')) {
      btn.addEventListener('click', () => {
        toast('تم حفظ التغييرات بنجاح', 'success');
      });
    }
  });

  /* ── Row-level action buttons (edit/delete/ban/resolve) ── */
  /* Edit buttons */
  document.querySelectorAll('.btn-resolve.btn-blue').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      const actions = {
        'تعديل':    { title: 'تعديل السجل',        msg: 'تم فتح نموذج التعديل' },
        'مراجعة':   { title: 'مراجعة الطلب',       msg: 'جاري فتح صفحة المراجعة...' },
        'تفاصيل':   { title: 'تفاصيل الطلب',       msg: 'جاري تحميل التفاصيل...' },
        'عرض':      { title: 'عرض الملف الشخصي',   msg: 'جاري تحميل الملف الشخصي...' },
        'قبول':     { title: 'قبول البروفيدر',     msg: 'تم قبول البروفيدر بنجاح' },
        'رفض':      { title: 'رفض البروفيدر',      msg: 'تم رفض البروفيدر' },
        'تفعيل':    { title: 'تفعيل العنصر',       msg: 'تم تفعيل العنصر بنجاح' },
        'مقارنة':   { title: 'مقارنة الأسعار',     msg: 'جاري تحميل بيانات المقارنة...' },
        'استخدام':  { title: 'استخدام هذا البروفيدر', msg: 'تم تحديد البروفيدر بنجاح' },
      };
      const cfg = actions[label] || { title: label, msg: `جاري تنفيذ: ${label}` };
      toast(cfg.msg, 'info');
    });
  });

  /* Delete / danger buttons */
  document.querySelectorAll('.btn-resolve.btn-red').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      const dangerLabels = {
        'حذف':         { title: 'تأكيد الحذف',      body: 'هل أنت متأكد من حذف هذا العنصر؟<br><small style="color:var(--text-3)">لا يمكن التراجع عن هذا الإجراء.</small>', msg: 'تم الحذف بنجاح', type: 'danger' },
        'تعليق':       { title: 'تعليق الحساب',     body: 'هل تريد تعليق هذا الحساب مؤقتاً؟', msg: 'تم تعليق الحساب مؤقتاً', type: 'warning' },
        'حظر':         { title: 'حظر المستخدم',     body: 'هل تريد حظر هذا المستخدم؟<br><small style="color:var(--text-3)">يمكن رفع الحظر لاحقاً.</small>', msg: 'تم حظر المستخدم', type: 'warning' },
        'فتح القضية':  { title: 'فتح القضية',       body: 'هل تريد فتح هذا النزاع للمراجعة؟', msg: 'تم فتح القضية — جاري المراجعة', type: 'danger' },
        'فتح النزاع':  { title: 'فتح النزاع',       body: 'هل تريد فتح هذا النزاع؟', msg: 'تم فتح النزاع بنجاح', type: 'danger' },
        'تعطيل':       { title: 'تعطيل العنصر',    body: 'هل تريد تعطيل هذا العنصر؟', msg: 'تم تعطيل العنصر', type: 'warning' },
        'إيقاف':       { title: 'إيقاف الخدمة',    body: 'هل تريد إيقاف هذه الخدمة؟', msg: 'تم إيقاف الخدمة مؤقتاً', type: 'warning' },
      };
      const cfg = dangerLabels[label] || {
        title: label, body: `هل تريد تنفيذ: <strong>${label}</strong>؟`,
        msg: 'تم تنفيذ الإجراء', type: 'danger'
      };
      openModal({
        title: cfg.title,
        body: cfg.body,
        confirmLabel: label,
        confirmType: 'danger',
        onConfirm: () => toast(cfg.msg, cfg.type)
      });
    });
  });

  /* Green action buttons */
  document.querySelectorAll('.btn-resolve.btn-green').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      const msgs = {
        'تفعيل':      'تم تفعيل العنصر بنجاح',
        'رفع الحظر':  'تم رفع الحظر عن هذا المستخدم',
        'قبول':       'تم القبول بنجاح',
      };
      toast(msgs[label] || `تم تنفيذ: ${label}`, 'success');
    });
  });

  /* ── Card action buttons "عرض الكل" ── */
  document.querySelectorAll('.card-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      if (label.includes('تصدير')) {
        toast('جاري تصدير البيانات... (الميزة متاحة في النسخة الكاملة)', 'info', 'bi-download');
      } else {
        toast('هذه الميزة متاحة في النسخة الكاملة', 'info', 'bi-info-circle');
      }
    });
  });

  /* ── Pagination buttons ── */
  document.querySelectorAll('.pagination-bar .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => toast('لا توجد صفحات إضافية في النسخة التجريبية', 'info'));
  });

  /* ── Filter / secondary generic buttons ── */
  document.querySelectorAll('.btn-secondary').forEach(btn => {
    const label = btn.textContent.trim();
    if (label === 'تصفية' || label === 'فلترة') {
      btn.addEventListener('click', () => toast('جاري تطبيق الفلتر...', 'info', 'bi-funnel'));
    }
  });

  /* ── Switch toggle (generic) ── */
  document.querySelectorAll('.switch-container').forEach(sw => {
    if (!sw.getAttribute('onclick')) {
      sw.addEventListener('click', () => sw.classList.toggle('on'));
    }
  });

  /* ── Escape key ── */
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.remove());
    }
  });

});
