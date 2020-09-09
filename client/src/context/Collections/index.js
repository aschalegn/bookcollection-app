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
    if (window.confirm("You sure you want to delete the collection?")) {
      dispatch({
        type: "DELETE_COLLECTION",
        payload: collectionId,
      });
    }
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
    if (window.confirm("You sure you want to remove from collection?")) {
      dispatch({
        type: "REMOVE_FROM_COLLECTION",
        payload: { id: collectionId, olid: olid },
      });
    }
  };

  //* collection to collection
  const moveFromCollectionToCollection = (from, to, olid) => {
    dispatch({
      type: "MOVE_FROM_COLLECTION_TO_COLLECTION",
      payload: { from, to, olid },
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
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
}
