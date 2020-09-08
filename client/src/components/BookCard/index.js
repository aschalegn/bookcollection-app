import React, { useState, useContext } from "react";
import * as style from "./BookCard.module.scss";
import { getBookCoverByOLID, getBookInfo } from "../../BooksApi";
import { CollectionContext } from "../../context/Collections";

export default function BookCard(props) {
  const { book } = props;
  const { collections, createCollection, addToCollection } = useContext(
    CollectionContext
  );
  const [addBtn, setAddBtn] = useState(false);
  const [newCollection, setNewCollection] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionId, setCollectionId] = useState("");

  //add to collection
  return (
    <div className={style.book_card}>
      <h2>{book.title}</h2>
      {book.author_name
        ? book.author_name.map((author, i) => (
            <h2 key={i}>
              <small> {author}</small>
            </h2>
          ))
        : ""}
      <img
        src={getBookCoverByOLID(book.edition_key[1] || book.edition_key[0])}
      />
      <button className={style.add_btn} onClick={() => setAddBtn(!addBtn)}>
        <span>&#43;</span>
      </button>

      {/* user desided to add to collection */}
      {addBtn ? (
        <>
          {collections.collection.length > 0 ? (
            <>
              <select
                name="collection"
                id=""
                onChange={(e) => {
                  setCollectionId(e.target.value);
                }}
              >
                <option value="">Select Collection</option>
                {collections.collection.map((col, i) => (
                  <option value={col.id} key={i}>
                    {col.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  addToCollection(
                    collectionId,
                    book.title,
                    book.author_name,
                    book.edition_key
                  )
                }
              >
                Add
              </button>
            </>
          ) : (
            <p>No collections</p>
          )}
          <p
            onClick={() => {
              setNewCollection(!newCollection);
            }}
          >
            Add New <span>&#10010;</span>
          </p>

          {/* user decided to create new collection */}
          {newCollection ? (
            <>
              <input
                type="text"
                name="addNewCollection"
                id=""
                onChange={(e) => setCollectionName(e.target.value)}
              />
              <button onClick={() => createCollection(collectionName)}>
                Create
              </button>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
