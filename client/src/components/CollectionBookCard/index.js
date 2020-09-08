import React from 'react'
import { getBookCoverByOLID } from '../../BooksApi'
export default function CollectionBookCard(props) {
    return (
        <div className={"kk"}>
            <button onClick={() => props.removeFromCollection(props.book.olid)}>
                <span>&#10006;</span>
            </button>
            <h3>{props.book.title}</h3>
            <h4>{props.book.author}</h4>
            <img src={getBookCoverByOLID(props.book.olid)} alt={props.book.title} />
        </div>
    )
}
// className={style.cover_img}