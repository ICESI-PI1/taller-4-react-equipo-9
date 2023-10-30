import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ReactDOM from 'react-dom/client';
import Dash from '../components/DashboardPage.jsx';
import ShowList from '../components/getBookList.jsx';
import UpdateBooks from '../components/UpdateBook.jsx';
import DeleteBook from '../components/DeleteBook.jsx';

function CreateBook() {

  const [value, setValue] = useState(0);

  const handleChangee = (event, newValue) => {
    setValue(newValue);
  };

  const [bookData, setBookData] = useState({
    title: '',
    publicationDate: '',
    author: {  // Author objeto que contiene el ID, nombre y nacionalidad
      id: null, // ID del autor
      name: '', // Nombre del autor
      nationality: '', // Nacionalidad del autor
    }
  });

  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthors = () => {
    // Obtiene la lista de autores para mostrar en el formulario
    const token = localStorage.getItem('token');
    axios.get('/authors', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
  }

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
    // Verifica si el nombre del campo es "author"
    if (e.target.name === "author") {
      const { author } = bookData;
      // Verifica si el nombre del subcampo es "id", "name" o "nationality"
      if (e.target.id === "id" || e.target.id === "name" || e.target.id === "nationality") {
        author[e.target.id] = e.target.value;
        setBookData({
          ...bookData,
          author: { ...author }
        });
      }
    } else {
      setBookData({
        ...bookData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDashboard = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Dash />
      </React.StrictMode>
    );
  };

  const handleList = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <ShowList />
      </React.StrictMode>
    );
  };

  const handleUpdateBook = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <UpdateBooks />
      </React.StrictMode>
    );
  };

  const handleDelete = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <DeleteBook />
      </React.StrictMode>
    );
  };

  return (
    <div style={styles.container}>
      <Box
        sx={{
          maxWidth: { xs: 320, sm: 1000 },
          bgcolor: 'background.paper',
          margin: '0 auto', // Centrar el Box
          padding: '20px', // Espacio alrededor del Box
        }}
      >
        <Tabs
          value={value}
          onChange={handleChangee}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Back to Dashboard" onClick={handleDashboard} />
          <Tab label="Create Book" />
          <Tab label="Update Book" onClick={handleUpdateBook}/>
          <Tab label="Delete Book" onClick={handleDelete}/>
          <Tab label="Get Books List" onClick={handleList} />
        </Tabs>
      </Box>
      <h1>Create new Book</h1>
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Title:
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
            Publication date:
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
          <label htmlFor="author" style={styles.label}>
            Author ID:
            <input
              type="number"
              id="id"
              name="author"
              value={bookData.author.id}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label htmlFor="author" style={styles.label}>
            Author name:
            <input
              type="text"
              id="name"
              name="author"
              value={bookData.author.name}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label htmlFor="author" style={styles.label}>
            Author nationality:
            <input
              type="text"
              id="nationality"
              name="author"
              value={bookData.author.nationality}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
        </div>
      </form>
      <div style={styles.buttonsContainer}>
        <button type="button" onClick={handleCreateBook} style={styles.createButton}>
          Create Book
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
