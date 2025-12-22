import './TransactionItem.scss'
import ReceiveIcon from '../../../../assets/images/icons/receive_history.svg'
import SendIcon from '../../../../assets/images/icons/send_history.svg'
import PendingSpinner from './PendingSpinner/PendingSpinner'
import { usePendingStatus } from './hooks/usePendingStatus'

const TransactionItem = ({ transaction, onStatusChange }) => {
  const { isPending, isSpinning } = usePendingStatus(transaction, onStatusChange)

  const formatAmount = (amount, displaySymbol) => {
    const num = parseFloat(amount)
    let formatted

    if (num >= 1000) {
      formatted = num.toLocaleString('en-US', { maximumFractionDigits: 0 })
    } else if (num < 0.01 && num > 0) {
      formatted = num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8
      })
    } else {
      formatted = num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      })
    }

    return `${formatted} ${displaySymbol}`
  }

  const formatAddress = (address) => {
    if (!address || address === 'Unknown') return 'Unknown'
    const start = address.substring(0, 7)
    const end = address.substring(address.length - 9)
    return `${start}...${end}`
  }

  return (
    <li className="transaction-item">
      <div className="transaction-item__icon">
        {isSpinning ? (
          <PendingSpinner />
        ) : transaction.type === 'income' ? (
          <ReceiveIcon />
        ) : (
          <SendIcon />
        )}
      </div>

      <div className="transaction-details">
        <div className="transaction-main">
          <span className="transaction-type">
            {transaction.type === 'income' ? 'Received' : 'Send'}
            {transaction.display_symbol ? ` ${transaction.display_symbol}` : ''}
          </span>
          {isPending && (
            <span className="transaction-status">
              Pending
            </span>
          )}
        </div>

        <div className="transaction-secondary">
          <span className="transaction-address">
            {transaction.type === 'income' ? 'From: ' : 'To: '}
            {transaction.type === 'income'
              ? formatAddress(transaction.from_address)
              : formatAddress(transaction.to_address)
            }
          </span>
        </div>
      </div>

      <span className={`amount ${transaction.type}`}>
        {transaction.type === 'income' ? '+' : '-'}
        {formatAmount(transaction.amount, transaction.display_symbol || '')}
      </span>
    </li>
  )
}

export default TransactionItem