import StoryCardTemplate from "./StoryCardTemplate";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Story Card Template",
};

const Template = (args) => <StoryCardTemplate {...args} />;

export const Card = Template.bind({});
Card.args = {
  story: {
    story_img:
      "https://pbs.twimg.com/profile_images/1029816770897408000/aUljTnyv.jpg",
    name: "Mega Man",
    occupation: "Marvel vs Capcom",
  },
};
