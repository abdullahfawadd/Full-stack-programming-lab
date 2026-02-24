/* ═══════════════════════════════════════════════════
   Task 3 — Async Data Loader  |  Production JS
   ES6: Promises, async/await, .then/.catch
   ═══════════════════════════════════════════════════ */

let shouldFail = false;

// ── Role SVG icons (no emojis) ──
const ROLE_ICONS = {
  Administrator: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  Editor:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  Moderator:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
  Contributor:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>`,
  Viewer:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  Developer:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  Designer:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="8" cy="13" r="3"/><circle cx="17" cy="16" r="2"/></svg>`,
  Analyst:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
};

// ── Simulated API (Promise) ──
function fetchUsers() {
  return new Promise((resolve, reject) => {
    const delay = 1500 + Math.random() * 1500;
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Network Error: Unable to reach the server. Please check your connection and try again.'));
      } else {
        resolve([
          { id: 1, name: 'Ahmed Hassan',   role: 'Administrator', email: 'ahmed@university.edu',   status: 'active' },
          { id: 2, name: 'Fatima Noor',    role: 'Editor',        email: 'fatima@university.edu',  status: 'active' },
          { id: 3, name: 'Bilal Iqbal',    role: 'Moderator',     email: 'bilal@university.edu',   status: 'pending' },
          { id: 4, name: 'Zainab Malik',   role: 'Contributor',   email: 'zainab@university.edu',  status: 'active' },
          { id: 5, name: 'Omar Farooq',    role: 'Viewer',        email: 'omar@university.edu',    status: 'inactive' },
          { id: 6, name: 'Abdullah Fawad', role: 'Developer',     email: 'abdullahfawad.dev@gmail.com', status: 'active' },
          { id: 7, name: 'Hira Siddiqui',  role: 'Designer',      email: 'hira@university.edu',    status: 'active' },
          { id: 8, name: 'Kamran Ali',     role: 'Analyst',       email: 'kamran@university.edu',  status: 'pending' },
        ]);
      }
    }, delay);
  });
}

// ── DOM ──
const skeleton     = document.getElementById('skeleton');
const tableWrapper = document.getElementById('tableWrapper');
const errorState   = document.getElementById('errorState');
const errorMsg     = document.getElementById('errorMsg');
const tbody        = document.querySelector('#userTable tbody');
const recordBadge  = document.getElementById('recordBadge');
const userCountEl  = document.getElementById('userCount');
const loadTimeEl   = document.getElementById('loadTime');
const fetchStatusEl= document.getElementById('fetchStatus');
const statusIcon   = document.getElementById('statusIcon');
const refreshBtn   = document.getElementById('refreshBtn');

const avatarClass = id => `c${id % 6}`;
const getInitials = name => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

// ── Async / await data loading ──
async function loadData() {
  // Show skeleton, hide others
  skeleton.style.display = 'block';
  tableWrapper.style.display = 'none';
  errorState.style.display = 'none';

  fetchStatusEl.textContent = 'Loading...';
  fetchStatusEl.style.color = 'var(--accent)';
  statusIcon.className = 'stat-icon blue';
  recordBadge.textContent = 'Loading...';
  refreshBtn.classList.add('loading');

  const startTime = performance.now();

  try {
    const users = await fetchUsers();
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

    skeleton.style.display = 'none';
    tableWrapper.style.display = 'block';

    // Render rows — template literals, destructuring
    tbody.innerHTML = users.map(({ id, name, role, email, status }) => `
      <tr>
        <td>
          <div class="user-cell">
            <div class="avatar ${avatarClass(id)}">${getInitials(name)}</div>
            <div>
              <div class="user-name">${name}</div>
              <div class="user-email-sub">${email}</div>
            </div>
          </div>
        </td>
        <td><span class="role-badge">${ROLE_ICONS[role] || ''}${role}</span></td>
        <td style="color:var(--text2);font-size:13px">${email}</td>
        <td><span class="status status-${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
      </tr>
    `).join('');

    // Update stats
    userCountEl.textContent = users.length;
    loadTimeEl.textContent = `${elapsed}s`;
    fetchStatusEl.textContent = 'Success';
    fetchStatusEl.style.color = 'var(--success)';
    statusIcon.className = 'stat-icon green';
    recordBadge.textContent = `${users.length} records`;

    showToast(`Loaded ${users.length} users in ${elapsed}s`);

  } catch (err) {
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

    skeleton.style.display = 'none';
    errorState.style.display = 'flex';
    errorMsg.textContent = err.message;

    userCountEl.textContent = '0';
    loadTimeEl.textContent = `${elapsed}s`;
    fetchStatusEl.textContent = 'Failed';
    fetchStatusEl.style.color = 'var(--danger)';
    statusIcon.className = 'stat-icon red';
    recordBadge.textContent = 'Error';

    showToast('Failed to load data');
  } finally {
    refreshBtn.classList.remove('loading');
  }
}

// ── Toast ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ── Events ──
refreshBtn.addEventListener('click', loadData);

document.getElementById('retryBtn').addEventListener('click', () => {
  shouldFail = false;
  const btn = document.getElementById('toggleFailBtn');
  btn.classList.remove('active');
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Simulate Error`;
  loadData();
});

document.getElementById('toggleFailBtn').addEventListener('click', () => {
  shouldFail = !shouldFail;
  const btn = document.getElementById('toggleFailBtn');
  btn.classList.toggle('active');
  if (shouldFail) {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Error Mode ON`;
  } else {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Simulate Error`;
  }
});

// ── Init ──
loadData();
console.log('%c Task 3 — Async Data Loader ', 'background:#0071e3;color:#fff;padding:4px 12px;border-radius:4px;font-weight:600');
