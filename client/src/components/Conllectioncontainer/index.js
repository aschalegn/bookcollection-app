import React, { useContext, useRef } from 'react';
import * as style from './Conllectioncontainer.module.scss';
import { CollectionContext } from '../../context/Collections';
import CollectionBookCard from '../CollectionBookCard';
import CollectionHeader from '../CollectionHeader';

export default function CollectionContainer({ collection }) {
    const { collectionDispach } = useContext(CollectionContext);

    const newName = useRef(collection.name)

    //*Remove Collection 
    const removeFromCollection = (olid) => {
        collectionDispach({
            type: "REMOVE_FROM_COLLECTION",
            payload: { name: collection.name, olid: olid }
        });
    }

    const deleteCollection = () => {
        collectionDispach({
            type: "DELETE_COLLECTION",
            payload: collection.name
        });
    }

    const renameCollection = () => {
        if (newName.current.innerText !== collection.name) {
            collectionDispach({
                type: "RENAME_COLLECTION",
                payload: { prevName: collection.name, newName: newName.current.innerText }
            });
        }
    }

    return (
        <>
            <CollectionHeader
                name={collection.name}
                renameCollection={renameCollection}
                deleteCollection={deleteCollection}
                newName={newName}
            />
            <article className={style.books_container}>
                {
                    collection.books.length ? collection.books.map((book, i) =>
                        <CollectionBookCard
                            book={book}
                            key={i}
                            removeFromCollection={removeFromCollection}
                        />
                    )
                        : <p>No books in the collection</p>
                }
            </article>
        </>
    );
}