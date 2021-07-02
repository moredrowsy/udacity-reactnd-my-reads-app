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
  { shelfTitle: 'None', shelf: 'none' },
];

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(
    async () => setBooks(await BooksAPI.getAll()),
    []
  );

  const updateBook = (bookToUpdate, moveToShelf) => {
    BooksAPI.update(bookToUpdate, moveToShelf).then(() => {
      // Fetching books everytime a book is updated is bandwidth intensive
      // After remote update is done, update locally
      for (const book of books) {
        // Found bookToUpdate; update locally and exit
        if (book.id === bookToUpdate.id) {
          book.shelf = moveToShelf;
          setBooks([...books]);
          return;
        }
      }
      // Didn't find bookToUpdate locally, so add it.
      setBooks([...books, { ...bookToUpdate, shelf: moveToShelf }]);
    });
  };

  useEffect(() => {
    document.title = APP_TITLE;
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className='App'>
      <Route path='/' exact>
        <BookList title={APP_TITLE} books={books} updateBook={updateBook} />
      </Route>
      <Route path='/search'>
        <BookSearch books={books} updateBook={updateBook} />
      </Route>
    </div>
  );
}

export default App;
export const BookSelvesContext = React.createContext(BOOKSELVES_METADATA);
