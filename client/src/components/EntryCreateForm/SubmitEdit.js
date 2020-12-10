import React, {useCallback} from 'react'
import Button from '../Button/Button'

import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {editEntryAction} from '../../redux/actions/db_put'
import {setErrorAction} from '../../redux/actions/page'
import {deleteEntryAction} from '../../redux/actions/db_delete'



const SubmitEdit = props => {

    const { setFormInfo, formInfo, setDate, date } = props
    const { current, editEntry, setError, deleteEntry } = props

    // redirect to go to story
    const history = useHistory()
    const gotoEntry = useCallback(() => history.push(`/story/${current.story.id}/entry/${current.entry.id}`), [history, current])

    return (
        <div className='submit-edit'>
        <Button {...{
            label:'Delete Entry',
            transparent: true,
            extraClass: 'delete-story',
            onClick: e => {
                e.preventDefault()
                // eslint-disable-next-line no-restricted-globals
                if (confirm(`Are you sure you want to delete this entry?`)) {
                    deleteEntry(current.story.id, current.entry.id)
                } else {
                    console.log('delete was cancelled')
                }
            }
        }}/>

        <Button {...{
            label:'Submit Edit',
            transparent: false,
            onClick: e => {

                e.preventDefault()
                const allFieldsCompleted = areFieldsValid(formInfo, date)

                if(allFieldsCompleted){
                    const allFields = {...formInfo, date:`${date.month} ${date.day}, ${date.year}`}

                    editEntry({...allFields})
                    setError(null)
                    gotoEntry()
                }
                else {
                    setFormInfo({
                        ...formInfo,
                        embed_F: formInfo.embed? true: false,
                        format_id_F: formInfo.format_id? true: false,
                        title_F: formInfo.title? true: false,
                        description_F: formInfo.description? true: false,
                    })

                    setDate({
                        ...date,
                        month_F: date.month? true : false,
                        day_F: date.day? true : false,
                        year_F: date.year? true : false,
                    })

                    setError('All fields must be filled out')
                }
            }
        }} />
        </div>
    )
}

const areFieldsValid = (formInfo, date) => {
    return (formInfo && formInfo.embed && formInfo.format_id && formInfo.title && formInfo.description && date && date.month && date.day && date.year)
}

const mapStateToProps = state => {
    return {
        current: state.page.current
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setError: errorMessage => dispatch(setErrorAction(errorMessage)),
        editEntry: formInfo => dispatch(editEntryAction(formInfo)),
        deleteEntry: (storyId, entryId) => dispatch(deleteEntryAction(storyId, entryId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEdit)