import React from "react";
import { Dropdown } from "semantic-ui-react";

const SearchDropDown = (props) => {
  return (
    <>
      <Dropdown {...props} fluid search selection />
    </>
  );
};

export default SearchDropDown;
