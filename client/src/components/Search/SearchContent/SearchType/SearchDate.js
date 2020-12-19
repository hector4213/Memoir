import React from 'react'
import './SearchDate.scss'

const SearchDate = props => {
    const {search, date, setDate} = props

    const handleDateSubmit = (value) => {
        setDate({...date, ...value})
        search('date' , {...date, ...value})
    }

    const dayOptions = []
    for(let i=1; i<=31; i++){
        dayOptions.push(<option key={i} value={i}> {i} </option>)
    }

    return (
        <>
        <label> I am trying to find </label>
        <div className='search-field search-date'>
            <label>entries made on</label>

            <div className='date'>
                <select
                    name="months" className="months"
                    value = {date.month? date.month: ''}
                    onChange={e => {
                        e.preventDefault()
                        handleDateSubmit({month:e.target.value})
                    }}
                >
                    <option value=''>Month:</option>
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
                        handleDateSubmit({day:e.target.value})
                    }}
                >
                    <option value="">Day:</option>
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
                    onChange={ e => setDate({...date, year:e.target.value})}
                />
            </div>
        </div>
        </>
    )
}

export default SearchDate