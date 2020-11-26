import React from 'react'
import './Home.scss'

import Button from '../../components/Button/Button'
import Header from '../../components/Header/Header'
import StoryCard from '../../components/StoryCard/StoryCard'

const Index = () => {

    let cards = []

    // dummy cards
    for(let i=0; i<8; i++){
        cards.push(
            <StoryCard
                {...{
                    key: i,
                    imageUrl: 'https://tinyurl.com/y37j647a',
                    name: 'Jack',
                    occupation: 'The Incredibles',
                    onClick: () => console.log('Story Card was Clicked')
                }}
            />
        )
    }

    return (
    <div className='home'>

        <Button
            {...{
                label: 'Log In',
                transparent : true,
                extraClass: 'login-btn',
                onClick: () => console.log('Log In Button was Clicked')
            }}
        />

        <Header />

        <div className='storyCards'>
            {cards}
        </div>

    </div>
    )
}

export default Index;