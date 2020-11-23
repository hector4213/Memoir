import React from 'react'
import Button from '../Button/Button'
import Header from './Header/Header'

const Index = () => {

    return (
    <div>
        <Header />

        <Button {...{
        primary: true,
        label: 'Now it works',
        backgroundColor: '#B6ACE6',
        onClick: () => console.log('the click is activated')
        }}/>

        <p> Sample text to make sure SASS is working. </p>
    </div>
    )
}

export default Index;