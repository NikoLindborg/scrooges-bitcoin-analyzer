import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import useCalendar from '../hooks/calendarHooks'

const Calendar = () => {
  const { analyzeDates } = useCalendar()
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  return (
    <div className="container">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        showYearDropdown
        onChange={(update) => {
          setDateRange(update)
        }}
      />
      <button
        className="pickerButton"
        onClick={() => analyzeDates(startDate, endDate)}
      >
        Analyze
      </button>
    </div>
  )
}

export { Calendar }
