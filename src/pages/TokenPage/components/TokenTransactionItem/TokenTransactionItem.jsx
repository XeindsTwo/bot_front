import {Link} from 'react-router-dom'
import ReceiveIcon from '@/assets/images/icons/receive_history.svg'
import SendIcon from '@/assets/images/icons/send_history.svg'

const TokenTransactionItem = ({transaction, tokenSymbol}) => {
  const isPending = false
  const isSpinning = false

  const formatAmount = () => {
    const exactAmount = transaction.amount_token_exact || 0
    const displaySymbol = transaction.display_symbol || tokenSymbol || ''

    // Используем точное значение, убираем лишние нули
    const formatted = exactAmount.toString().replace(/(\.0*|0+)$/, '')

    // Если после точки много цифр, показываем до 6 знаков
    if (formatted.includes('.')) {
      const parts = formatted.split('.')
      if (parts[1].length > 6) {
        return `${exactAmount.toFixed(6)} ${displaySymbol}`
      }
    }

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