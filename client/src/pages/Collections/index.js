import React, { useState, useContext } from "react";
import * as style from "./Collections.module.scss";
import { CollectionContext } from "../../context/Collections";
import CollectionContainer from "../../components/Conllectioncontainer";

export const Collections = () => {
  const { collections, createCollection } = useContext(CollectionContext);
  const [collectionName, setCollectionName] = useState("");
  const [addBtn, setAddBtn] = useState(false);

  return (
    <section>
      <div className={style.collectionHeader}>
        <h1 className={style.pageTitle}>Books Collections</h1>
        <button className={style.addBtn} onClick={() => setAddBtn(!addBtn)}>
          Add New <span>&#10010;</span>
        </button>
      </div>
      {addBtn ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createCollection(collectionName);
          }}
        >
          <input
            type="text"
            name="collectionName"
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="Enter collection name"
          />
          <button onClick={() => {}}>Create</button>
        </form>
      ) : (
        ""
      )}
      {collections.collection.length > 0 ? (
        <article className={style.container}>
          {collections.collection.map((col, i) => (
            <CollectionContainer collection={col} key={i} />
          ))}
        </article>
      ) : (
        ""
      )}
    </section>
  );
};
