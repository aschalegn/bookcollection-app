import React from "react";
import * as style from "./bookInfo.module.scss";

import { getBookCoverByOLID, noCoverAvaillable } from "../../../BooksApi";

export default function BookInfoPopUp({ book, setGetInfo }) {
  return (
    <div className={style.bookInfo}>
      <span onClick={() => setGetInfo(false)} className={style.closeBtn}>
        &#10006;
      </span>
      <img
        src={
          book.cover_edition_key
            ? getBookCoverByOLID(book.cover_edition_key)
            : noCoverAvaillable
        }
        alt={book.title}
      />
      <div>
        <h3>{book.title}</h3>
        {book.author_name ? (
          book.author_name.map((author, i) => (
            <h3 key={i}>
              <small> {author}</small>
            </h3>
          ))
        ) : (
          <h3>
            <small> No author Found</small>
          </h3>
        )}
        <p>publish Year: {book.publish_year ? book.publish_year[0] : ""}</p>
        <p>Availeable in languages: </p>
        <ul>
          {book.language ? book.language.map((lang,i) => <li key={i}>{lang}</li>) : ""}
        </ul>
      </div>
    </div>
  );
}
