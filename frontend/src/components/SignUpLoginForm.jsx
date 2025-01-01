// SignUpLoginForm.js
import React, { useState } from 'react';

const SignUpLoginForm = () => {
  const [view, setView] = useState('login'); // Toggle between login and sign-up views
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = () => {
    const { username, password } = formData;
    if (!username || !password) {
      setMessage('Both fields are required.');
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (existingUsers[username]) {
      setMessage('Username already exists.');
      return;
    }
    existingUsers[username] = password;
    localStorage.setItem('users', JSON.stringify(existingUsers));
    setMessage('Sign-Up successful! You can now log in.');
    setFormData({ username: '', password: '' });
    setView('login');
  };

  const handleLogin = () => {
    const { username, password } = formData;
    if (!username || !password) {
      setMessage('Both fields are required.');
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (existingUsers[username] === password) {
      setMessage('Login successful!');
    } else {
      setMessage('Invalid username or password.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{view === 'login' ? 'Login' : 'Sign Up'}</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      {view === 'login' ? (
        <button onClick={handleLogin} style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Login
        </button>
      ) : (
        <button onClick={handleSignUp} style={{ width: '100%', padding: '10px', backgroundColor: '#28A745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sign Up
        </button>
      )}
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        {view === 'login' ? (
          <p>
            Don&apos;t have an account?{' '}
            <span style={{ color: '#007BFF', cursor: 'pointer' }} onClick={() => { setView('signup'); setMessage(''); }}>
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span style={{ color: '#007BFF', cursor: 'pointer' }} onClick={() => { setView('login'); setMessage(''); }}>
              Login
            </span>
          </p>
        )}
      </div>
      {message && <p style={{ marginTop: '10px', color: 'red' }}>{message}</p>}
    </div>
  );
};

export default SignUpLoginForm;
