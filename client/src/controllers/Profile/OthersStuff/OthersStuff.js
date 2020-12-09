import React, {useEffect} from 'react'
import './OthersStuff.scss'
import {connect} from 'react-redux'

import {getForeignEntriesAction} from '../../../redux/actions/foreignEntries'
// import {editForeignEntriesAction} from '../../../redux/actions/foreignEntries'
import ListEntry from '../../../components/ListEntry/ListEntry'


const OthersStuff = props => {
    const { getForeignEntries, foreignEntries } = props

    useEffect(() => {
        getForeignEntries()
    }, [getForeignEntries])

    if(!foreignEntries){
        return <div> No foreign entries found </div>
    }

    // creating entry list cards for approved, denied, pending
    const approved = []
    const pending = []
    const denied = []

    if(foreignEntries.length>0){
        foreignEntries.forEach( entry => {
            console.log(entry)

            if(entry.entry_status === 1){
                approved.push(<ListEntry {...{
                    key: entry.id,
                    entry: entry,
                    foreign: true
                }}/>)
            }
            else if(entry.entry_status === 2){
                pending.push(<ListEntry {...{
                    key: entry.id,
                    entry: entry,
                    foreign: true
                }}/>)
            }
            else if(entry.entry_status === 3){
                denied.push(<ListEntry {...{
                    key: entry.id,
                    entry: entry,
                    foreign: true
                }}/>)
            }
        })
    }

    return (
        <div className = 'othersStuff'>

            <div className='entries'>
                <label> Need to be Approved: </label>
                {pending? pending : ''}
            </div>

            <div className='entries'>
                <label className='approved'> Approved: </label>
                {approved? approved : ''}
            </div>

            <div className='entries'>
                <label className='denied'> Denied: </label>
                {denied? denied : ''}
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        foreignEntries: state.profile.foreignEntries
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        getForeignEntries: () => dispatch(getForeignEntriesAction()),
        // editForeignEntries: entryId => dispatch(editForeignEntriesAction(entryId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OthersStuff)