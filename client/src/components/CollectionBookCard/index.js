import React, { useContext, useState } from "react";
import { getBookCoverByOLID, noCoverAvaillable } from "../../BooksApi";
import * as style from "./CollectionBookCard.module.scss";
import { CollectionContext } from "../../context/Collections";
import ConfirmPopUp from "../PopUps/ConfirmPopUp";
import CollectionPopUp from "../PopUps/CollectionPopUp";

export default function CollectionBookCard(props) {
  const { book, collectionId } = props;
  const { removeFromCollection } = useContext(CollectionContext);
  const [toDelete, setToDelete] = useState(false);
  const [transformBtn, setTransformBtn] = useState(false);
  const [getInfo, setGetInfo] = useState(false);

  const confirm = (response) => {
    if (response) removeFromCollection(collectionId, book.olid);
    setToDelete(false);
  };

  return (
    <div className={style.bookCard}>
      <ul className={style.bookCommands}>
        <li title="remove from collection">
          <button className={style.deleteBtn} onClick={() => setToDelete(true)}>
            <span>&#10006;</span>
          </button>
        </li>
        <li title="Change collection">
          <button
            className={style.transferBtn}
            onClick={() => {
              setTransformBtn(!transformBtn);
            }}
          >
            <span>&#8633;</span>
          </button>
        </li>
      </ul>

      {toDelete ? (
        <ConfirmPopUp
          confirm={confirm}
          message="You sure you want to remove from collection?"
        />
      ) : (
        ""
      )}

      {/* move from collection to collection */}
      {transformBtn ? (
        <CollectionPopUp
          transformBtn={transformBtn}
          setTransformBtn={setTransformBtn}
          from={collectionId}
          book={book}
        />
      ) : (
        ""
      )}
      <div onClick={()=>setGetInfo(!getInfo)}>
      <h3>{book.title}</h3>
      <h4>{book.author}</h4>
      <img
        className={style.coverImg}
        src={book.cover ? getBookCoverByOLID(book.cover) : noCoverAvaillable}
        alt={book.title}
      /></div>
         </div>
  );
}
