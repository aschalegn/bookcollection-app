import React from 'react';
import * as style from './Pagination.module.scss';

export default function Pagination({ perPage, totalPages, paginate }) {
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(totalPages / perPage); i++) {
        pageNumbers.push(i+1);
    }

    return (
        <ul className={style.pagination_container}>
            {pageNumbers.map(num =>
                <li key={num} className={style.page}>
                    <a onClick={() => paginate(num)}>{num}</a>
                </li>
            )}
        </ul>
    )
}
