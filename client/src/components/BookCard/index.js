import React, { useState, useContext, Fragment } from 'react'
import * as style from './BookCard.module.scss'
import { getBookCoverByOLID, getBookInfo } from '../../BooksApi';
import { CollectionContext } from '../../context/Collections';

export default function BookCard(props) {
    const { collections, collectionDispach } = useContext(CollectionContext);
    const [addBtn, setAddBtn] = useState(false);
    const [newCollection, setNewCollection] = useState(false)
    const [collectionName, setCollectionName] = useState('');

    //add to collection
    const addToCollection = () => {
        collectionDispach({
            type: "ADD_TO_COLLECTION",
            payload: {
                name: collectionName,
                title: props.book.title,
                author: props.book.author_name ? props.book.author_name : "No author found",
                olid: props.book.edition_key
            }
        });
    }

    //create new collection
    const createCollection = () => {
        collectionDispach({
            type: "CREATE_COLLECTION",
            payload: { name: collectionName, books: [] },
        });
    }

    return (
        <div>
            <h2>{props.book.title}</h2>
            {props.book.author_name ? props.book.author_name.map((author, i) =>
                <h2 key={i}><small> {author}</small></h2>
            ) : ''}
            <img src={getBookCoverByOLID(props.book.edition_key[1] || props.book.edition_key[0])} />
            <button className={style.add_btn} onClick={() => setAddBtn(!addBtn)}><span>&#43;</span></button>

            {/* user desided to add to collection */}
            {addBtn ?
                <Fragment>
                    {collections.collection.length > 0 ?
                        <Fragment>
                            <select name="collection" id="" onChange={(e) => { setCollectionName(e.target.value) }}>
                                <option value="">Select Collection</option>
                                {collections.collection.map((col, i) =>
                                    <option value={col.name} key={i}>{col.name}</option>
                                )}
                            </select>
                            <button onClick={addToCollection}>Add</button>
                        </Fragment>
                        : <p>No collections</p>
                    }
                    <p onClick={() => {
                        setNewCollection(!newCollection);
                    }}>Add New <span>&#10010;</span></p>
                    {/* user desided to create new collection */}
                    {newCollection ?
                        <Fragment>
                            <input type="text" name="addNewCollection" id=""
                                onChange={(e) => setCollectionName(e.target.value)} />
                            <button onClick={createCollection}>Create</button>
                        </Fragment>
                        : ''
                    }
                </Fragment>
                : ''}
        </div>
    )
}
