import {useState, useEffect, useMemo} from 'react'
import {useParams} from 'react-router-dom'
import PageHeader from '@/components/PageHeader/PageHeader'
import TokenChart from './components/TokenChart/TokenChart'
import BuyNow from "@/pages/TokenPage/components/BuyNow/BuyNow.jsx"
import Tabs from "@/pages/TokenPage/components/Tabs/Tabs.jsx"
import FooterPanelToken from "@/components/FooterPanelToken/FooterPanelToken.jsx"
import TokenTransactionHistory from "@/pages/TokenPage/components/TokenTransactionHistory/TokenTransactionHistory.jsx"
import Top from "@/pages/TokenPage/components/Top/Top.jsx"
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ChangeDown from "../../assets/images/icons/change_down.svg"
import ChangeUp from "../../assets/images/icons/change_up.svg"
import './TokenPage.scss'

const TokenPage = () => {
  const {symbol} = useParams()
  const [tokenData, setTokenData] = useState(null)
  const [tokenTransactions, setTokenTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [transactionsLoading, setTransactionsLoading] = useState(false)

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:8000/api/token/${symbol}`)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()

        if (data.success) {
          setTokenData(data)
          setTokenTransactions(data.transactions || [])
        }
      } catch (err) {
        console.error('Error fetching token:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTokenData()
  }, [symbol])

  const handleLoadMoreTransactions = async () => {
    try {
      setTransactionsLoading(true)
      const currentCount = tokenTransactions.length
      const response = await fetch(
        `http://localhost:8000/api/token/${symbol}/transactions?limit=20&page=${Math.floor(currentCount / 20) + 1}`
      )

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.transactions) {
          setTokenTransactions(prev => {
            const existingIds = new Set(prev.map(tx => tx.id))
            const newTransactions = data.transactions.filter(tx => !existingIds.has(tx.id))
            return [...prev, ...newTransactions]
          })
        }
      }
    } catch (err) {
      console.error('Error loading more transactions:', err)
    } finally {
      setTransactionsLoading(false)
    }
  }

  const formatTokenPrice = (price, isStablecoin) => {
    const numPrice = Number(price)

    if (isStablecoin) {
      return numPrice.toFixed(2)
    }

    if (numPrice < 1) {
      return numPrice.toFixed(4)
    } else if (numPrice < 10) {
      return numPrice.toFixed(3)
    } else {
      return numPrice.toFixed(2)
    }
  }

  const {isPositive, formattedPriceChange} = useMemo(() => {
    if (!tokenData?.token) {
      return {isPositive: false, formattedPriceChange: ''}
    }

    const token = tokenData.token
    const priceChangeAmount = Math.abs(token.price_change_amount || 0)
    const priceChangePercent = token.price_change_24h || 0
    const isPositive = priceChangePercent >= 0

    const formatPriceChange = () => {
      const amount = priceChangeAmount.toFixed(2)
      const percent = Math.abs(priceChangePercent).toFixed(2)
      return `$${amount} (${isPositive ? '+' : '-'}${percent}%)`
    }

    return {
      isPositive,
      formattedPriceChange: formatPriceChange()
    }
  }, [tokenData])

  return (
    <SkeletonTheme
      baseColor="#4D4D4E"
      highlightColor="#6B6B6B"
      speed={1}
    >
      <PageHeader
        title={loading ? 'Loading...' : tokenData?.token?.symbol || symbol}
        subtitle={loading ? '' : tokenData?.token?.full_name || ''}
        backUrl="/"
      />

      <div className="trust-main">
        <div className="trust-main__wrapper">
          <div className="token-page">
            <div className="token-page__top">
              {loading ? (
                <>
                  <Skeleton
                    width={158}
                    height={45}
                    style={{margin: '0 auto'}}
                  />
                  <Skeleton
                    width={127}
                    height={21}
                    style={{margin: '8px auto 0'}}
                  />
                </>
              ) : (
                <>
                  <h1 className="token-page__price">
                    ${formatTokenPrice(tokenData.token.current_price, tokenData.token.is_stablecoin)}
                  </h1>
                  <div className={`token-page__change ${isPositive ? 'up' : 'down'}`}>
                    {isPositive ? <ChangeUp width={16} height={16}/> : <ChangeDown width={16} height={16}/>}
                    <span className="change-text">
                      {formattedPriceChange}
                    </span>
                  </div>
                </>
              )}
            </div>

            {loading ? (
              <Skeleton
                height={180}
                borderRadius={8}
                style={{margin: '0 0 20px'}}
              />
            ) : (
              <TokenChart
                data={tokenData.chart_data}
                isUp={tokenData.token.is_up}
              />
            )}
          </div>

          {loading ? (
            <Skeleton
              height={136}
              borderRadius={8}
              style={{margin: '0 0 20px'}}
            />
          ) : (
            <BuyNow/>
          )}
          <Tabs/>
          <Top/>

          {loading ? (
            <div className="transactions-skeleton">
              <Skeleton height={39} style={{marginBottom: '8px'}}/>
              {Array.from({length: 4}).map((_, i) => (
                <Skeleton
                  key={i}
                  height={39}
                  style={{marginBottom: '8px'}}
                />
              ))}
            </div>
          ) : (
            <TokenTransactionHistory
              tokenSymbol={tokenData.token.symbol}
              transactions={tokenTransactions}
              isLoading={transactionsLoading}
              onLoadMore={handleLoadMoreTransactions}
              showAllTransactions={true}
            />
          )}
        </div>
      </div>

      {!loading && tokenData?.token && (
        <FooterPanelToken
          tokenSymbol={tokenData.token.symbol}
          tokenData={tokenData.token}
        />
      )}
    </SkeletonTheme>
  )
}

export default TokenPage