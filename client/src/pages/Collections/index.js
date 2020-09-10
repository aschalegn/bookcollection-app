import React, { useState, useContext } from "react";
import * as style from "./Collections.module.scss";
import { CollectionContext } from "../../context/Collections";
import CollectionContainer from "../../components/Conllectioncontainer";
import CollectionPopUp from "../../components/PopUps/CollectionPopUp";

export const Collections = () => {
  const { collections } = useContext(CollectionContext);
  const [createBtn, setCreateBtn] = useState(false);

  return (
    <section>
      <div className={style.collectionHeader}>
        <h1 className={style.pageTitle}>Books Collections</h1>
        <button
          className={style.createBtn}
          onClick={() => setCreateBtn(!createBtn)}
        >
          Add New <span>&#10010;</span>
        </button>
      </div>
      {createBtn ? (
        <CollectionPopUp setCreateBtn={setCreateBtn} createBtn={createBtn} />
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
        <section className={style}>
          <p className={style.noCollection}>
            No Collection was created please create new with the green button on
            the top of the page
          </p>
        </section>
      )}
    </section>
  );
};
