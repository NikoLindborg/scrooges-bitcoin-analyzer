import { getCoinData } from '../hooks/apiHooks'

const useCalendar = () => {
  const analyzeDates = async (startDate, endDate) => {
    const beginning = parseInt(new Date(startDate).getTime() / 1000)
    const end = parseInt(new Date(endDate).getTime() / 1000)
    console.log(startDate, endDate)
    const coinData = await getCoinData(beginning, end)
    /**  const formattedMarketCaps = coinData.market_caps.map((e) => {
      const date = new Date(e[0]).toLocaleString('en-FI')
      const value = e[1].toFixed(2)
      return [date, `${value}€`]
    })*/
    const downwardTrend = findLongestDownwardTrend(coinData.prices)
    downwardTrend.forEach( e => {
      const date = new Date(e[0]).toLocaleString('en-FI')
      console.log(date, e[1])
    })
    //console.log(coinData)
  }

  const findLongestDownwardTrend = (priceList) => {
    let streak = []
    let longestStreak = []
    let mappedList = priceList.map((e) => e[0])

    mappedList = mappedList.filter((e, i) => {
      const date = new Date(e).toDateString()
      const anotherDate = new Date(mappedList[i - 1]).toDateString()
      return date !== anotherDate
    })
    const filteredList = priceList.filter(e => mappedList.includes(e[0]))
    console.log(filteredList)
    for (let i = 0; i < filteredList.length; i++) {
      if (i === 0) {
        streak.push(filteredList[i])
      } else if (filteredList[i][1] < filteredList[i - 1][1]) {
        streak.push(filteredList[i])
      } else if (filteredList[i][1] > filteredList[i - 1][1]) {
        if (streak.length >= longestStreak.length) {
          longestStreak = streak
        }
        streak = []
      }
    }
    return longestStreak
  }
  return {
    analyzeDates,
  }
}

export default useCalendar
