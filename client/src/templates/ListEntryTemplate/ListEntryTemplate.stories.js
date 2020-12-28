import ListEntryTemplate from './ListEntryTemplate'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    title: 'List Entry Template',
}

const Template = (args) => <ListEntryTemplate {...args} />

// created buttons

export const ListRow = Template.bind({})
ListRow.args = {
    entry: {
        title: 'Title of an Entry',
        story: {
            name: 'Story Name'
        }
    },
}
