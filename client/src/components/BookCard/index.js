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
      <h3>{book.title}</h3>
      <img
        src={getBookCoverByOLID(book.edition_key[1] || book.edition_key[0])}
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
      <br />

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
              <button className={style.addBtn}
                onClick={() =>
                  addToCollection(
                    collectionId,
                    book.title,
                    book.author_name,
                    book.edition_key
                  )
                }
              >
                {/* Add button */}
                <span>&#10004;</span> 
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
            Create New Collection
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
