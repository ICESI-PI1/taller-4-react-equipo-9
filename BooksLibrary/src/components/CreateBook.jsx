import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateBook() {
  const [bookData, setBookData] = useState({
    title: '',
    publicationDate: '',
    authorId: 1, // Valor predeterminado para demostración, debes obtener la lista de autores desde la API.
  });

  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtiene la lista de autores para mostrar en el formulario
    axios.get('/authors')
      .then((response) => {
        setAuthors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de autores:', error);
        setLoading(false);
        // Mostrar notificación de autores vacía
        toast.warning('La lista de autores está vacía', {
          position: 'top-right',
          autoClose: 3000, // Duración en milisegundos
        });
      });
  }, []);

  const handleCreateBook = () => {
    const token = localStorage.getItem('token');
    axios
      .post('/books', bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Libro creado:', response.data);
        // Implementa la lógica para manejar la respuesta de creación, como mostrar una notificación de éxito.
        toast.success('Libro creado con éxito', {
          position: 'top-right',
          autoClose: 3000, // Duración en milisegundos
        });
      })
      .catch((error) => {
        console.error('Error al crear el libro:', error);
        // Implementa la lógica para manejar errores, como mostrar una notificación de error.
        toast.error('Error al crear el libro', {
          position: 'top-right',
          autoClose: 3000, // Duración en milisegundos
        });
      });
  };

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={styles.container}>
      <h1>Crear Nuevo Libro</h1>
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Título:
            <input
              type="text"
              id="title"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="publicationDate" style={styles.label}>
            Fecha de Publicación:
            <input
              type="date"
              id="publicationDate"
              name="publicationDate"
              value={bookData.publicationDate}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="authorId" style={styles.label}>
            Autor:
            <select
              id="authorId"
              name="authorId"
              value={bookData.authorId}
              onChange={handleChange}
              style={styles.input}
            >
              {loading ? (
                <option>Cargando autores...</option>
              ) : (
                authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>
      </form>
      <div style={styles.buttonsContainer}>
        <button type="button" onClick={handleCreateBook} style={styles.createButton}>
          Crear Libro
        </button>
      </div>
      <ToastContainer /> {/* Contenedor de notificaciones */}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
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
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center', // Centra el botón
  },
  createButton: {
    backgroundColor: 'black', // Fondo negro
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s', // Transición de color
  },
};

export default CreateBook;
