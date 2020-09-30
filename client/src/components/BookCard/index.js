import React, { useState } from "react";
import * as style from "./BookCard.module.scss";
import { getBookCoverByOLID, noCoverAvaillable } from "../../BooksApi";
import CollectionPopUp from "../PopUps/CollectionPopUp";
import BookInfoPopUp from "../PopUps/bookInfo";

export default function BookCard(props) {
    const { book } = props;
    const [createBtn, setCreateBtn] = useState(false);
    const [addBtn, setAddBtn] = useState(false);
    const [getInfo, setGetInfo] = useState(false);

    return (
        <div className={style.bookCard}>
            <div className={style.bookInfo} onClick={() => setGetInfo(!getInfo)}>
                <h3>{book.title}</h3>
                <img
                    src={
                        book.cover_edition_key
                            ? getBookCoverByOLID(book.cover_edition_key)
                            : noCoverAvaillable
                    }
                    alt={book.title}
                />
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
            </div>
            {getInfo ? <BookInfoPopUp key={book.cover_edition_key} book={book} setGetInfo={setGetInfo} /> : ""}
            <button onClick={() => setAddBtn(!addBtn)}>
                <span>Add To Colllection</span>
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
