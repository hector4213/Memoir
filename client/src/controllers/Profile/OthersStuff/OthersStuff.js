import React from 'react'
import ListEntry from '../../../components/ListEntry/ListEntry'
import './OthersStuff.scss'

const OthersStuff = props => {
    return (
        <div className = 'othersStuff'>

            <div className='entries'>
                <label> Need to be Approved: </label>

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

            <div className='entries'>
                <label className='approved'> Approved: </label>

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

            <div className='entries'>
                <label className='denied'> Denied: </label>

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

        </div>
    )
}

export default OthersStuff