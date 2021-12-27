import React from 'react'
import List from './List'

const Message = ({ coinData, display, dates }) => {
  let dayToBuy
  let dayToSell
  if (coinData.bestProfit.dayToSell) {
    dayToBuy = new Date(coinData.bestProfit.dayToBuy[0])
      .toISOString()
      .split('T')[0]
    dayToSell = new Date(coinData.bestProfit.dayToSell[0])
      .toISOString()
      .split('T')[0]
  }

  return (
    <div>
      {display ? (
        <div>
          <p>
            Trends within your chosen date range of{' '}
            {dates[0].toISOString().split('T')[0]} -{' '}
            {dates[1].toISOString().split('T')[0]}{' '}
          </p>
          {coinData.bestProfit.dayToSell ? (
            <div>
              <p>
                The best date to buy coins within this time period is {dayToBuy}{' '}
                for {coinData.bestProfit.dayToBuy[1].toFixed()}€
              </p>
              <p>
                The best date to sell coins within this time period is{' '}
                {dayToSell} for {coinData.bestProfit.dayToSell[1].toFixed()}€
              </p>
              <p>for a profit of {coinData.bestProfit.profit.toFixed()}€ per each coin</p>
            </div>
          ) : (
            <p>
              There wasn't any profit to be made from bitcoin trading during the given days.
            </p>
          )}
          {coinData.downwardTrend.length > 0 ? (
            <div>
              Longest downward trend, lasted for {coinData.downwardTrend.length}{' '}
              days and price dropped from{' '}
              {coinData.downwardTrend[0][1].toFixed()}€ to{' '}
              {coinData.downwardTrend[
                coinData.downwardTrend.length - 1
              ][1].toFixed()}
              €
              <List list={coinData.downwardTrend} />
            </div>
          ) : (
            <div></div>
          )}

          <div>
            Date with highest trading volume:
            <List list={coinData.highestVolume} />
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  )
}

export default Message
