import React from 'react';
import BookGrid from './BookGrid';

export default function BookShelf(props) {
  const { bookShelfTitle, bookShelfBooks, updateBook } = props;

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{bookShelfTitle}</h2>
      <div className='bookshelf-books'>
        <BookGrid books={bookShelfBooks} updateBook={updateBook} />
      </div>
    </div>
  );
}
