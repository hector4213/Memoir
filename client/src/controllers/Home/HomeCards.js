import React from "react";
import "./HomeCards.scss";

import StoryCard from "../../components/StoryCard/StoryCard";

const HomeCards = (props) => {
  const { stories } = props;

  let cards = [];

  if (stories) {
    stories.forEach((story, i) => {
      cards.push(
        <StoryCard
          {...{
            key: i,
            story: story,
          }}
        />
      );
    });
  }

  if (cards.length === 0) {
    return (
      <div className="loader">
        {" "}
        <div className="hi" />{" "}
      </div>
    );
  }

  return <div className="storyCards">{cards}</div>;
};

export default HomeCards;
