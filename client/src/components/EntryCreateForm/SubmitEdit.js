import React, {useCallback} from 'react'
import Button from '../Button/Button'

import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {editEntryAction} from '../../redux/actions/put'
import {setErrorAction} from '../../redux/actions/page'



const SubmitEdit = props => {

    const { setFormInfo, formInfo, setDate, date } = props
    const { current, editEntry, setError } = props

    // redirect to go to story
    const history = useHistory()
    const gotoEntry = useCallback(() => history.push(`/story/${current.story.id}/entry/${current.entry[0].id}`), [history, current])

    return (
        <>
        <Button {...{
            label:'Submit Edit',
            transparent: false,
            onClick: e => {

                e.preventDefault()
                const allFieldsCompleted = areFieldsValid(formInfo, date)

                if(allFieldsCompleted){
                    const allFields = {...formInfo, date:`${date.month} ${date.day}, ${date.year}`}
                    console.log(allFields)
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
        </>
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
        editEntry: formInfo => dispatch(editEntryAction(formInfo)),
        setError: errorMessage => dispatch(setErrorAction(errorMessage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEdit)