import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../config/axios';
import DashboardPage from '../components/DashboardPage.jsx';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const userData = {
      username: username,
      password: password,
    };

    axios
      .post('/authenticate', userData)
      .then((response) => {
        const token = response.data.token;
        console.log('Token JWT recibido:', token);
        localStorage.setItem('token', token);

        // Mostrar notificación de éxito
        toast.success('Inicio de sesión exitoso', {
          position: 'top-right',
          autoClose: 3000, // Duración en milisegundos
        });

        // Redirige al usuario al componente Dashboard después de iniciar sesión
        ReactDOM.createRoot(document.getElementById('root')).render(
          <React.StrictMode>
            <DashboardPage />
          </React.StrictMode>
        );
      })
      .catch((error) => {
        console.error('Error de autenticación:', error);
        // Mostrar notificación de error
        toast.error('Error de inicio de sesión', {
          position: 'top-right',
          autoClose: 3000, // Duración en milisegundos
        });
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Authentication with JWT</h1>
      <form>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="button" onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </form>
      <ToastContainer /> {/* Contenedor de notificaciones */}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    margin: '0 auto', // Agregado para centrar el contenedor
  },
  heading: {
    fontSize: '24px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default LoginPage;
