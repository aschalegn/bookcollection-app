import React, { useState, useContext, useRef } from "react";
import * as style from "./CollectionHeader.module.scss";
import { CollectionContext } from "../../context/Collections";

export default function CollectionHeader(props) {
  const { name, deleteCollection } = props;
  const { renameCollection } = useContext(CollectionContext);
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
      <button
        onClick={() => {
          setRenameBtn(!renameBtn);
          if (newName.current.innerText !== name) renameCollection();
        }}
      >
        {!renameBtn ? "Rename" : "Save"}
      </button>

      <button className={style.deleteBtn} onClick={deleteCollection}>
        Delete
        <span>&#10006;</span>
      </button>
    </div>
  );
}
