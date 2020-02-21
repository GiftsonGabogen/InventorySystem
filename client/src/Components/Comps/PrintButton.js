import React from "react";
import printjs from "print.js/src/index";
import "print.js/dist/print.min.css";

const PrintButton = props => {
  return (
    <button className="btn-sm btn-primary" onClick={() => printjs(props.element, props.type)}>
      print
    </button>
  );
};

export default PrintButton;
