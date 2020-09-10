import React, { useState } from "react";
import { searchBooks } from "../../BooksApi";
import * as style from "./BooksSearch.module.scss";
import BookCard from "../../components/BookCard";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";

export const BooksSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchMethod, setSearchMethod] = useState("q");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(15);
  const [totalPages, setTotalPages] = useState(0);

  const getSearchResult = (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    searchBooks(searchMethod, searchTerm).then((result) => {
      setSearchResult(result.docs);
      setTotalPages(result.docs.length);
      setLoading(false);
    });
  };

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentResult = searchResult.slice(firstIndex, lastIndex);

  const paginate = (currentPage) => {
    setCurrentPage(currentPage);
  };

  return (
    <section
      className={
        searchResult.length > 0 ? style.bookSearch : style.beforeSearch
      }
    >
      <h1>Search Books</h1>
      <form className={style.serchForm} onSubmit={getSearchResult}>
        <div>
          <select
            name="searchMethod"
            onChange={(e) => setSearchMethod(e.target.value)}
            className={style.formItem}
          >
            <option value="q">All</option>
            <option value="author">Author</option>
            <option value="title">Book Title</option>
          </select>
          <input
            type="text"
            name="serach"
            id="search"
            className={style.formItem}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <input type="submit" value="Search" className={style.formItem} />
      </form>

      {loading ? (
        <Loader />
      ) : currentResult.length > 0 ? (
        <>
          <article className={style.searchResult}>
            {currentResult.map((book, i) => (
              <BookCard book={book} key={i} />
            ))}
          </article>

          <Pagination
            paginate={paginate}
            perPage={perPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        ""
      )}
    </section>
  );
};
