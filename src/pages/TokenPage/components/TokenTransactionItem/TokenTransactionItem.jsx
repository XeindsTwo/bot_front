import {Link} from 'react-router-dom'
import ReceiveIcon from '@/assets/images/icons/receive_history.svg'
import SendIcon from '@/assets/images/icons/send_history.svg'

const TokenTransactionItem = ({transaction, tokenSymbol}) => {
  const isPending = false
  const isSpinning = false

  const formatAmount = (amount, displaySymbol) => {
    const num = parseFloat(amount)
    let formatted

    if (num >= 1000) {
      formatted = num.toLocaleString('en-US', {maximumFractionDigits: 0})
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

  if (transaction.type === 'income') {
    return (
      <li>
        <Link to={`/transaction/${transaction.id}`} className="transaction-item">
          <div className="transaction-item__icon">
            {isSpinning ? (
              <div className="pending-spinner">⏳</div>
            ) : (
              <ReceiveIcon/>
            )}
          </div>

          <div className="transaction-details">
            <div className="transaction-main">
              <span className="transaction-type">
                Receive
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

          <span className="amount income">
            +{formatAmount(transaction.amount_token, tokenSymbol || '')}
          </span>
        </Link>
      </li>
    )
  }

  return (
    <li className="transaction-item">
      <div className="transaction-item__icon">
        <SendIcon/>
      </div>

      <div className="transaction-details">
        <div className="transaction-main">
          <span className="transaction-type">
            Send
            {tokenSymbol ? ` ${tokenSymbol}` : ''}
          </span>
        </div>

        <div className="transaction-secondary">
          <span className="transaction-address">
            To: {formatAddress(transaction.to_address)}
          </span>
        </div>
      </div>

      <span className="amount outcome">
        -{formatAmount(transaction.amount_token, tokenSymbol || '')}
      </span>
    </li>
  )
}

export default TokenTransactionItem