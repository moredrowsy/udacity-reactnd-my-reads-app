import React, { useCallback, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';

import './App.css';
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';

const APP_TITLE = 'MyReads';
const BOOKSELVES_METADATA = [
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
    document.title = APP_TITLE;
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className='App'>
      <Route path='/' exact>
        <BookList
          title={APP_TITLE}
          books={books}
          bookShelvesMetaData={BOOKSELVES_METADATA}
        />
      </Route>
      <Route path='/search'>
        <BookSearch bookShelvesMetaData={BOOKSELVES_METADATA} />
      </Route>
    </div>
  );
}

export default App;
