import React from 'react'
import StoryCard from './StoryCard'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'Story Card'
}

const Template = (args) => <StoryCard {...args} />

export const Person = Template.bind({})

const specialStyle = {
    background: '#020115',
    color: '#8397DF',
    'font-family':'Helvetica, Arial',
}

Person.args = {
    imageUrl: 'https://ae01.alicdn.com/kf/HTB1CrSDaxrvK1RjSszeq6yObFXaI/6x6ft-Incredibles-Red-Rainbow-Baby-Jack-Custom-Photo-Studio-Seamless-Background-Backdrop-Vinyl-180cm-x-180cm.jpg',
    name: 'Jack Jack',
    occupation: 'The Incredibles',
    specialStyle: specialStyle
}