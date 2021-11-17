import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import * as BooksAPI from '../utils/BooksAPI';
import PropTypes from 'prop-types';

import BookGrid from './BookGrid';

export default function BookSearch(props) {
  const { books, updateBook } = props;
  const [query, setQuery] = useState('');
  const [queryBooks, setQueryBooks] = useState([]);
  const textInput = useRef(null);

  const clearQueryBooks = () => setQueryBooks([]);

  const updateQueryBooks = useCallback(
    async (query) => {
      let q = query ? query.trim() : '';

      if (q) {
        const maxResults = 50;
        const results = await BooksAPI.search(q, maxResults);
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
      } else clearQueryBooks();
    },
    [books]
  );

  // Debounce updating query books
  useEffect(() => {
    const debounceUpdateQueryBooks = debounce(
      () => updateQueryBooks(query),
      500
    );
    debounceUpdateQueryBooks();
    if (textInput) textInput.current.focus();

    return () => {
      debounceUpdateQueryBooks.cancel();
    };
  }, [query, updateQueryBooks]);

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
            onChange={(e) => setQuery(e.target.value)}
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

BookSearch.propTypes = {
  books: PropTypes.array,
  updateBook: PropTypes.func,
};
