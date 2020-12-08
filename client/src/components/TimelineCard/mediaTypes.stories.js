import React from 'react'
import TimelineCard from './TimelineCard'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'Entry Card Media Types'
}

const Template = (args) => <TimelineCard {...args} />

export const VideoEntryCard = Template.bind({})
VideoEntryCard.args = {
    position: 'left',
    entry: {
        format_id: 1,
        embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/u21W_tfPVrY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        title: 'something',
        date: 'January 1, 2010',
        description: 'something',
        id: 1,
        story_id: 10
    }
}

export const TextEntryCard = Template.bind({})
TextEntryCard.args = {
    position: 'left',
    entry: {
        format_id: 2,
        title: 'something',
        date: 'January 1, 2010',
        description: 'something',
        id: 1,
        story_id: 10
    }
}

export const AudioEntryCard = Template.bind({})
AudioEntryCard.args = {
    position: 'left',
    entry: {
        format_id: 3,
        embed: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/850019068&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>',
        title: 'something',
        date: 'January 1, 2010',
        description: 'something',
        id: 1,
        story_id: 10
    }
}

export const ImageEntryCard = Template.bind({})
ImageEntryCard.args = {
    position: 'left',
    entry: {
        format_id: 4,
        embed: 'https://pbs.twimg.com/media/DeX8EoFWkAAx8Db.jpg',
        title: 'something',
        date: 'January 1, 2010',
        description: 'something',
        id: 1,
        story_id: 10
    }
}