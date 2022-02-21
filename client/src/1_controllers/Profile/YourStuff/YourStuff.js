import React, { useEffect } from "react";
import "./YourStuff.scss";
import YourStories from "./YourStories/YourStories";
import YourEntries from "./YourEntries/YourEntries";
import { connect } from "react-redux";

import { getMyProfileStuffAction } from "../../../redux/actions/profile";
import { clearCurrentAction } from "../../../redux/actions/page";

const YourStuff = (props) => {
  const { getMyProfileStuff, clearCurrent } = props;

  useEffect(() => {
    getMyProfileStuff();
    clearCurrent();
  }, [clearCurrent, getMyProfileStuff]);

  return (
    <div className="yourStuff">
      <YourStories />
      <YourEntries />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyProfileStuff: () => dispatch(getMyProfileStuffAction()),
    clearCurrent: () => dispatch(clearCurrentAction()),
  };
};

export default connect(null, mapDispatchToProps)(YourStuff);
