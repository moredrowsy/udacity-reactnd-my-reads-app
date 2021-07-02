import React from 'react';

export default function Book(props) {
  const { book, bookShelvesMetaData } = props;
  const { imageLinks, title, authors } = book;
  let thumbnail = (imageLinks && imageLinks.thumbnail) || '';

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
          <select>
            <option value='move' disabled>
              Move to...
            </option>
            {bookShelvesMetaData.map((metadata) => (
              <option key={metadata.shelf} value={metadata.shelf}>
                {metadata.shelfTitle}
              </option>
            ))}
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{title}</div>
      <div className='book-authors'>{authors && authors.join(' & ')}</div>
    </div>
  );
}
