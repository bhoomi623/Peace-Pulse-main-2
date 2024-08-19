const signup=document.getElementById('signupForm')
if (signup) {
    signup.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      if(password!==confirmPassword){
        alert('confirm password is not same as password')
      }

else
{      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        alert('signup successful');
        window.location.href = '../html/index.html';
      } else {
        alert(data.message);
      }}
    });
  };