import React from 'react'
import TimelineCard from './TimelineCard'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'Entry Card Media Types'
}

const Template = (args) => <TimelineCard {...args} />

export const TextEntryCard = Template.bind({})
TextEntryCard.args = {
    position: 'left',
    mediaType: 'text',
    title: 'Kiki\'s Delivery Service',
    date: 'January 1, 1989',
    description: 'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.'
}

export const PictureEntryCard = Template.bind({})
PictureEntryCard.args = {
    position: 'left',
    mediaType: 'picture',
    mediaUrl: 'https://tinyurl.com/y5nbt4ks',
    title: 'Kiki\'s Delivery Service',
    date: 'January 1, 1989',
    description: 'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.'
}

export const VideoEntryCard = Template.bind({})
VideoEntryCard.args = {
    position: 'left',
    mediaType: 'video',
    mediaUrl: '<iframe width="560" height="315" src="https://www.youtube.com/embed/4bG17OYs-GA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    title: 'Kiki\'s Delivery Service',
    date: 'January 1, 1989',
    description: 'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.'
}

export const SoundEntryCard = Template.bind({})
SoundEntryCard.args = {
    position: 'left',
    mediaType: 'sound',
    mediaUrl: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/320229758&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>',
    title: 'Kiki\'s Delivery Service',
    date: 'January 1, 1989',
    description: 'A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.'
}