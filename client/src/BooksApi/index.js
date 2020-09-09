const getApiSearchUrl = (searchMethod, searchTerm) =>
  `http://openlibrary.org/search.json?${searchMethod}=${searchTerm}`;

export const getBookCoverByOLID = (olid) =>
  `http://covers.openlibrary.org/b/olid/${olid}-M.jpg`;

const getBookInfoBuOLID = (olid) =>
  `http://openlibrary.org/api/books?bibkeys=OLID:${olid}&jscmd=data`;

export const noCoverAvaillable =
  "https://cdn.shoplightspeed.com/shops/608154/files/22146758/image.jpg";

export const searchBooks = (searchMethod = "q", searchTerm = "") => {
  return fetch(getApiSearchUrl(searchMethod, searchTerm)).then((r) => r.json());
};

export const getBookInfo = (olid = "") => {
  return fetch(getBookInfoBuOLID(olid)).then((r) => r.text());
};
