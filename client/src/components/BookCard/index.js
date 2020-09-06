import React from 'react'
import * as style from './BookCard.module.scss'
import { getBookCoverByOLID, getBookInfo } from '../../BooksApi';

export default function BookCard(props) {
    getBookInfo(props.book.edition_key[0])
        .then(res => { console.log(res); })
    return (
        <div>
            <h2>{props.book.title} by</h2>
            {props.book.author_name ? props.book.author_name.map((author, i) =>
                <h2 key={i}><small> {author}</small></h2>
            ) : ''}
            <img src={getBookCoverByOLID(props.book.edition_key[1] || props.book.edition_key[0])} />
            <button className={style.add_btn}><span>&#43;</span></button>
        </div>
    )
}
