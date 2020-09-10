import React, { useEffect } from "react";
import { getBookInfo } from "../../../BooksApi";

export default function BookInfoPopUp({ olid }) {
  const getInfo = () => {
    getBookInfo(olid).then((res) => {
      console.log(res);
    //   JSON.parse(res)
    });
  };
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      <h1>Book info pop up</h1>
    </div>
  );
}
