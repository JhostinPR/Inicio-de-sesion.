document.addEventListener('DOMContentLoaded', () => {
  // Botón para redirigir a la página de agregar usuario
  const addUserBtn = document.getElementById('add-user-btn');
  if (addUserBtn) {
    addUserBtn.addEventListener('click', () => {
      // Redirige a la página de agregar usuario
      window.location.href = 'add_user.html';
    });
  }

  // Formulario de inicio de sesión
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // Usuario encontrado: Guardar en LocalStorage y redirigir
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    });
  }

  // Formulario para agregar usuario
  const addUserForm = document.getElementById('add-user-form');
  if (addUserForm) {
    addUserForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const photoFile = document.getElementById('photo').files[0];

      if (photoFile) {
        const reader = new FileReader();
        reader.readAsDataURL(photoFile);
        reader.onload = () => {
          const newUser = {
            name: document.getElementById('name').value,
            matricula: document.getElementById('matricula').value,
            numero: document.getElementById('numero').value,
            email: document.getElementById('email').value,
            username: document.getElementById('new-username').value,
            password: document.getElementById('new-password').value,
            role: document.getElementById('role').value,
            photo: reader.result,
          };

          const users = JSON.parse(localStorage.getItem('users')) || [];
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));

          alert('Usuario creado con éxito');
          window.location.href = 'index.html';
        };
      } else {
        const newUser = {
          name: document.getElementById('name').value,
          matricula: document.getElementById('matricula').value,
          numero: document.getElementById('numero').value,
          email: document.getElementById('email').value,
          username: document.getElementById('new-username').value,
          password: document.getElementById('new-password').value,
          role: document.getElementById('role').value,
          photo: null,
        };

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Usuario creado con éxito');
        window.location.href = 'index.html';
      }
    });
  }

  // Botón para regresar al menú principal
  const backToLoginBtns = document.querySelectorAll('#back-to-login');
  if (backToLoginBtns) {
    backToLoginBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    });
  }

  // Mostrar datos del usuario en el dashboard
  if (window.location.pathname.includes('dashboard.html')) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userDataDiv = document.getElementById('user-data');
    const qrCodeDiv = document.getElementById('qr-code');

    if (currentUser) {
      // Mostrar los datos del usuario
      userDataDiv.innerHTML = `
        <p><strong>Nombre:</strong> ${currentUser.name}</p>
        <p><strong>Matrícula:</strong> ${currentUser.matricula}</p>
        <p><strong>Número:</strong> ${currentUser.numero}</p>
        <p><strong>Correo:</strong> ${currentUser.email}</p>
        <p><strong>Rol:</strong> ${currentUser.role}</p>
        ${currentUser.photo ? `<img src="${currentUser.photo}" alt="Foto del usuario" width="100">` : ''}
      `;

      // Formatear los datos del usuario para el QR (sin corchetes ni comillas)
      const qrData = `
        Nombre: ${currentUser.name}
        Matrícula: ${currentUser.matricula}
        Número: ${currentUser.numero}
        Correo: ${currentUser.email}
      `;

      // Generar código QR con los datos formateados
      const qr = qrcode(0, 'L');
      qr.addData(qrData);
      qr.make();

      // Insertar el QR generado en el div
      qrCodeDiv.innerHTML = qr.createImgTag();
    } else {
      alert('No se encontraron datos del usuario');
      window.location.href = 'index.html';
    }
  }
});
