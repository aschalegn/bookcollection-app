import React, { useRef } from "react";
import { Link } from "react-router-dom";
import * as style from "./Conllectioncontainer.module.scss";
import CollectionBookCard from "../CollectionBookCard";
import CollectionHeader from "../CollectionHeader";

export default function CollectionContainer({ collection }) {
  const sliderRef = useRef();

  const prev = () => {
    const slider = sliderRef.current;
    slider.scrollLeft -= slider.offsetWidth;
    if (slider.scrollLeft < 0) {
      slider.scrollLeft = slider.scrollWidth;
    }
  };

  const next = () => {
    const slider = sliderRef.current;
    slider.scrollLeft += slider.offsetWidth;
    if (slider.scrollLeft > slider.scrollWidth - slider.offsetWidth) {
      slider.scrollLeft = 0;
    }
  };

  return (
    <section className={style.collectionContainer}>
      <CollectionHeader name={collection.name} collectionId={collection.id} />
      <div className={style.carousel}>
        <ul className={style.arrows}>
          <span className={style.prev} onClick={prev}>
            &#10096;
          </span>

          <span className={style.next} onClick={next}>
            &#10097;
          </span>
        </ul>
        <article className={style.booksContainer} ref={sliderRef}>
          {collection.books.length ? (
            collection.books.map((book, i) => (
              <CollectionBookCard
                book={book}
                key={i}
                collectionId={collection.id}
              />
            ))
          ) : (
            <p>
              No books in the collection <Link to="/search">Add now</Link>
            </p>
          )}
        </article>
      </div>
    </section>
  );
}
