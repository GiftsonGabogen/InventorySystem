import React from "react";
import printjs from "print.js/src/index";
import "print.js/dist/print.min.css";
import css from "../../App.css";

const PrintButton = props => {
  let ignore = [];
  if (props.ignore !== undefined) {
    ignore = props.ignore;
  }
  console.log(ignore);
  return (
    <button
      className="btn-sm btn-success"
      onClick={() =>
        printjs({
          printable: props.element,
          type: props.type,
          header: props.header,
          scanStyles: true,
          css: css,
          ignoreElements: ignore
        })
      }
    >
      print
    </button>
  );
};

export default PrintButton;
