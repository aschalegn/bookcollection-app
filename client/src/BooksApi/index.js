const getApiSearchUrl = (method, searchTerm) =>
  `http://openlibrary.org/search.json?${method}=${searchTerm}`;

export const getBookCoverByOLID = (olid) =>
  `http://covers.openlibrary.org/b/olid/${olid}-M.jpg`;

const getBookInfoBuOLID = (olid) =>
  `http://openlibrary.org/api/books?bibkeys=OLID:${olid}&jscmd=data`;

export const searchBooks = (method = "q", searchTerm = "") => {
  console.log({ method, searchTerm });
  return fetch(getApiSearchUrl(searchTerm, method)).then((r) => r.json());
};

export const getBookInfo = (olid = "") => {

  return fetch(getBookInfoBuOLID(olid)).then((r) => r.text());
};
