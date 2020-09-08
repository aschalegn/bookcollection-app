import React, { useState, useContext } from "react";
import * as style from "./Collections.module.scss";
import { CollectionContext } from "../../context/Collections";
import CollectionContainer from "../../components/Conllectioncontainer";

export const Collections = () => {
  const { collections, collectionDispach } = useContext(CollectionContext);
  const [collectionName, setCollectionName] = useState('');
  const [addBtn, setAddBtn] = useState(false);

  const createCollection = (e) => {
    e.preventDefault();
    collectionDispach({
      type: "CREATE_COLLECTION",
      payload: { name: collectionName, books: [] },
    });
  }

  return (
    <section>
      <h1>Books collections</h1>
      <button onClick={() => setAddBtn(!addBtn)}>Add New <span>&#10010;</span></button>
      {addBtn ?
        <form onSubmit={createCollection}>
          <input type="text"
            name="collectionName"
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="Enter collection name"
          />
          <button type="submit">Create</button>
        </form>
        : ''}
      {collections.collection.length > 0 ?
        <article className={style.container}>
          {collections.collection.map((col, i) =>
            <CollectionContainer collection={col} key={i} />
          )}
        </article> : ''}
    </section>
  );
};
