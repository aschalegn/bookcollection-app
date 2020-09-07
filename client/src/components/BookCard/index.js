import React, { useState, useContext, Fragment } from 'react'
import * as style from './BookCard.module.scss'
import { getBookCoverByOLID, getBookInfo } from '../../BooksApi';
import { CollectionContext } from '../../context/Collections/Collction';

export default function BookCard(props) {
    const { collectionDispach, collections } = useContext(CollectionContext);
    const [addToCallction, setAddToCallction] = useState(false);
    const [newCollection, setNewCollection] = useState(false)
    const [collectionName, setCollectionName] = useState('');

    const addToCollection = (e) => {
        collectionDispach({
            type: "ADD_TO_COLLECTION",
            payload: {
                name: collectionName,
                title: props.book.title,
                author: props.book.author_name ? props.book.author_name : "No author found",
                cover: '',
            }
        });
    }

    const createCollection = (e) => {
        e.preventDefault();
        collectionDispach({
            type: "CREATE_COLLECTION",
            payload: { name: collectionName, books: [] },
        });
    }

    return (
        <div>
            <h2>{props.book.title} by</h2>
            {props.book.author_name ? props.book.author_name.map((author, i) =>
                <h2 key={i}><small> {author}</small></h2>
            ) : ''}
            <img src={getBookCoverByOLID(props.book.edition_key[1] || props.book.edition_key[0])} />
            <button className={style.add_btn} onClick={() => setAddToCallction(!addToCallction)}><span>&#43;</span></button>
            {addToCallction ?
                <Fragment>
                    {collections.collection.length > 0 ?
                        <Fragment>
                            <select name="collection" id="" onChange={(e) => { setCollectionName(e.target.value) }}>
                                <option value="">Select Collection</option>
                                {collections.collection.map((collection, i) =>
                                    <option value={collection.name} key={i}>{collection.name}</option>
                                )}
                            </select>
                            <button onClick={addToCollection}>Create</button>
                        </Fragment>
                        : <p>No collections</p>
                    }
                    <p onClick={() => {
                        setNewCollection(!newCollection);
                    }}>Add new Collection</p>
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
