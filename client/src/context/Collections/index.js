import React, { createContext, useReducer } from "react";
import { collectionReducer } from "../../reducer/Collection";
import { v4 as uuidv4 } from "uuid";
export const CollectionContext = createContext();

export default function CollctionProvider(props) {
  const initialState = {
    collection: localStorage.collection
      ? JSON.parse(localStorage.collection)
      : [],
  };
  const [collections, dispatch] = useReducer(collectionReducer, initialState);

  //Create Collection
  const createCollection = (collectionName) => {
    dispatch({
      type: "CREATE_COLLECTION",
      payload: { name: collectionName, books: [], id: uuidv4() },
    });
  };

  const renameCollection = (collectionId, newName) => {
    dispatch({
      type: "RENAME_COLLECTION",
      payload: { id: collectionId, newName },
    });
  };

  //*Remove Collection
  const deleteCollection = (collectionId) => {
    dispatch({
      type: "DELETE_COLLECTION",
      payload: collectionId,
    });
  };

  const addToCollection = (
    collectionId,
    title,
    author = "No author found",
    olid
  ) => {
    dispatch({
      type: "ADD_TO_COLLECTION",
      payload: {
        id: collectionId,
        title,
        author,
        olid,
      },
    });
  };

  //*Remove from Collection
  const removeFromCollection = (collectionId, olid) => {
    dispatch({
      type: "REMOVE_FROM_COLLECTION",
      payload: { id: collectionId, olid: olid },
    });
  };

  //* collection to collection
  const moveFromCollectionToCollection = (from, to, book) => {
    dispatch({
      type: "MOVE_FROM_COLLECTION_TO_COLLECTION",
      payload: { from, to, book },
    });
  };

  return (
    <CollectionContext.Provider
      value={{
        collections,
        removeFromCollection,
        createCollection,
        deleteCollection,
        addToCollection,
        renameCollection,
        moveFromCollectionToCollection,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
}
