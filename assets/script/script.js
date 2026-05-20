/* ===== SIDEBAR ===== */
function toggleSidebar() {
  const sb = document.getElementById('admin-sidebar');
  const ov = document.getElementById('sidebar-overlay');
  sb.classList.toggle('open');
  ov.classList.toggle('active');
  document.body.classList.toggle('sidebar-open');
}
function closeSidebar() {
  document.getElementById('admin-sidebar')?.classList.remove('open');
  document.getElementById('sidebar-overlay')?.classList.remove('active');
  document.body.classList.remove('sidebar-open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });

/* ===== TOAST ===== */
function showToast(msg, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || '📢'}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .4s'; }, 2800);
  setTimeout(() => toast.remove(), 3200);
}

/* ===== MODAL ===== */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
  }
});

/* ===== CONFIRM DELETE ===== */
function confirmDelete(msg, callback) {
  if (confirm(msg || 'هل أنت متأكد من الحذف؟')) callback();
}

/* ===== IMAGE PREVIEW ===== */
function setupImagePreview(inputId, previewId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (!input || !preview) return;
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => { preview.src = e.target.result; preview.style.display = 'block'; };
      reader.readAsDataURL(file);
    }
  });
}

/* ===== COLOR PICKER SYNC ===== */
function syncColor(pickerId, textId) {
  const picker = document.getElementById(pickerId);
  const text = document.getElementById(textId);
  if (!picker || !text) return;
  picker.addEventListener('input', () => { text.value = picker.value; });
  text.addEventListener('input', () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(text.value)) picker.value = text.value;
  });
}

/* ===== SEARCH FILTER ===== */
function tableSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  if (!input || !table) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    table.querySelectorAll('tbody tr').forEach(tr => {
      tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

/* ===== TOGGLE ACTIVE LINK ===== */
(function markActiveLink() {
  const current = location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href === current) a.classList.add('active');
    else a.classList.remove('active');
  });
})();

/* ===== THEME PRESET APPLY ===== */
const THEMES = {
  'black-orange': { '--bg': '#0d0d0d', '--bg2': '#141414', '--bg3': '#1a1a1a', '--gold': '#f0a500', '--cyan': '#00c8ff' },
  'deep-space': { '--bg': '#080c14', '--bg2': '#0d1424', '--bg3': '#121a2e', '--gold': '#7c6af5', '--cyan': '#a78bfa' },
  'dark-blue': { '--bg': '#050d1f', '--bg2': '#091730', '--bg3': '#0d2040', '--gold': '#3b82f6', '--cyan': '#60a5fa' },
  'dark-purple': { '--bg': '#0d0514', '--bg2': '#130820', '--bg3': '#1a0b2e', '--gold': '#a855f7', '--cyan': '#c084fc' },
  'digital-green': { '--bg': '#030f08', '--bg2': '#051810', '--bg3': '#07211a', '--gold': '#22c55e', '--cyan': '#4ade80' },
  'red-fire': { '--bg': '#120202', '--bg2': '#1c0404', '--bg3': '#260606', '--gold': '#ef4444', '--cyan': '#f97316' },
};
function applyTheme(key) {
  const theme = THEMES[key];
  if (!theme) return;
  Object.entries(theme).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
}

/* ===== MISC ===== */
document.addEventListener('DOMContentLoaded', () => {
  // auto-close toast on click
  document.addEventListener('click', e => {
    if (e.target.closest('.toast')) e.target.closest('.toast').remove();
  });
});
