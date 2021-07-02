import React from 'react';
import Book from './Book';

export default function BookGrid(props) {
  const { books, bookShelvesMetaData } = props;

  return (
    <ol className='books-grid'>
      {books.map((book) => (
        <li key={book.id}>
          <Book book={book} bookShelvesMetaData={bookShelvesMetaData} />
        </li>
      ))}
    </ol>
  );
}
