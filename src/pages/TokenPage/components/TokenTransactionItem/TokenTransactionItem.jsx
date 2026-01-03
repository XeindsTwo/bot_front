import {Link} from 'react-router-dom'
import ReceiveIcon from '@/assets/images/icons/receive_history.svg'
import SendIcon from '@/assets/images/icons/send_history.svg'

const TokenTransactionItem = ({transaction, tokenSymbol}) => {
  const isPending = false
  const isSpinning = false

  const formatAmount = () => {
    const exactAmount = transaction.amount_token_exact || 0
    const displaySymbol = transaction.display_symbol || tokenSymbol || ''
    const displayAmount = transaction.amount_token_display || ''

    if (displayAmount) {
      return `${displayAmount} ${displaySymbol}`
    }

    // Фоллбэк: форматируем точное значение
    const amount = parseFloat(exactAmount)

    if (amount % 1 === 0) {
      return `${amount} ${displaySymbol}`
    }

    // Для дробных чисел показываем до 6 знаков
    const formatted = amount.toFixed(6).replace(/\.?0+$/, '')
    return `${formatted} ${displaySymbol}`
  }

  const formatAddress = (address) => {
    if (!address || address === 'Unknown') return 'Unknown'
    const start = address.substring(0, 7)
    const end = address.substring(address.length - 9)
    return `${start}...${end}`
  }

  if (transaction.type === 'income') {
    return (
      <li>
        <Link to={`/transaction/${transaction.id}`} className="transaction-item">
          <div className="transaction-item__icon">
            {isSpinning ? <div className="pending-spinner">⏳</div> : <ReceiveIcon/>}
          </div>

          <div className="transaction-details">
            <div className="transaction-main">
              <span className="transaction-type">Receive</span>
              {isPending && <span className="transaction-status">Pending</span>}
            </div>

            <div className="transaction-secondary">
              <span className="transaction-address">
                From: {formatAddress(transaction.from_address)}
              </span>
            </div>
          </div>

          <span className="amount income">+{formatAmount()}</span>
        </Link>
      </li>
    )
  }

  return (
    <li className="transaction-item">
      <div className="transaction-item__icon"><SendIcon/></div>

      <div className="transaction-details">
        <div className="transaction-main">
          <span className="transaction-type">
            Send {tokenSymbol ? tokenSymbol : ''}
          </span>
        </div>

        <div className="transaction-secondary">
          <span className="transaction-address">
            To: {formatAddress(transaction.to_address)}
          </span>
        </div>
      </div>

      <div>
        <div className="amount outcome">-{formatAmount()}</div>
      </div>
    </li>
  )
}

export default TokenTransactionItem