import React, { useCallback } from "react";
import "./GoToEntryButton.scss";
import { useHistory, useParams } from "react-router-dom";

import Button from "../../../templates/Button/Button";

const GoToEntryButton = (props) => {
  const { storyId, entryId } = useParams();

  const history = useHistory();

  const goToEntry = useCallback(() => {
    const to = `/story/${storyId}/entry/${entryId}`;
    history.push(to);
  }, [history, storyId, entryId]);

  return (
    <Button
      {...{
        label: "Back to Entry",
        onClick: goToEntry,
        transparent: true,
        extraClass: "gotostory-btn",
      }}
    />
  );
};

export default GoToEntryButton;
