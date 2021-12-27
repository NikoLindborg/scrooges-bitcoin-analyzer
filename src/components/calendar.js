import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import useCalendar from '../hooks/calendarHooks'

const Calendar = ({
  setCoinData,
  setErrorMessage,
  setDates,
  setDisplayMessage,
}) => {
  const { analyzeDates, analyzedData, errorMessage } = useCalendar()
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  useEffect(() => {
    setCoinData(analyzedData)
  }, [analyzedData])

  useEffect(() => {
    setErrorMessage(errorMessage)
  }, [errorMessage])

  return (
    <div className="container">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        showYearDropdown
        onChange={(update) => {
          console.log(update)
          setDateRange(update)
        }}
      />
      <button
        className="pickerButton"
        onClick={() => {
          if (startDate === 0 || !startDate || endDate === 0 || !endDate) {
            setDisplayMessage(false)
          } else {
            setDisplayMessage(true)
            setDates(dateRange)
          }

          analyzeDates(startDate, endDate)
        }}
      >
        Analyze
      </button>
    </div>
  )
}

export { Calendar }
