import React, { useCallback, useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';

import './App.css';
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(
    async () => setBooks(await BooksAPI.getAll()),
    []
  );

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className='App'>
      <Route path='/' exact>
        <BookList books={books} />
      </Route>
      <Route path='/search'>
        <BookSearch />
      </Route>
    </div>
  );
}

export default App;
