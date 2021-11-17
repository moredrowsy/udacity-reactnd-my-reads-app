import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

export default function BookGrid(props) {
  const { books, updateBook } = props;

  return (
    <ol className='books-grid'>
      {books.map((book) => (
        <li key={book.id}>
          <Book book={book} updateBook={updateBook} />
        </li>
      ))}
    </ol>
  );
}

BookGrid.propTypes = {
  books: PropTypes.array,
  updateBook: PropTypes.func,
};
