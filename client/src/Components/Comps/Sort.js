import React from "react";

const Sort = (array, el, check) => {
  return array.sort((a, b) => {
    if (typeof a[el] === "string") {
      let arrayA = a[el].toUpperCase();
      let arrayB = b[el].toUpperCase();
      if (arrayA > arrayB) {
        return 1;
      }
      if (arrayA < arrayB) {
        return -1;
      }
      return 0;
    } else {
      return a - b;
    }
  });
};

export default Sort;
