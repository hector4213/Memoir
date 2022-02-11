import React, { useCallback } from "react";
import "./GoToProfileButton.scss";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";
import Button from "../../../templates/Button/Button";

const GoToProfileButton = (props) => {
  const { user } = props;
  const history = useHistory();
  const goProfile = useCallback(() => history.push(`/profile`), [history]);

  if (!user) {
    return <div></div>;
  }

  return (
    <Button
      {...{
        label: `${user.username}'s Profile`,
        transparent: true,
        extraClass: "profile-btn",
        onClick: goProfile,
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.profile.user,
  };
};
export default connect(mapStateToProps)(GoToProfileButton);
