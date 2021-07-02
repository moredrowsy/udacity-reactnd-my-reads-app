import React from 'react';
import Book from './Book';

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
