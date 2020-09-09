import React, { useState, useContext, useRef } from "react";
import * as style from "./CollectionHeader.module.scss";
import { CollectionContext } from "../../context/Collections";
import ConfirmPopUp from "../PopUps/ConfirmPopUp";

export default function CollectionHeader(props) {
  const { name, collectionId } = props;
  const { renameCollection, deleteCollection } = useContext(CollectionContext);
  const [renameBtn, setRenameBtn] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const newName = useRef(name);

  const confirm = (response) => {
    if (response) deleteCollection(collectionId);
    setToDelete(false);
  };

  return (
    <div className={style.collection_header}>
      <h2
        ref={newName}
        contentEditable={renameBtn}
        className={renameBtn ? style.editable : ""}
      >
        {name}
      </h2>

      {!renameBtn ? (
        <button
          onClick={() => {
            setRenameBtn(!renameBtn);
            if (newName.current.innerText !== name)
              renameCollection(collectionId, newName.current.innerText);
          }}
        >
          Rename
        </button>
      ) : (
        <button
          className={style.saveBtn}
          onClick={() => {
            setRenameBtn(!renameBtn);
            if (newName.current.innerText !== name)
              renameCollection(collectionId, newName.current.innerText);
          }}
        >
          Save
        </button>
      )}

      <button
        title="Will delete the whole collection"
        className={style.deleteBtn}
        onClick={() => {
          setToDelete(!toDelete);
        }}
      >
        Delete
      </button>
      {toDelete ? (
        <ConfirmPopUp
          message="You sure you want to delete the collection?"
          confirm={confirm}
        />
      ) : (
        ""
      )}
    </div>
  );
}
