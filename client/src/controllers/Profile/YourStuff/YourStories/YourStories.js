import React from 'react'
import { HiPlus } from "react-icons/hi";
import StoryCard from '../../../../components/StoryCard/StoryCard'
import './YourStories.scss'

const YourStories = props => {
    return (
        <div className='yourStories'>
            <label> Your Stories: </label>
                <div className='cards'>
                    <StoryCard {...{
                        imageUrl: 'https://tinyurl.com/yy23tqm5',
                        name: 'Michael Angelo',
                        occupation: 'Ninja Turtle',
                        onClick: () => console.log('person clicked'),
                        deleteCard: true
                    }}/>

                    <StoryCard {...{
                        imageUrl: 'https://static.wikia.nocookie.net/tmnt2012series/images/1/1f/2DRaph.jpeg',
                        name: 'Raphael',
                        occupation: 'Ninja Turtle',
                        onClick: () => console.log('person clicked'),
                        deleteCard: true
                    }} />

                    <StoryCard {...{
                        imageUrl: 'https://tinyurl.com/y2ur64kv',
                        name: 'Leonardo',
                        occupation: 'Ninja Turtle',
                        onClick: () => console.log('person clicked'),
                        deleteCard: true
                    }} />

                    <StoryCard {...{
                        imageUrl: 'https://media.giphy.com/media/cFdHXXm5GhJsc/source.gif',
                        name: 'Donatello',
                        occupation: 'Ninja Turtle',
                        onClick: () => console.log('person clicked'),
                        deleteCard: true
                    }} />

                    <div
                        className='storyCard addStory'
                        onClick={()=>console.log('add a story')}
                    >
                        <div className='addStoryPlus'>
                        <HiPlus/>
                        </div>
                        <h1>Add Story</h1>
                    </div>
                </div>
            </div>
    )
}

export default YourStories