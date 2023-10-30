import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Book from '../components/CreateBook.jsx';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const back = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <Book />
        </React.StrictMode>
    );
  }

  const getBooksList = () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    axios
      .get('/books', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de libros:', error);
        setLoading(false);
        toast.warning('La lista de libros está vacía', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  return (
    <body >
    <div>
        <button type="button" onClick={back} style={styles.tryAgain} >
            Go Back
        </button>

      <h1>Books List</h1>
      <button type="button" onClick={getBooksList} style={styles.createButton}>
        Get List
      </button>
      <p></p>
      {loading ? (
        <p>Loading Books...</p>
      ) : (
        books.length > 0 ? (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Publication Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {book.id}
                  </TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.publicationDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p >No Books available.</p>
        )
      )}
      <ToastContainer />
    </div>
    </body>
  );
}

export default BookList;

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
