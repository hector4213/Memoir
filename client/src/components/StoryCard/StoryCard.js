import React from "react";
import "./StoryCard.scss";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { HiOutlineXCircle } from "react-icons/hi";
import { deleteStoryAction } from "../../redux/actions/story";
import StoryCardTemplate from "../../templates/StoryCardTemplate/StoryCardTemplate";

const StoryCard = ({ story, specialStyle, deleteCard, deleteStory }) => {
  if (!story) return <div />;

  return (
    <Link
      to={`/story/${story.id}`}
      className="storyCard"
      style={specialStyle}
      name={story.name}
    >
      <div className="storyCard" name={story.name} style={specialStyle}>
        {deleteCard ? (
          <div
            className="delete"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              if (
                // eslint-disable-next-line no-restricted-globals
                confirm(
                  `Are you sure you want to delete ${story.name}'s story?`
                )
              ) {
                await deleteStory(story.id);
              }
            }}
          >
            <HiOutlineXCircle name="delete-btn" />
          </div>
        ) : (
          ""
        )}

        <StoryCardTemplate story={story} />
      </div>
    </Link>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStory: (storyId) => dispatch(deleteStoryAction(storyId)),
  };
};

export default connect(null, mapDispatchToProps)(StoryCard);
