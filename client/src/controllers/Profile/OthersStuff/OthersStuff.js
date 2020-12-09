import React, {useEffect} from 'react'
import './OthersStuff.scss'
import {connect} from 'react-redux'

import {getForeignEntriesAction} from '../../../redux/actions/profile'
// import ListEntry from '../../../components/ListEntry/ListEntry'


const OthersStuff = props => {
    const { getForeignEntries, foreignEntries } = props

    useEffect(() => {
        getForeignEntries()
    }, [getForeignEntries])

    console.log(foreignEntries)

    if(!foreignEntries){
        return <div> No foreign entries found </div>
    }

    const needToBeApproved = foreignEntries.filter( entry => entry.format_id === 2)
    const NTBAEntryCards = needToBeApproved.map( entry => {

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
                {NTBAEntryCards? NTBAEntryCards : ''}
            </div>

            <div className='entries'>
                <label className='approved'> Approved: </label>

                <div className='listEntries'>
                    {/* <ListEntry {...{
                        entryName:'The name of the third entry',
                        storyName: 'Leonardo',
                        visible: true
                    }}/> */}
                </div>
            </div>

            <div className='entries'>
                <label className='denied'> Denied: </label>

                <div className='listEntries'>
                    {/* <ListEntry {...{
                        entryName:'The name of the first entry',
                        storyName: 'Michael Angelo',
                        visible: true,
                        belongsToOtherPerson: true
                    }}/> */}
                </div>
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
        getForeignEntries: () => dispatch(getForeignEntriesAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OthersStuff)