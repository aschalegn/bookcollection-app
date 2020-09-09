import React, { useContext, useState } from "react";
import { getBookCoverByOLID } from "../../BooksApi";
import * as style from "./CollectionBookCard.module.scss";
import { CollectionContext } from "../../context/Collections";
import ConfirmPopUp from "../PopUps/ConfirmPopUp";

export default function CollectionBookCard(props) {
  const { book, collectionId } = props;
  const { removeFromCollection } = useContext(CollectionContext);
  const [toDelete, setToDelete] = useState(false);

  const confirm = (response) => {
    if (response) removeFromCollection(collectionId, book.olid);
    setToDelete(false);
  };
  
  return (
    <div className={style.bookCard}>
      <button className={style.deleteBtn} onClick={() => setToDelete(true)}>
        <span>&#10006;</span>
      </button>
      {toDelete ? (
        <ConfirmPopUp
          confirm={confirm}
          message="You sure you want to remove from collection?"
        />
      ) : (
        ""
      )}
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
