import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import { BookSelvesContext } from '../App';
import PropTypes from 'prop-types';

export default function BookList(props) {
  const bookShelves = useContext(BookSelvesContext);
  const { books, title, updateBook } = props;

  const getShelfBooks = (shelf) => books.filter((book) => book.shelf === shelf);

  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>{title}</h1>
      </div>

      <div className='list-books-content'>
        {bookShelves
          .filter((bookShelf) => bookShelf.shelf !== 'none')
          .map((bookShelf) => (
            <BookShelf
              key={bookShelf.shelf}
              bookShelfTitle={bookShelf.shelfTitle}
              bookShelfBooks={getShelfBooks(bookShelf.shelf)}
              updateBook={updateBook}
            />
          ))}
      </div>

      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.array,
  title: PropTypes.string,
  updateBook: PropTypes.func,
};
