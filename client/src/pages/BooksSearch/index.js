import React, { useState } from "react";
import { searchBooks } from '../../BooksApi';
import * as style from './BooksSearch.module.scss';
import BookCard from '../../components/BookCard'
import Pagination from "../../components/Pagination";

export const BooksSearch = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [searchMethod, setSearchMethod] = useState('q');
   const [searchResult, setSearchResult] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [perPage] = useState(15);
   const [totalPages, setTotalPages] = useState(0);
   // let firstPostIndex, lastPostIndex, currentResult = [];
   const getSearchResult = (e) => {
      e.preventDefault();
      searchBooks(searchMethod, searchTerm)
         .then(result => {
            setSearchResult(result.docs);
            setTotalPages(result.docs.length)
         })
   }

   const lastIndex = currentPage * perPage;
   const firstIndex = lastIndex - perPage;
   const currentResult = searchResult.slice(firstIndex, lastIndex);

   const paginate = (currentPage) => {
      setCurrentPage(currentPage);
   }

   return (
      <section className={style.book_search}>
         <h1>Search books</h1>
         <form className={style.serchForm} onSubmit={getSearchResult}>
            <select name="searchMethod" onChange={(e) => setSearchMethod(e.target.value)}>
               <option value="q">All</option>
               <option value="author">Author</option>
               <option value="title">Book Title</option>
            </select>
            <input type="text"
               name="serach" id="search"
               className={style.search}
               onChange={(e) => {
                  setSearchTerm(e.target.value)
               }} />
            <input type="submit" value="Search" />
         </form>
         <article className={style.searchResult}>
            {currentResult.map((book, i) =>
               <BookCard
                  book={book}
                  key={i} />
            )}
         </article>
         <Pagination
            paginate={paginate}
            perPage={perPage}
            totalPages={totalPages}
         />
      </section>
   );
};
