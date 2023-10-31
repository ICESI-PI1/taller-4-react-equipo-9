import React, { useState } from 'react';
import axios from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import Book from '../components/CreateBook.jsx';

function DeleteBook() {
  const [bookId, setBookId] = useState('');

  const back = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <Book />
        </React.StrictMode>
    );
  }

  const handleDeleteBook = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      const token = localStorage.getItem('token');

      axios
        .delete(`/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success('Libro eliminado con éxito', {
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
      <h1>Delete Book</h1>
      <label htmlFor="bookId">ID OF BOOK TO DELETE:</label>
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
      <ToastContainer />
      <p></p>
      <button type="button" onClick={back} >
        Back
      </button>
    </div>
  );
}

export default DeleteBook;

const styles = {
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  button: {
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};
