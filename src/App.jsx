import React, { useCallback, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';

import './App.css';
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';

const AppTitle = 'My Reads';
const bookShelvesMetaData = [
  { shelfTitle: 'Currently Reading', shelf: 'currentlyReading' },
  { shelfTitle: 'Want to Read', shelf: 'wantToRead' },
  { shelfTitle: 'Read', shelf: 'read' },
];

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
        <BookList
          title={AppTitle}
          books={books}
          bookShelvesMetaData={bookShelvesMetaData}
        />
      </Route>
      <Route path='/search'>
        <BookSearch bookShelvesMetaData={bookShelvesMetaData} />
      </Route>
    </div>
  );
}

export default App;
