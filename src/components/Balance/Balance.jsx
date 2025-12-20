import {useState, useEffect, useRef} from 'react'
import './Balance.scss'

import RefreshIcon from "../../assets/images/icons/refresh_balance.svg"
import ShowBalance from "../../assets/images/icons/show_balance.svg"
import HideIcon from "../../assets/images/icons/hide_balance.svg"

const Balance = ({tokens, hideBalance, setHideBalance, onRefresh}) => {
  const [refreshing, setRefreshing] = useState(false)
  const [showPulse, setShowPulse] = useState(false)
  const [prevTotal, setPrevTotal] = useState(0)
  const [currentBalance, setCurrentBalance] = useState(0)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const isInitialLoad = useRef(true)

  const total = tokens.reduce((sum, t) => sum + (t.balance_usd || 0), 0)

  useEffect(() => {
    const initialUpdate = async () => {
      if (isInitialLoad.current) {
        isInitialLoad.current = false

        setCurrentBalance(0)
        setIsInitialLoading(true)
        setShowPulse(true)

        try {
          const randomDelay = Math.floor(Math.random() * 1000) + 2000 // 2000-3000ms
          console.log(`Авто-обновление: задержка ${randomDelay}ms`)

          const refreshRes = await fetch('http://localhost:8000/api/refresh-balances', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (!refreshRes.ok) {
            throw new Error('Ошибка обновления балансов')
          }

          const result = await refreshRes.json()
          await new Promise(resolve => setTimeout(resolve, randomDelay))

          if (result.success) {
            setCurrentBalance(result.total_balance)
          }

          setIsInitialLoading(false)
          setShowPulse(false)

          if (onRefresh) {
            await onRefresh()
          }

        } catch (error) {
          console.error('Ошибка авто-обновления:', error)
          setIsInitialLoading(false)
          setShowPulse(false)
        }
      }
    }
    initialUpdate()
  }, [])

  useEffect(() => {
    if (!isInitialLoading) {
      setCurrentBalance(total)
    }
  }, [total, isInitialLoading])

  const formattedTotal = `$${currentBalance.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`

  useEffect(() => {
    if (prevTotal !== 0 && prevTotal !== currentBalance) {
      setShowPulse(true)
      const timer = setTimeout(() => setShowPulse(false), 3000)
      return () => clearTimeout(timer)
    }
    setPrevTotal(currentBalance)
  }, [currentBalance])

  const handleRefresh = async () => {
    if (refreshing) return

    setRefreshing(true)
    setShowPulse(true)

    try {
      const randomDelay = Math.floor(Math.random() * 1000) + 2000 // 2000-3000ms
      console.log(`Ручное обновление: задержка ${randomDelay}ms`)

      const refreshRes = await fetch('http://localhost:8000/api/refresh-balances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!refreshRes.ok) {
        throw new Error('Ошибка обновления балансов')
      }

      const result = await refreshRes.json()

      await new Promise(resolve => setTimeout(resolve, randomDelay))

      if (result.success) {
        setCurrentBalance(result.total_balance)
      }

      setShowPulse(false)

      if (onRefresh) {
        await onRefresh()
      }

    } catch (error) {
      console.error('Ошибка обновления:', error)
      setShowPulse(false)
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <div className="balance">
      <div className="balance__display">
        {hideBalance ? (
          <span className="balance__hidden">•••••</span>
        ) : (
          <span
            className={`balance__amount ${showPulse ? 'pulsing-smooth' : ''}`}
          >
            {formattedTotal}
          </span>
        )}
      </div>

      <div className="balance__actions">
        <button
          className={`balance__btn ${refreshing ? 'balance__btn--refreshing' : ''}`}
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          aria-label="Refresh balance"
        >
          <RefreshIcon className={refreshing ? 'refreshing-icon' : ''}/>
        </button>
        <button
          className="balance__btn"
          onClick={() => setHideBalance(!hideBalance)}
          aria-label={hideBalance ? "Show balance" : "Hide balance"}
        >
          {hideBalance ? <HideIcon/> : <ShowBalance/>}
        </button>
      </div>
    </div>
  )
}

export default Balance