import React from 'react'
import TimelineCard from './TimelineCard'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'Timeline Cards'
}

const Template = (args) => <TimelineCard {...args} />

export const MiddleTextEntryCard = Template.bind({})
MiddleTextEntryCard.args = {
    position: 'top',
    mediaType: 'text',
    title: 'Kiki\'s Delivery Service',
    date: 'January 1, 1989',
    description: 'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.'
}

export const LeftTextEntryCard = Template.bind({})
LeftTextEntryCard.args = {
    position: 'left',
    mediaType: 'text',
    title: 'Kiki\'s Delivery Service',
    date: 'January 1, 1989',
    description: 'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.'
}

export const RightTextEntryCard = Template.bind({})
RightTextEntryCard.args = {
    position: 'right',
    mediaType: 'text',
    title: 'Kiki\'s Delivery Service',
    date: 'January 1, 1989',
    description: 'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.'
}
