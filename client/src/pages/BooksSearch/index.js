import React, { useState } from "react";
import { searchBooks } from '../../BooksApi';
import * as style from './BooksSearch.module.scss';
import BookCard from '../../components/BookCard'

export const BooksSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [page, setpage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getSearchResult = (e) => {
    e.preventDefault();
    searchBooks(searchTerm)
      .then(result => {
        setSearchResult(result.docs);
        setTotalPages(result.docs.length)
        // console.log(result.docs);
      })
  }

  return (
    <section>
      <h1>Search books</h1>
      <form className={style.serchForm} onSubmit={getSearchResult}>
        <input type="text" name="serach" id="search" className={style.search} onChange={(e) => {
          setSearchTerm(e.target.value)
        }} />
        <input type="submit" value="Search" />
      </form>
      <article>
        {searchResult.map((book, i) =>
          <BookCard book={book} key={i} />
        )}
      </article>
    </section>
  );
};
