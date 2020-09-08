import React, { useState, useContext, useRef } from 'react'
import * as style from './CollectionHeader.module.scss';

export default function CollectionHeader(props) {
    const [renameBtn, setRenameBtn] = useState(false);
    const [editClass, setEditClass] = useState('');
    // const newName = useRef(props.collection.name)

    return (
        <div className={style.collection_header}>
            <h2 ref={props.newName} contentEditable={renameBtn} className={editClass}>{props.name}</h2>
            {renameBtn ?
                <button onClick={props.renameCollection}>Edit </button>
                : ''}
            <button className={""}
                onClick={() => {
                    setRenameBtn(!renameBtn);
                    setEditClass('editable')
                }}
            >Rename
            </button>
            <button className={""}
                onClick={props.deleteCollection}>
                delete <span>&#10006;</span>
            </button>
        </div>
    )
}
