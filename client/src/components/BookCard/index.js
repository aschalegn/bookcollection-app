import React, { useState } from "react";
import * as style from "./BookCard.module.scss";
import { getBookCoverByOLID } from "../../BooksApi";
import CollectionPopUp from "../PopUps/CollectionPopUp";

export default function BookCard(props) {
  const { book } = props;
  const [createBtn, setCreateBtn] = useState(false);
  const [addBtn, setAddBtn] = useState(false);

  return (
    <div className={style.book_card}>
      <h3>{book.title}</h3>
      <img
        src={getBookCoverByOLID(book.edition_key[1] || book.edition_key[0])}
        alt={book.title}
      />
      {book.author_name
        ? book.author_name.map((author, i) => (
            <h3 key={i}>
              <small> {author}</small>
            </h3>
          ))
        : ""}
      <button onClick={() => setAddBtn(!addBtn)}>
        <span>Add To Col</span>
      </button>
      <br />

      {/* user desided to add to collection */}
      {addBtn ? (
        <>
          {/* user decided to create new collection */}
          <CollectionPopUp
            setCreateBtn={setCreateBtn}
            createBtn={createBtn}
            addBtn={addBtn}
            setAddBtn={setAddBtn}
            book={book}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
