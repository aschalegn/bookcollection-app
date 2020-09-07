import React, { useContext } from "react";
import * as style from "./Collections.module.scss";
import { CollectionContext } from "../../context/Collections/Collction";

export const Collections = () => {
  const { collections } = useContext(CollectionContext)
  return (
    <section>
      <h1>Books collections</h1>
      {collections.collection.length > 0 ?
        <article className="">
          {collections.collection.map((collection, i) =>
            <div key={i}>
              <h2>{collection.name}</h2>
              <p>{collection.books.length}</p>
            </div>
          )}
        </article> : ''}
    </section>
  );
};
