import React from 'react';
import * as style from './Pagination.module.scss';

export default function Pagination(props) {
    const { perPage, totalPages, paginate, currentPage } = props;
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(totalPages / perPage); i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <ul className={style.pagination_container}>
            {/* {totalPages > 0 ?
                <>
                    <li className={style.arrow}><button>&#10096;</button></li>
                    <li className={style.arrow}>
                        <button onClick={(paginate)}>&#10097;</button></li>
                </>
                : ''
            } */}
            {
                pageNumbers.map(num =>
                    <li key={num} className={style.page}>
                        <a onClick={() => paginate(num)} className={style.page_btn}>{num}</a>
                    </li>
                )
            }

        </ul >
    )
}
