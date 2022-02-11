import React, { useCallback } from "react";
import "./GoToStoryButton.scss";
import { useHistory, useParams } from "react-router-dom";

import Button from "../../../templates/Button/Button";

const GoToStoryButton = (props) => {
  const { storyId } = useParams();

  const history = useHistory();

  const goToStory = useCallback(() => {
    const to = `/story/${storyId}`;
    history.push(to);
  }, [history, storyId]);

  return (
    <Button
      {...{
        label: "Back to Story",
        onClick: goToStory,
        transparent: true,
        extraClass: "gotostory-btn",
      }}
    />
  );
};

export default GoToStoryButton;
