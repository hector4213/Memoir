import React from "react";
import "./GoToStoryButton.scss";
import { useParams, Link } from "react-router-dom";

import Button from "../../../templates/Button/Button";

const GoToStoryButton = () => {
  const { storyId } = useParams();

  return (
    <Link to={`/story/${storyId}`}>
      <Button
        {...{
          label: "Back to Story",
          transparent: true,
          extraClass: "gotostory-btn",
        }}
      />
    </Link>
  );
};

export default GoToStoryButton;
