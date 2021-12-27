import { useEffect, useState } from 'react'
import './App.css'
import { Calendar } from './components/Calendar'
import Message from './components/Message'
import Notification from './components/Notification'

const App = () => {
  const [coinData, setCoinData] = useState({
    highestVolume: [],
    downwardTrend: [],
    bestProfit: [],
  })
  const [errorMessage, setErrorMessage] = useState()
  const [displayMessage, setDisplayMessage] = useState(false)
  const [dates, setDates] = useState(new Date(), new Date())

  useEffect(() => {
    console.log(coinData)
  }, [coinData])

  return (
    <div className="App">
      <div className="calendarContainer">
        <Calendar
          setDisplayMessage={setDisplayMessage}
          setCoinData={setCoinData}
          setErrorMessage={setErrorMessage}
          setDates={setDates}
        />
        <Notification message={errorMessage} />
      </div>
      <div className="messageContainer">
        <Message coinData={coinData} display={displayMessage} dates={dates} />
      </div>
    </div>
  )
}

export default App
