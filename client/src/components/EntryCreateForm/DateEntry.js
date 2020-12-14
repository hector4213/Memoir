import React from 'react'
import './DateEntry.scss'

const DateEntry = props => {

    const {notFilledStyle, setDate, date, month_F, day_F, year_F} = props

    const dayOptions = []
    for(let i=1; i<=31; i++){
        dayOptions.push(<option key={i} value={i}> {i} </option>)
    }

    return (
        <div className='date'>

            <select name="months" className="months"
                style={month_F?{}: notFilledStyle}
                value = {date.month? date.month: ''}
                onChange={e =>{
                    if(e.target.value){
                        setDate({...date, month:e.target.value, month_F:true})
                    } else {
                        setDate({...date, month:e.target.value, month_F:false})
                    }
                }}
            >
                <option value="">Month:</option>
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
                name="days"
                className="days"
                style={day_F?{}: notFilledStyle}
                value = {date.day? date.day: ''}
                onChange={e =>{
                    if(e.target.value){
                        setDate({...date, day:e.target.value, day_F:true})
                    } else {
                        setDate({...date, day:e.target.value, day_F:false})
                    }
                }}
            >
                <option value="">Day:</option>
                {dayOptions}
            </select>

            <input type='number' placeholder='Year'
                style={year_F?{}: notFilledStyle}
                value = {date.year? date.year: ''}
                onChange={ e =>{
                    if(e.target.value && !isNaN(e.target.value) && e.target.value.length===4){
                        setDate({...date, year:e.target.value, year_F:true})
                    } else {
                        setDate({...date, year:e.target.value, year_F:false})
                    }
                }}
            />
        </div>
    )
}

export default DateEntry