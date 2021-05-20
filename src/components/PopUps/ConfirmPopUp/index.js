import React from "react";
import * as style from "./ConfirmPopUp.module.scss";

export default function ConfirmPopUp(props) {
  const { message, confirm } = props;
  return (
    <div className={style.confirmContainer}>
      <h2>{message}</h2>
      <button onClick={() => confirm(true)}>Ok</button>
      <button onClick={() => confirm(false)}>Cancel</button>
    </div>
  );
}
