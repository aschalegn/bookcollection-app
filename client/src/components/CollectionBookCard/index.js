import React, { useContext } from "react";
import { getBookCoverByOLID } from "../../BooksApi";
import * as style from "./CollectionBookCard.module.scss";
import { CollectionContext } from "../../context/Collections";

export default function CollectionBookCard(props) {
  const { book, collectionId } = props;
  const { removeFromCollection } = useContext(CollectionContext);

  return (
    <div className={style.bookCard}>
      <button className={style.deleteBtn} onClick={() => removeFromCollection(collectionId, book.olid)}>
        <span>&#10006;</span>
      </button>
      <h3>{book.title}</h3>
      <h4>{book.author}</h4>
      <img
        className={style.coverImg}
        src={getBookCoverByOLID(book.olid)}
        alt={book.title}
      />
    </div>
  );
}
