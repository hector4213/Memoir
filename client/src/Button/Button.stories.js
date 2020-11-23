import React from 'react'
import Button from './Button'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'Button',
    argTypes: {
        backgroundColor: { control: 'color' },
        onClick: { action: 'clicked' },
    },
}

const Template = (args) => <Button {...args} />

// created buttons

export const Primary = Template.bind({})
Primary.args = {
    primary: true,
    label: 'This is a Button',
    backgroundColor: '#B6ACE6',
}

export const Seconday = Template.bind({})
Seconday.args = {
    primary: false,
    label: 'This is Not A Button'
}