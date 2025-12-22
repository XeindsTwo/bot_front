import { useState } from 'react'
import './Balance.scss'
import RefreshIcon from "../../assets/images/icons/refresh_balance.svg"
import ShowBalance from "../../assets/images/icons/show_balance.svg"
import HideIcon from "../../assets/images/icons/hide_balance.svg"

const Balance = ({ tokens, hideBalance, setHideBalance, onRefresh, showPulse, isRefreshing = false }) => {
  const [refreshing, setRefreshing] = useState(false)

  const currentBalance = tokens.reduce((sum, t) => sum + (t.balance_usd || 0), 0)
  const roundedBalance = parseFloat(currentBalance.toFixed(2))

  const formattedTotal = `$${roundedBalance.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`

  const handleRefresh = async () => {
    if (refreshing) return

    setRefreshing(true)

    try {
      const randomDelay = 2000 + Math.floor(Math.random() * 1000)
      await new Promise(resolve => setTimeout(resolve, randomDelay))
      await onRefresh()
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch (error) {
      console.error('Ошибка обновления:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const pulseActive = showPulse || refreshing
  const refreshButtonActive = showPulse || refreshing

  // Для обновления из истории делаем анимацию дольше и ярче
  const animationDuration = isRefreshing ? 2000 : (pulseActive ? 3000 : 0)
  const pulseClass = isRefreshing ? 'pulsing-smooth pulse-strong' :
    (pulseActive ? 'pulsing-smooth' : '')

  return (
    <div className="balance">
      <div className="balance__display">
        {hideBalance ? (
          <span className="balance__hidden">•••••</span>
        ) : (
          <span
            className={`balance__amount ${pulseClass}`}
            style={pulseActive || isRefreshing ? {
              animationDuration: `${animationDuration}ms`,
              animationIterationCount: isRefreshing ? 'infinite' : '1'
            } : {}}
          >
            {formattedTotal}
          </span>
        )}
      </div>

      <div className="balance__actions">
        <button
          className={`balance__btn ${refreshButtonActive ? 'balance__btn--refreshing' : ''}`}
          onClick={handleRefresh}
          disabled={refreshing || showPulse}
        >
          <RefreshIcon
            className={refreshButtonActive ? 'refreshing-icon' : ''}
            style={refreshButtonActive ? {
              animationDuration: `${animationDuration}ms`
            } : {}}
          />
        </button>

        <button
          className="balance__btn"
          onClick={() => setHideBalance(!hideBalance)}
        >
          {hideBalance ? <HideIcon /> : <ShowBalance />}
        </button>
      </div>
    </div>
  )
}

export default Balance