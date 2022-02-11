import Button from "./Button";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Buttons",
  argTypes: {
    onClick: { action: "clicked" },
  },
};

const Template = (args) => <Button {...args} />;

// created buttons

export const Transparent = Template.bind({});
Transparent.args = {
  label: "Transparent Button",
  transparent: true,
};

export const Non_Transparent = Template.bind({});
Non_Transparent.args = {
  label: "Non-Transparent Button",
  transparent: false,
};

export const Red = Template.bind({});
Red.args = {
  label: "This is a delete button",
  transparent: true,
  red: true,
};

export const Green = Template.bind({});
Green.args = {
  label: "This is a delete button",
  transparent: true,
  green: true,
};
