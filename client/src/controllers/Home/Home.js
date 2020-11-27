import React, {useState} from 'react'
import './Home.scss'

import Button from '../../components/Button/Button'
import Header from '../../components/Header/Header'
import StoryCard from '../../components/StoryCard/StoryCard'
import Modal from '../../components/Modal/Modal'

const Index = () => {
    const [modal, showModal] = useState(false)


    let cards = []

    // dummy cards
    for(let i=0; i<8; i++){
        cards.push(
            <StoryCard
                {...{
                    key: i,
                    imageUrl: 'https://tinyurl.com/y37j647a',
                    name: 'Jack Jack',
                    occupation: 'The Incredibles',
                    onClick: () => console.log('Story Card was Clicked')
                }}
            />
        )
    }

    return (
    <div className='home'>

        {modal? <Modal showModal={showModal} /> : ''}

        <Button
            {...{
                label: 'Register | Log In',
                transparent : true,
                extraClass: 'login-btn',
                onClick: () => showModal(true)
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