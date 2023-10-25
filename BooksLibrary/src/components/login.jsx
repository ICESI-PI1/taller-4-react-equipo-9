import React, { useState } from 'react';
import axios from '../../src/config/axios'

function Login() {
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

                // Almacena el token en el LocalStorage
                localStorage.setItem('token', token);

                // Redirige al usuario o realiza cualquier otra acción necesaria
            })
            .catch((error) => {
                console.error('Error de autenticación:', error);
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

export default Login;