import React from 'react'
import TimelineCard from './TimelineCard'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'Entry Card Directions'
}

const Template = (args) => <TimelineCard {...args} />

export const TopEntryCard = Template.bind({})
TopEntryCard.args = {
    position: 'top',
    mediaType: 'text',
    title: 'Kiki\'s Delivery Service',
    date: 'January 1, 1989',
    description: 'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.'
}

export const LeftEntryCard = Template.bind({})
LeftEntryCard.args = {
    position: 'left',
    mediaType: 'text',
    title: 'Kiki\'s Delivery Service',
    date: 'January 1, 1989',
    description: 'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.'
}

export const RightEntryCard = Template.bind({})
RightEntryCard.args = {
    position: 'right',
    mediaType: 'text',
    title: 'Kiki\'s Delivery Service',
    date: 'January 1, 1989',
    description: 'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.'
}

export const BottomEntryCard = Template.bind({})
BottomEntryCard.args = {
    position: 'bottom',
    mediaType: 'text',
    title: 'Kiki\'s Delivery Service',
    date: 'January 1, 1989',
    description: 'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.'
}