import React from 'react'
import ListEntry from '../../../../components/ListEntry/ListEntry'
import './YourEntries.scss'

const YourEntries = props => {
    return (
        <div className='yourEntries'>
            <label> Your Entries: </label>

            <div className='listEntries'>
                <ListEntry {...{
                    entryName:'The name of the first entry',
                    storyName: 'Michael Angelo',
                    visible: true
                }}/>
                <ListEntry {...{
                    entryName:'The name of the second entry',
                    storyName: 'Raphael',
                    visible: false
                }}/>
                <ListEntry {...{
                    entryName:'The name of the third entry',
                    storyName: 'Leonardo',
                    visible: true
                }}/>
            </div>
        </div>
    )
}

export default YourEntries