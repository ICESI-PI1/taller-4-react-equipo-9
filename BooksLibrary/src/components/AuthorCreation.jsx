import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../config/axios';

function AuthorCreation() {
  const [authorData, setAuthorData] = useState({
    name: '',
    nationality: '',
  });

  const handleAuthorCreate = () => {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    console.log(token);
    axios
      .post('/authors', authorData, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
        },
      })
      .then((response) => {
        console.log('Autor creado:', response.data);
        // Mostrar notificación de éxito
        toast.success('Autor creado con éxito', {
          position: 'top-right',
          autoClose: 3000, // Duración en milisegundos
        });
      })
      .catch((error) => {
        console.error('Error al crear el autor:', error);
        // Mostrar notificación de error
        toast.error('Error al crear el autor', {
          position: 'top-right',
          autoClose: 3000, // Duración en milisegundos
        });
      });
  };

  const handleChange = (e) => {
    setAuthorData({
      ...authorData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Create Author</h1>
      <form>
        <div>
          <label htmlFor="name">Author Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={authorData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nationality">Nacionality:</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={authorData.nationality}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleAuthorCreate}>
          Create Author
        </button>
      </form>
      <ToastContainer /> {/* Contenedor de notificaciones */}
    </div>
  );
}

export default AuthorCreation;
