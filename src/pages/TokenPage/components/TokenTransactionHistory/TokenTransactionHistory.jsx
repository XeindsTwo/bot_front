import {useState, useEffect} from 'react'
import TokenTransactionList from '../TokenTransactionList/TokenTransactionList.jsx'

const TokenTransactionHistory = ({
                                   tokenSymbol,
                                   transactions = [],
                                   isLoading = false,
                                   onLoadMore,
                                   showAllTransactions = false
                                 }) => {
  const [groupedTransactions, setGroupedTransactions] = useState({})

  const groupTransactionsByDate = (txs) => {
    const grouped = {}

    txs.forEach(tx => {
      const date = new Date(tx.date)
      const dateKey = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })

      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(tx)
    })

    return grouped
  }

  useEffect(() => {
    if (transactions.length > 0) {
      const grouped = groupTransactionsByDate(transactions)
      setGroupedTransactions(grouped)
    }
  }, [transactions])

  if (isLoading) {
    return (
      <div className="token-transaction-history loading">
        <div className="loading-spinner"></div>
        <p>Loading transactions...</p>
      </div>
    )
  }

  return (
    <div className="token-transaction-history">
      <TokenTransactionList
        groupedTransactions={groupedTransactions}
        tokenSymbol={tokenSymbol}
      />

      {!showAllTransactions && transactions.length > 10 && onLoadMore && (
        <button
          className="view-all-btn"
          onClick={onLoadMore}
        >
          View All Transactions
        </button>
      )}
    </div>
  )
}

export default TokenTransactionHistory