import React, {useEffect} from 'react'
import './OthersStuff.scss'
import {connect} from 'react-redux'

import {getForeignEntriesAction} from '../../../redux/actions/foreignEntries'
// import {editForeignEntriesAction} from '../../../redux/actions/foreignEntries'
// import ListEntry from '../../../components/ListEntry/ListEntry'


const OthersStuff = props => {
    const { getForeignEntries, foreignEntries } = props

    useEffect(() => {
        getForeignEntries()
    }, [getForeignEntries])

    if(!foreignEntries){
        return <div> No foreign entries found </div>
    }

    const needToBeApproved = []

    foreignEntries.forEach( entry => {
        if(entry.format_id === 2){
            needToBeApproved.push(entry)
        }
    })

    const needToBeApprovedCards = needToBeApproved.map( entry => {

        console.log(entry)
        return <p key={entry.id}> {entry.title} </p>


        // return (
        //     <ListEntry {...{
        //         key: entry.id,
        //         entry: entry
        //     }}/>
        // )
    })

    return (
        <div className = 'othersStuff'>

            <div className='entries'>
                <label> Need to be Approved: </label>
                {needToBeApprovedCards? needToBeApprovedCards : ''}
            </div>

            <div className='entries'>
                <label className='approved'> Approved: </label>
            </div>

            <div className='entries'>
                <label className='denied'> Denied: </label>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
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