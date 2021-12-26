import { doFetch } from '../utils/http'
import { baseUrl } from '../utils/variables'

const getCoinData = async (startDate, endDate) => {
  try {
    const coinData = await doFetch(
      `${baseUrl}bitcoin/market_chart/range?vs_currency=eur&from=${startDate}&to=${endDate}`
    )

    return coinData
  } catch (error) {
    console.log(`error occured with getHistory, ${error}`)
  }
}

export { getCoinData }
