import React, { useContext, useState } from "react";
import { CollectionContext } from "../../../context/Collections";
import * as style from "./CollectionPopUp.module.scss";

const CollectionForm = (props) => {
  const { book, from } = props;
  const [collectionId, setCollectionId] = useState("");
  const {
    collections,
    addToCollection,
    moveFromCollectionToCollection,
  } = useContext(CollectionContext);

  const addOrTransfer = () => {
    if (from && from !== collectionId)
      moveFromCollectionToCollection(from, collectionId, book);
    else if (!from)
      addToCollection(
        collectionId,
        book.title,
        book.author_name,
        book.edition_key,
        book.cover_edition_key
      );


  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addOrTransfer();
      }}
    >
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
      <button className={style.createBtn} type="submit">
        {/* Add button Icon */}
        <span>&#10004;</span>
      </button>
    </form>
  );
};

export default function CollectionPopUp(props) {
  const {
    addBtn,
    transformBtn,
    setAddBtn,
    setCreateBtn,
    setTransformBtn,
    createBtn,
    book,
    from,
  } = props;
  const [isAddedMsg, setIsAddedMsg] = useState("")
  const { collections, createCollection } = useContext(CollectionContext);

  const [collectionName, setCollectionName] = useState("");

  return (
    <div className={style.CollectionPopUp}>
      <span
        onClick={() => {
          createBtn
            ? setCreateBtn(false)
            : addBtn
              ? setAddBtn(false)
              : setTransformBtn(false);
        }}
        className={style.closeBtn}
      >
        &#10006;
      </span>
      {/* user wants to Add book to collection */}
      {addBtn ? (
        <div>
          {collections.collection.length > 0 ? (
            <CollectionForm book={book} />
          ) : (
              <p>No collections</p>
            )}
          <span
            className={style.openCreate}
            onClick={() => {
              setCreateBtn(!createBtn);
            }}
          >
            Create New
          </span>
        </div>
      ) : (
          ""
        )}
      {/* user wants to create a new collection */}
      {createBtn ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (collectionName.replace(/\s+/, "")) {
                const isAdded = createCollection(collectionName);
                if (isAdded) {
                  setCreateBtn(false);
                }
                else {
                  setIsAddedMsg("A collection with same name alrady exists");
                }
                setCollectionName("");
              }
            }}
          >
            <p>{isAddedMsg}</p>
            <input
              type="text"
              name="collectionName"
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="Enter collection name"
            />
            <button onClick={() => { }}>Create</button>
          </form>
        </>
      ) : (
          ""
        )}

      {/*Transform From collection to collection */}
      {transformBtn ? (
        <>
          <h3>Transfer To</h3>
          <CollectionForm from={from} book={book} />{" "}
        </>
      ) : (
          ""
        )}
    </div>
  );
}
