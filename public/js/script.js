function login() {
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;
    
    // Send login request to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            // Redirect to chat page on successful login
            window.location.href = '/chat.html';
        } else {
            // Handle login error (e.g., display error message)
            console.error('Login failed');
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
    });
}

function signup() {
    var username = document.getElementById("signup-username").value;
    var password = document.getElementById("signup-password").value;

    // Send signup request to the server
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            // Redirect to chat page on successful signup
            window.location.href = '/chat.html';
        } else {
            // Handle signup error (e.g., display error message)
            console.error('Sign up failed');
        }
    })
    .catch(error => {
        console.error('Error during sign up:', error);
    });
}
