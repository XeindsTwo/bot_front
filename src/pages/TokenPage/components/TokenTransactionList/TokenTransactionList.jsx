import TokenTransactionItem from '../TokenTransactionItem/TokenTransactionItem.jsx'

const TokenTransactionList = ({groupedTransactions, tokenSymbol}) => {
  if (Object.keys(groupedTransactions).length === 0) {
    return null
  }

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    return new Date(b) - new Date(a)
  })

  return (
    <div className="transactions-list">
      {sortedDates.map(date => (
        <div key={date} className="transactions-date-group">
          <div className="date-header">
            <span className="date-label">{date}</span>
            <div className="date-divider"></div>
          </div>

          <div className="transactions-group">
            {groupedTransactions[date].map(tx => (
              <TokenTransactionItem
                key={tx.id}
                transaction={tx}
                tokenSymbol={tokenSymbol}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TokenTransactionList