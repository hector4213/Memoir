import React from 'react'
import './SearchDate.scss'

const SearchDate = props => {
    const {search, date, setDate} = props

    const handleDateSubmit = (value) => {
        const updatedDate = {...date, ...value}
        setDate(updatedDate)

        const m = updatedDate.month
        const d = updatedDate.day
        const y = updatedDate.year

        const onlyYear = m === 0 && d === 0 && y > 0
        const fullDate = m > 0 && d > 0 && y > 0

        if( fullDate || onlyYear){
            console.log('-> going to redux')
            search('date' , updatedDate)
        }
    }

    const dayOptions = []
    for(let i=1; i<=31; i++){
        dayOptions.push(<option key={i} value={i}> {i} </option>)
    }

    return (
        <>
        <div className='search-field search-date'>
            <label>entries from</label>
            <div className='date'>
                <select
                    name="months" className="months"
                    value = {date.month? date.month: ''}
                    onChange={e => {
                        e.preventDefault()
                        handleDateSubmit({month:parseInt(e.target.value)})
                    }}
                >
                    <option value="0">Month:</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>

                <select
                    name="days" className="days"
                    value = {date.day? date.day: ''}
                    onChange={e => {
                        e.preventDefault()
                        handleDateSubmit({day:parseInt(e.target.value)})
                    }}
                >
                    <option value="0">Day:</option>
                    {dayOptions}
                </select>

                <input
                    name='year' type='number'
                    placeholder='Year'
                    value = {date.year? date.year: ''}
                    onKeyUp={ e => {
                        if(e.target.value.length === 4){
                            handleDateSubmit({year:e.target.value})
                        }
                    }}
                    onChange={ e => setDate({...date, year:parseInt(e.target.value)})}
                />
            </div>
        </div>
        </>
    )
}

export default SearchDate