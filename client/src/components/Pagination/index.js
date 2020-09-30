import React from "react";
import { NavLink } from "react-router-dom";
import "./Pagination.scss";

export default function Pagination(props) {
  const { perPage, totalBooks, paginate } = props;
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(totalBooks / perPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <ul className="paginationContainer">
      {pageNumbers.map((num) => (
        <li key={num} className="page">
          <NavLink
            to={"/" + num}
            onClick={() => paginate(num)}
            className="pageBtn"
            activeClassName="active"
          >
            {num}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
