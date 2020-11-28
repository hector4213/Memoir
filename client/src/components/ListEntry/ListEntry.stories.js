import React from 'react'
import ListEntry from './ListEntry'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'List Entry'
}

const Template = (args) => <ListEntry {...args} />

export const Entry1 = Template.bind({})
Entry1.args = {
    entryName: 'This is the title of an entry',
    storyName: 'Author Name',
    visible: true
}

export const Entry2 = Template.bind({})
Entry2.args = {
    entryName: 'This is the title of another entry',
    storyName: 'Another Author Name',
    visible: false
}