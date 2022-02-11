import React from "react";
import TimelineCard from "./TimelineCard";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Entry Card Directions",
};

const Template = (args) => <TimelineCard {...args} />;

export const TopEntryCard = Template.bind({});
TopEntryCard.args = {
  position: "top",
  entry: {
    format_id: 4,
    embed: "https://pbs.twimg.com/media/DeX8EoFWkAAx8Db.jpg",
    title: "something",
    date: "January 1, 2010",
    description: "something",
    id: 1,
    story_id: 10,
  },
};

export const LeftEntryCard = Template.bind({});
LeftEntryCard.args = {
  position: "left",
  entry: {
    format_id: 4,
    embed: "https://pbs.twimg.com/media/DeX8EoFWkAAx8Db.jpg",
    title: "something",
    date: "January 1, 2010",
    description: "something",
    id: 1,
    story_id: 10,
  },
};

export const RightEntryCard = Template.bind({});
RightEntryCard.args = {
  position: "right",
  entry: {
    format_id: 4,
    embed: "https://pbs.twimg.com/media/DeX8EoFWkAAx8Db.jpg",
    title: "something",
    date: "January 1, 2010",
    description: "something",
    id: 1,
    story_id: 10,
  },
};

export const BottomEntryCard = Template.bind({});
BottomEntryCard.args = {
  position: "bottom",
  entry: {
    format_id: 4,
    embed: "https://pbs.twimg.com/media/DeX8EoFWkAAx8Db.jpg",
    title: "something",
    date: "January 1, 2010",
    description: "something",
    id: 1,
    story_id: 10,
  },
};
