import React, {useCallback} from 'react'
import Button from '../../../../templates/Button/Button'

import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {setErrorAction} from '../../../../redux/actions/page'
import {editEntryAction} from '../../../../redux/actions/entry'
import {deleteEntryAction} from '../../../../redux/actions/entry'

import {areFieldsValid, parseForm, setFormToNotFilled, setDateToNotFilled} from './helpers'

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
            red: true,
            extraClass: 'delete-entry',
            onClick: e => {

                e.preventDefault()
                // eslint-disable-next-line no-restricted-globals
                if (confirm(`Are you sure you want to delete this entry?`)) {
                    deleteEntry(current.entry)
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
                    const allFields = parseForm(formInfo, date)
                    editEntry(allFields)
                    setError(null)
                    gotoEntry()
                }
                else {
                    setFormInfo(setFormToNotFilled(formInfo))
                    setDate(setDateToNotFilled(date))
                    setError('All fields must be filled out')
                }
            }
        }} />
        </div>
    )
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
        deleteEntry: (entry) => dispatch(deleteEntryAction(entry)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEdit)