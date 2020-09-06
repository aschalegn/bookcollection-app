const getApiSearchUrl = (searchTerm) =>
  `http://openlibrary.org/search.json?q=${searchTerm}`;

export const getBookCoverByOLID = (olid) =>
  `http://covers.openlibrary.org/b/olid/${olid}-M.jpg`;

const getBookInfoBuOLID = (olid) =>
  `http://openlibrary.org/api/books?bibkeys=OLID:${olid}&jscmd=data`;

export const searchBooks = (searchTerm = "") => {
  return fetch(getApiSearchUrl(searchTerm)).then((r) => r.json());
};

export const getBookInfo = (olid = "") => {
  return fetch(getBookInfoBuOLID(olid)).then((r) => r.text());
};
