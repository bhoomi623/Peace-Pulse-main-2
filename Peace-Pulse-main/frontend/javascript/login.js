const loginForm = document.getElementById('loginForm');

  
    // Handle Login
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;

        const password = document.getElementById('password').value;
        console.log(username,password)
  
        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          alert('Login successful');
          window.location.href = '../html/index.html';
        } else {
          alert(data.message);
        }
      });
    };