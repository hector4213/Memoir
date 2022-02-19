import React, { useState } from "react";
import "./ProfileEdit.scss";

import { connect } from "react-redux";
import { editProfileAction } from "../../redux/actions/profile";
import { deleteProfileAction } from "../../redux/actions/profile";
import Button from "../../templates/Button/Button";
import { useNavigate } from "react-router-dom";

const ProfileEdit = ({ user, editProfile, deleteProfile }) => {
  let navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({
    username: user.username,
    email: user.email,
  });

  function handleSubmit(e) {
    e.preventDefault();
    const final = { ...user, ...profileForm };
    editProfile(final);
  }

  async function delete_profile(e) {
    e.preventDefault();
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(`Are you sure you want to delete ${user.username}'s story?`)
    ) {
      const deleted = await deleteProfile();
      if (deleted) navigate("/");
    }
  }

  return (
    <div className="profile-edit">
      <h2>Profile Edit</h2>
      <form>
        <input
          type="text"
          value={profileForm.username}
          onChange={(e) => {
            e.preventDefault();
            setProfileForm({ ...profileForm, username: e.target.value });
          }}
        />

        <input
          type="text"
          value={profileForm.email}
          onChange={(e) => {
            e.preventDefault();
            setProfileForm({ ...profileForm, email: e.target.value });
          }}
        />

        <div className="profile-edit-buttons">
          <Button
            {...{
              label: "Submit",
              onClick: (e) => {
                e.preventDefault();
                handleSubmit(e);
              },
              transparent: false,
            }}
          />

          <Button
            {...{
              label: "Delete Profile",
              onClick: delete_profile,
              transparent: true,
              extraClass: "delete-profile",
              red: true,
            }}
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.profile.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (profileInfo) => dispatch(editProfileAction(profileInfo)),
    deleteProfile: (profileInfo) => dispatch(deleteProfileAction(profileInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
