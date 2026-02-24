const shouldFail = false;

function fetchUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject('Failed to load user data.');
      } else {
        resolve([
          { id: 1, name: 'Ahmed Hassan', role: 'Administrator' },
          { id: 2, name: 'Fatima Noor', role: 'Editor' },
          { id: 3, name: 'Bilal Iqbal', role: 'Moderator' },
          { id: 4, name: 'Zainab Malik', role: 'Contributor' },
          { id: 5, name: 'Omar Farooq', role: 'Viewer' }
        ]);
      }
    }, 3000);
  });
}

function renderUsers(users) {
  const loaderCard = document.getElementById('loaderCard');
  loaderCard.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(user => `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.role}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderError(msg) {
  const loaderCard = document.getElementById('loaderCard');
  loaderCard.innerHTML = `
    <div class="alert-error">${msg}</div>
  `;
}

fetchUsers()
  .then(users => renderUsers(users))
  .catch(err => renderError(err));
