import { useState } from 'react'
import { getCoinData } from '../hooks/apiHooks'

const useCalendar = () => {
  const [analyzedData, setAnalyzedData] = useState({
    highestVolume: [],
    downwardTrend: [],
    bestProfit: [],
  })
  const [errorMessage, setErrorMessage] = useState()

  const analyzeDates = async (startDate, endDate) => {
    const beginning = parseInt(new Date(startDate).getTime() / 1000)
    const end = parseInt(new Date(endDate).getTime() / 1000)
    try {
      setErrorMessage('Invalid date')
      const today = parseInt(new Date().getTime() / 1000)
      if (beginning === 0 || end === 0 || end > today) {
        setErrorMessage('Invalid date')
        return
      }
      setErrorMessage()
      const coinData = await getCoinData(beginning, end)
      const highestVolume = findLargestNode(coinData.total_volumes)
      const downwardTrend = findLongestDownwardTrend(coinData.prices)
      const bestProfit = findBestProfit(coinData.prices)
      setAnalyzedData({
        highestVolume: highestVolume,
        downwardTrend: downwardTrend,
        bestProfit: bestProfit,
      })
    } catch (error) {
      setErrorMessage('Invalid date')
      console.log(error)
    }
  }

  const removeMultipleSameDates = (list) => {
    let mappedList = list.map((e) => e[0])
    mappedList = mappedList.filter((e, i) => {
      const date = new Date(e).toDateString()
      const anotherDate = new Date(mappedList[i - 1]).toDateString()
      return date !== anotherDate
    })
    return list.filter((e) => mappedList.includes(e[0]))
  }

  const findLargestNode = (list) => {
    const filteredList = removeMultipleSameDates(list)
    const largestNode = filteredList
      .map((e) => e[1])
      .reduce((a, b) => {
        return Math.max(a, b)
      })
    return filteredList.filter((e) => e[1] === largestNode)
  }

  const findBestProfit = (list) => {
    const filteredList = removeMultipleSameDates(list)
    let maxDay
    let minDay
    let max_diff = filteredList[1][1] - filteredList[0][1]
    for (let i = 0; i < filteredList.length; i++) {
      for (let j = i + 1; j < filteredList.length; j++) {
        if (filteredList[j][1] - filteredList[i][1] > max_diff) {
          max_diff = filteredList[j][1] - filteredList[i][1]
          maxDay = filteredList[j]
          minDay = filteredList[i]
        }
      }
    }
    return { profit: max_diff, dayToSell: maxDay, dayToBuy: minDay }
  }

  const findLongestDownwardTrend = (priceList) => {
    let streak = []
    let longestStreak = []
    const filteredList = removeMultipleSameDates(priceList)
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
      if (i + 1 === filteredList.length) {
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
    analyzedData,
    errorMessage,
  }
}

export default useCalendar
