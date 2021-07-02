import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';

import BookGrid from './BookGrid';

export default function BookSearch(props) {
  const { bookShelvesMetaData } = props;
  const [query, setQuery] = useState('');
  const [queryBooks, setQueryBooks] = useState([]);

  const clearQueryBooks = () => setQueryBooks([]);

  const updateQueryBooks = useCallback(async (query) => {
    if (query) {
      const maxResults = 50;
      const data = await BooksAPI.search(query, maxResults);
      if (data && !data.error) setQueryBooks(data);
      else clearQueryBooks();
    } else {
      clearQueryBooks();
    }
  }, []);

  const onChangeHandle = (query) => {
    query = query.trim();
    setQuery(query);
  };

  useEffect(() => {
    updateQueryBooks(query);
  }, [updateQueryBooks, query]);

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-search' onClick={() => {}}>
          Close
        </Link>

        <div className='search-books-input-wrapper'>
          <input
            type='text'
            placeholder='Search by title or author'
            value={query}
            onChange={(e) => onChangeHandle(e.target.value)}
          />
        </div>
      </div>

      <div className='search-books-results'>
        <BookGrid
          books={queryBooks}
          bookShelvesMetaData={bookShelvesMetaData}
        />
      </div>
    </div>
  );
}
