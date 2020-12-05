import React from 'react'
import ListEntry from '../../../../components/ListEntry/ListEntry'
import './YourEntries.scss'
import {connect} from 'react-redux'

const YourEntries = props => {
    const {myEntries} = props

    const myEntryCards = myEntries.map( entry => {
        return <ListEntry {...{
            entryName: entry.title,
            storyName: entry.story_id,
            visible: true
        }}/>
    })

    return (
        <div className='entries'>
            <label> Your Entries: </label>

            <div className='listEntries'>
                {myEntryCards}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        myEntries: state.profile.myEntries
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(YourEntries)