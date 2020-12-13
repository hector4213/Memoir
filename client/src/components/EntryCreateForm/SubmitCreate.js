import React from 'react'
import Button from '../Button/Button'

import {connect} from 'react-redux'

import {createEntryAction} from '../../redux/actions/db_post'
import {setErrorAction} from '../../redux/actions/page'


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

                console.log(formInfo)

                if(allFieldsCompleted){
                    const allFields = {
                        title: formInfo.title,
                        description: formInfo.description,
                        date:`${date.year}-${date.month}-${date.day}`,
                        embed: formInfo.embed,
                        format_id: formInfo.format_id,
                        hashtags: formInfo.hashtags,
                    }

                    createEntry(allFields)
                    setError(null)
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
        }}/>
    )
}

const areFieldsValid = (formInfo, date) => {
    if(formInfo.format_id === 2){
        return (
            formInfo &&
            formInfo.format_id &&
            formInfo.title &&
            formInfo.description &&
            date && date.month && date.day && date.year
            )
    } else {
        return (
            formInfo &&
            formInfo.embed &&
            formInfo.format_id &&
            formInfo.title &&
            formInfo.description &&
            date && date.month && date.day && date.year
            )
    }
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