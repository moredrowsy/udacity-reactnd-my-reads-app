import React from 'react';
import BookGrid from './BookGrid';
import PropTypes from 'prop-types';

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

BookShelf.propTypes = {
  bookShelfTitle: PropTypes.string,
  bookShelfBooks: PropTypes.array,
  updateBook: PropTypes.array,
};
