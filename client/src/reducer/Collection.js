export const collectionReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CREATE_COLLECTION":
      state = {
        ...state,
        collection: [...state.collection, payload],
      };
      break;
    case "DELETE_COLLECTION":
      state = {
        ...state,
        collection: state.collection.filter((col) => col.id !== payload),
      };
      break;
    case "RENAME_COLLECTION":
      console.log({ payload });
      state = {
        ...state,
        collection: state.collection.map((col) => {
          if (col.id === payload.id) return { ...col, name: payload.newName };
          else return col;
        }),
      };
      break;
    case "ADD_TO_COLLECTION":
      state = {
        ...state,
        collection: state.collection.map((col) => {
          if (col.id === payload.id)
            return {
              ...col,
              books: [
                ...col.books,
                {
                  title: payload.title,
                  author: payload.author,
                  olid: payload.olid,
                  cover: payload.cover,
                },
              ],
            };
          else return col;
        }),
      };
      break;
    case "REMOVE_FROM_COLLECTION":
      state = {
        ...state,
        collection: state.collection.map((col) => {
          if (col.id === payload.id) {
            return {
              ...col,
              books: col.books.filter(
                (book) => book.olid[0] !== payload.olid[0]
              ),
            };
          } else return col;
        }),
      };
      break;
    case "MOVE_FROM_COLLECTION_TO_COLLECTION":
      state = {
        ...state,
        collection: state.collection.map((col) => {
          if (col.id === payload.from) {
            return {
              ...col,
              books: col.books.filter(
                (book) => book.olid[0] !== payload.book.olid[0]
              ),
            };
          }
          if (col.id === payload.to) {
            return {
              ...col,
              books: [
                ...col.books,
                {
                  title: payload.book.title,
                  author: payload.book.author,
                  olid: payload.book.olid,
                  cover: payload.book.cover,
                },
              ],
            };
          } else return col;
        }),
      };
      break;
    default:
      break;
  }

  localStorage.collection = JSON.stringify(state.collection);
  return state;
};
