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
  const [collections, collectionDispach] = useReducer(
    collectionReducer,
    initialState
  );

  //Create Collection
  const createCollection = (collectionName) => {
    collectionDispach({
      type: "CREATE_COLLECTION",
      payload: { name: collectionName, books: [], id: uuidv4() },
    });
  };

  //Remove from Collection
  const removeFromCollection = (collectionId, olid) => {
    if (window.confirm("You sure you want to remove from collection?")) {
      collectionDispach({
        type: "REMOVE_FROM_COLLECTION",
        payload: { id: collectionId, olid: olid },
      });
    }
  };

  //Remove Collection
  const deleteCollection = (collectionId) => {
    if (window.confirm("You sure you want to delete the collection?")) {
      collectionDispach({
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
    collectionDispach({
      type: "ADD_TO_COLLECTION",
      payload: {
        id: collectionId,
        title: title,
        author: author,
        olid: olid,
      },
    });
  };

  const renameCollection = (collectionId, newName) => {
    collectionDispach({
      type: "RENAME_COLLECTION",
      payload: { id: collectionId, newName: newName },
    });
  };

  return (
    <CollectionContext.Provider
      value={{
        collections,
        collectionDispach,
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
