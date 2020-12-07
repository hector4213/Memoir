import React, {useCallback} from 'react'
import Button from '../Button/Button'

import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {createEntryAction} from '../../redux/actions/post'
import {setErrorAction} from '../../redux/actions/page'


const SubmitCreate = props => {

    const { setFormInfo, formInfo, setDate, date } = props
    const { current, createEntry, setError } = props

    // redirect to go to story
    const history = useHistory()
    const gotoStory = useCallback(() => history.push(`/story/${current.story.id}`), [history, current])

    return (
        <Button {...{
            label:'Submit',
            transparent: false,
            onClick: e => {

                e.preventDefault()
                const allFieldsCompleted = areFieldsValid(formInfo, date)

                if(allFieldsCompleted){
                    const allFields = {...formInfo, date:`${date.month} ${date.day}, ${date.year}`}
                    createEntry(allFields)
                    setError(null)
                    gotoStory()
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
    return (formInfo && formInfo.embed && formInfo.format_id && formInfo.title && formInfo.description && date && date.month && date.day && date.year)
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