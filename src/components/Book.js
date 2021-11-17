import React, { useContext } from 'react';
import { BookSelvesContext } from '../App';
import PropTypes from 'prop-types';

export default function Book(props) {
  const bookShelves = useContext(BookSelvesContext);
  const { book, updateBook } = props;
  const { imageLinks, title, authors } = book;
  const thumbnail = (imageLinks && imageLinks.thumbnail) || '';

  const onClickHandle = (e) => {
    const moveToShelf = e.target.value;
    if (book.shelf !== moveToShelf) {
      book.shelf = moveToShelf;
      updateBook(book, moveToShelf);
    }
  };

  return (
    <div className='book'>
      <div className='book-top'>
        <div
          className='book-cover'
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${thumbnail})`,
          }}
        ></div>
        <div className='book-shelf-changer'>
          <select
            onChange={onClickHandle}
            defaultValue={book.shelf ? book.shelf : 'none'}
          >
            <option value='move' disabled>
              Move to...
            </option>
            {bookShelves.map((metadata) => (
              <option key={metadata.shelf} value={metadata.shelf}>
                {metadata.shelfTitle}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='book-title'>{title}</div>
      <div className='book-authors'>{authors && authors.join(' & ')}</div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.array,
  updateBook: PropTypes.func,
};
