import React, { useCallback } from "react";
import "./ButtonsForStory.scss";

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { toggleModalAction } from "../../../redux/actions/page";

import Button from "../../../templates/Button/Button";
import GoToProfile from "../../../components/ButtonTypes/GoToProfileButton/GoToProfileButton";
import GoHomeButton from "../../../components/ButtonTypes/GoHomeButton/GoHomeButton";

const ButtonsForStory = (props) => {
  const { storyId, toggleModal, authorId, user, setCurrentModal } = props;
  const userId = user ? user.id : null;

  const history = useHistory();
  const gotoCreate = useCallback(
    () => history.push(`/story/${storyId}/addEntry`),
    [history, storyId]
  );

  return (
    <>
      <GoHomeButton />

      {user ? (
        <div className="story-buttons">
          <GoToProfile />

          <Button
            {...{
              label: "Add an Entry",
              transparent: true,
              green: true,
              onClick: gotoCreate,
            }}
          />

          {userId === authorId ? (
            <>
              <Button
                {...{
                  label: "Edit this Story",
                  transparent: true,
                  extraClass: "edit-story",
                  onClick: (e) => {
                    e.preventDefault();
                    setCurrentModal("storyedit");
                    toggleModal();
                  },
                }}
              />
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <Button
          {...{
            label: "Create your own stories and entries",
            transparent: true,
            extraClass: "story-login-btn",
            onClick: (e) => {
              e.preventDefault();
              setCurrentModal("login");
              toggleModal();
            },
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.profile.user,
    authorId: state.page.current.story.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(toggleModalAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsForStory);
