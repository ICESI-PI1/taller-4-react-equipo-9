import React, {useState} from 'react';
import axios from '../config/axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import Book from '../components/CreateBook.jsx';

function DeleteBook() {
    const [bookId, setBookId] = useState('');

    const back = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Book/>
            </React.StrictMode>
        );
    }

    const handleDeleteBook = () => {
        if (window.confirm('¿Estás seguro?')) {
            const token = localStorage.getItem('token');

            axios
                .delete(`/books/${bookId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    toast.success('Success', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                })
                .catch((error) => {
                    console.error('Error al eliminar el libro:', error);
                    toast.error('Error al eliminar el libro', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                });
        }
    };

    return (
        <div>
            <h1 style={styles.title}>Delete Book</h1>
            <label htmlFor="bookId">ID to delete:</label>
            <input
                type="text"
                id="bookId"
                name="bookId"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                style={styles.input}
            />
            <button type="button" onClick={handleDeleteBook} style={styles.button}>
                Delete book
            </button>
            <ToastContainer/>
            <p></p>
            <button type="button" onClick={back}>
                Back
            </button>
        </div>
    );
}

export default DeleteBook;

const styles = {
    button: {
        backgroundColor: 'red',
        color: '#000',
        border: 'none',
        borderRadius: '3px',
        padding: '10px 20px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    title: {
        backgroundColor: 'orange',
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Roboto',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        fontSize: '2em',
        padding: '10px 0',
        borderRadius: '10px',
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    input: {
        width: '57%',
        padding: '12px',
        border: '4px solid #ccc',
        borderRadius: '10px',
    },
};
