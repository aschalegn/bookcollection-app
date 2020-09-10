const getApiSearchUrl = (searchMethod, searchTerm) =>
  `http://openlibrary.org/search.json?${searchMethod}=${searchTerm}`;

export const getBookCoverByOLID = (olid) =>
  `http://covers.openlibrary.org/b/olid/${olid}-M.jpg`;

export const noCoverAvaillable =
  "https://cdn.shoplightspeed.com/shops/608154/files/22146758/image.jpg";

export const searchBooks = (searchMethod = "q", searchTerm = "") => {
  return fetch(getApiSearchUrl(searchMethod, searchTerm)).then((r) => r.json());
};
