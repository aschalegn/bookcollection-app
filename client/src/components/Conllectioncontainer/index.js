import React, { useContext } from "react";
import * as style from "./Conllectioncontainer.module.scss";
import { CollectionContext } from "../../context/Collections";
import CollectionBookCard from "../CollectionBookCard";
import CollectionHeader from "../CollectionHeader";

export default function CollectionContainer({ collection }) {
  const { deleteCollection } = useContext(CollectionContext);

  const next = () => {};
  const prev = () => {};

  return (
    <>
      <CollectionHeader
        name={collection.name}
        deleteCollection={() => deleteCollection(collection.id)}
      />
      <div className={style.carousel}>
        <ul className={style.arrows}>
          <li className={style.prev}>
            <button onClick={prev}>&#10096;</button>
          </li>
          <li className={style.next}>
            <button onClick={next}>&#10097;</button>
          </li>
        </ul>
        <article className={style.books_container}>
          {collection.books.length ? (
            collection.books.map((book, i) => (
              <CollectionBookCard
                book={book}
                key={i}
                collectionId={collection.id}
              />
            ))
          ) : (
            <p>No books in the collection</p>
          )}
        </article>
      </div>
    </>
  );
}
