import React, { useState, useEffect } from 'react';
import * as style from './ResultFilter.module.scss';

export default function ResultFilter(props) {
    const { setFilteredResult, searchResult } = props;

    const [minYear, setMinYear] = useState(Number.MAX_SAFE_INTEGER)
    const [maxYear, setMaxYear] = useState(Number.MIN_SAFE_INTEGER)
    const [from, setFrom] = useState(minYear);
    const [to, setTo] = useState(maxYear);
    const [filterTitle, setFilterTitle] = useState(maxYear);


    useEffect(() => {
        setTimeout(() => {
            filterByYear();
        }, 1000);
    }, [filterTitle, from, to]);

    for (let i = 0; i < searchResult.length; i++) {
        const book = searchResult[i];
        if (book.publish_year) {
            if (book.publish_year[0] < minYear) {
                setMinYear(book.publish_year[0])
                setFrom(book.publish_year[0])
            }
            if (book.publish_year[0] > maxYear) {
                setMaxYear(book.publish_year[0])
                setTo(book.publish_year[0])
            }
        }
    }

    const filterByYear = () => {
        if (filterTitle.length >= 2) {
            combinedFilter();
        } else {
            const filtered = searchResult.filter(book => {
                if (book.publish_year) {
                    if (book.publish_year[0] >= from & book.publish_year[0] <= to) {
                        return book
                    }
                }
            })
            setFilteredResult(filtered)
        }
    }

    const combinedFilter = () => {
        let reg = new RegExp(`^${filterTitle}`, 'i')
        const filtered = searchResult.filter(book => {
            if (reg.test(book.title)) {
                if (book.publish_year) {
                    if (book.publish_year[0] >= from & book.publish_year[0] <= to) {
                        return book
                    }
                }
            }
        })
        setFilteredResult(filtered)
    }

    return (
        <form onSubmit={(e) => { e.preventDefault() }}>
            <label className={style.label} htmlFor="title">Filter by title: </label> 
            <input type="text" name="title" id="title" placeholder="Filter by title" className={style.title} onChange={(e) => {
                setFilterTitle(e.target.value);
            }} />
            <label className={style.label} htmlFor="from_date"> Min Year: {minYear}</label>
            <input type="range" name="from_date" id="from_date" min={minYear} max={maxYear} value={from} onChange={(e) => {
                setFrom(Number(e.target.value));
            }} />
            <label className={style.label} htmlFor="to_date"> Max Year: {maxYear} </label>
            <input type="range" name="to_date" id="to_date" min={minYear} max={maxYear} value={to} onChange={(e) => {
                setTo(Number(e.target.value));
            }} />
        </form>
    )
}
