import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

export default function BookList(props) {
  const { books, title, bookShelvesMetaData } = props;

  const getShelfBooks = (shelf) => books.filter((book) => book.shelf === shelf);

  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>{title}</h1>
      </div>

      <div className='list-books-content'>
        {bookShelvesMetaData.map((metaData) => (
          <BookShelf
            key={metaData.shelf}
            bookShelfTitle={metaData.shelfTitle}
            bookShelfBooks={getShelfBooks(metaData.shelf)}
            bookShelvesMetaData={bookShelvesMetaData}
          />
        ))}
      </div>

      <div className='open-search'>
        <Link to='/search' onClick={() => {}}>
          Add a book
        </Link>
      </div>
    </div>
  );
}
