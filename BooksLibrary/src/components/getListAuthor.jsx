import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import AuthorP from '../components/AuthorCreation.jsx';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);

  const back = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <AuthorP />
        </React.StrictMode>
    );
  }

  const getAuthorsList = () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    axios
      .get('/authors',{
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }
      )
      .then((response) => {
        setAuthors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de autores:', error);
        setLoading(false);
        toast.warning('La lista de autores está vacía', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  return (
    <body >
    <div>
      <h2 onClick={back} style={styles.tryAgain}>Back to Authors main page</h2>
      <h1>Authors List</h1>
      <button type="button" onClick={getAuthorsList} style={styles.createButton}>
        Get List
      </button>
      <p></p>
      {loading ? (
        <p>Loading Authors...</p>
      ) : (
        authors.length > 0 ? (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Nationality</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {authors.map((author) => (
                <TableRow key={author.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {author.id}
                  </TableCell>
                  <TableCell>{author.name}</TableCell>
                  <TableCell>{author.nationality}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        ) : (
          <p >No Authors available.</p>
        )
      )}
      <ToastContainer />
    </div>
    </body>
  );
}

export default AuthorList;

const styles = {
    createButton: {
      backgroundColor: 'blue', // Fondo negro
      color: '#fff',
      border: 'none',
      borderRadius: '3px',
      padding: '10px 20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s', // Transición de color
    },
    tryAgain: {
        backgroundColor: 'white', // Fondo negro
        color: '#000',
        fontStyle: 'italic',
    },
    
  };
  
  