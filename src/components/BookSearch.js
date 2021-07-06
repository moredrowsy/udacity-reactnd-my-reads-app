import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';

import BookGrid from './BookGrid';

export default function BookSearch(props) {
  const { books, updateBook } = props;
  const [query, setQuery] = useState('');
  const [queryBooks, setQueryBooks] = useState([]);
  const textInput = useRef(null);

  const clearQueryBooks = () => setQueryBooks([]);

  const updateQueryBooks = useCallback(
    async (query) => {
      if (query) {
        const maxResults = 50;
        const results = await BooksAPI.search(query, maxResults);
        if (results && !results.error) {
          // For some reason, results do not contain shelf data
          // Update results with local book shelf data
          for (const book of books) {
            for (const queryBook of results) {
              if (queryBook.id === book.id) {
                queryBook.shelf = book.shelf;
                break;
              }
            }
          }
          setQueryBooks(results);
        } else clearQueryBooks();
      } else {
        clearQueryBooks();
      }
    },
    [books]
  );

  const onChangeHandle = (query) => setQuery(query.trim());

  useEffect(() => {
    updateQueryBooks(query);
    if (textInput) textInput.current.focus();
  }, [updateQueryBooks, query]);

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-search'>
          Close
        </Link>

        <div className='search-books-input-wrapper'>
          <input
            type='text'
            placeholder='Search by title or author'
            value={query}
            onChange={(e) => onChangeHandle(e.target.value)}
            ref={textInput}
          />
        </div>
      </div>

      <div className='search-books-results'>
        <BookGrid books={queryBooks} updateBook={updateBook} />
      </div>
    </div>
  );
}
