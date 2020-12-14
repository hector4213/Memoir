import React from 'react'
import Button from '../../../../templates/Button/Button'

import {connect} from 'react-redux'

import {createEntryAction} from '../../../../redux/actions/db_post'
import {setErrorAction} from '../../../../redux/actions/page'

import {areFieldsValid, parseForm, setDateToNotFilled, setFormToNotFilled} from './helpers'

const SubmitCreate = props => {

    const { setFormInfo, formInfo, setDate, date } = props
    const { createEntry, setError } = props

    return (
        <Button {...{
            label:'Submit',
            transparent: false,
            onClick: e => {

                e.preventDefault()
                const allFieldsCompleted = areFieldsValid(formInfo, date)

                if(allFieldsCompleted){
                    const allFields = parseForm(formInfo, date)
                    createEntry(allFields)
                    setError(null)
                }
                else {
                    setFormInfo(setFormToNotFilled(formInfo))
                    setDate(setDateToNotFilled(date))
                    setError('All fields must be filled out')
                }
            }
        }}/>
    )
}

const mapStateToProps = state => {
    return {
        current: state.page.current
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createEntry: formInfo => dispatch(createEntryAction(formInfo)),
        setError: errorMessage => dispatch(setErrorAction(errorMessage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitCreate)