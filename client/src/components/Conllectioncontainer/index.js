import React, { useState, useContext, useRef } from 'react';
import * as style from './Conllectioncontainer.module.scss';
import { getBookCoverByOLID } from '../../BooksApi'
import { CollectionContext } from '../../context/Collections';

export default function CollectionContainer(props) {
    const { collectionDispach } = useContext(CollectionContext);
    const [renameBtn, setRenameBtn] = useState(false);
    const [editClass, setEditClass] = useState('')
    const newName = useRef(props.collection.name)

    //*Remove Collection 
    const removeFromCollection = (olid) => {
        collectionDispach({
            type: "REMOVE_FROM_COLLECTION",
            payload: { name: props.collection.name, olid: olid }
        });
    }

    const deleteCollection = () => {
        collectionDispach({
            type: "DELETE_COLLECTION",
            payload: props.collection.name
        });
    }

    const renameCollection = () => {
        if (newName.current.innerText !== props.collection.name) {
            collectionDispach({
                type: "RENAME_COLLECTION",
                payload: { name: props.collection.name, newName: newName.current.innerText }
            });
        }
    }

    return (
        <div>
            <div className={style.collection_header}>
                <h2 ref={newName} contentEditable={renameBtn} className={editClass}>{props.collection.name}</h2>
                {renameBtn ?
                    <button onClick={renameCollection}>Edit </button>
                    : ''}
                <button className={style.btn}
                    onClick={() => {
                        setRenameBtn(!renameBtn);
                        setEditClass('editable')
                    }}
                >Rename
                </button>
                <button className={style.btn}
                    onClick={deleteCollection}>
                    delete <span>&#10006;</span>
                </button>
            </div>
            <article className={style.books_container}>
                {
                    props.collection.books.length ? props.collection.books.map((book, i) =>
                        <div key={i} className={style.book_container}>
                            <button onClick={() => removeFromCollection(book.olid)}>
                                <span>&#10006;</span>
                            </button>
                            <h3>{book.title}</h3>
                            <h4>{book.author}</h4>
                            <img src={getBookCoverByOLID(book.olid)} alt={book.title} className={style.cover_img} />
                        </div>
                    )
                        : <p>No books in the collection</p>
                }
            </article>
        </div>
    )
}
