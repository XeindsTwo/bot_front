import './TransactionItem.scss'
import {Link} from "react-router-dom";
import ReceiveIcon from '../../../../assets/images/icons/receive_history.svg'
import SendIcon from '../../../../assets/images/icons/send_history.svg'
import PendingSpinner from './PendingSpinner/PendingSpinner'
import {usePendingStatus} from './hooks/usePendingStatus'

const TransactionItem = ({transaction, onStatusChange}) => {
  const {isPending, isSpinning} = usePendingStatus(transaction, onStatusChange)

  const formatAmount = (amount, displaySymbol) => {
    // ИСПРАВЛЕНИЕ: используем amount_token_exact если есть, иначе amount
    const tokenAmount = transaction.amount_token_exact || amount

    const num = parseFloat(tokenAmount)
    let formatted

    if (num >= 1000) {
      formatted = num.toLocaleString('en-US', {maximumFractionDigits: 0})
    } else if (num < 0.01 && num > 0) {
      formatted = num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8
      })
    } else {
      // Показываем точное значение без округления до 4 знаков
      formatted = num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8
      })

      // Убираем лишние нули в конце
      formatted = formatted.replace(/(\.0*|0+)$/, '')
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
            {isSpinning ? (
              <PendingSpinner/>
            ) : (
              <ReceiveIcon/>
            )}
          </div>

          <div className="transaction-details">
            <div className="transaction-main">
              <span className="transaction-type">
                Received
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
                From: {formatAddress(transaction.from_address)}
              </span>
            </div>
          </div>

          <span className={`amount ${transaction.type}`}>
            +{formatAmount(transaction.amount, transaction.display_symbol || '')}
          </span>
        </Link>
      </li>
    )
  }

  return (
    <li className="transaction-item">
      <div className="transaction-item__icon">
        {isSpinning ? (
          <PendingSpinner/>
        ) : (
          <SendIcon/>
        )}
      </div>

      <div className="transaction-details">
        <div className="transaction-main">
          <span className="transaction-type">
            Send
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
            To: {formatAddress(transaction.to_address)}
          </span>
        </div>
      </div>

      <span className={`amount ${transaction.type}`}>
        -{formatAmount(transaction.amount, transaction.display_symbol || '')}
      </span>
    </li>
  )
}

export default TransactionItem