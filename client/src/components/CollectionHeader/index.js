import React, { useState, useContext, useRef } from "react";
import * as style from "./CollectionHeader.module.scss";
import { CollectionContext } from "../../context/Collections";

export default function CollectionHeader(props) {
  const { name, collectionId } = props;
  const { renameCollection, deleteCollection } = useContext(CollectionContext);
  const [renameBtn, setRenameBtn] = useState(false);
  const newName = useRef(name);

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
        onClick={() => deleteCollection(collectionId)}
      >
        Delete
      </button>
    </div>
  );
}
