import { useState } from 'react'
import TransactionItem from '../TransactionItem/TransactionItem'
import './TransactionList.scss'

const TransactionList = ({ groupedTransactions, onTransactionUpdate }) => {
  const [transactions, setTransactions] = useState(groupedTransactions)

  const handleStatusChange = (transactionId, newStatus) => {
    const updated = { ...transactions }

    Object.keys(updated).forEach(date => {
      updated[date] = updated[date].map(tx =>
        tx.id === transactionId ? { ...tx, status: newStatus } : tx
      )
    })

    setTransactions(updated)

    onTransactionUpdate?.(transactionId, newStatus)
  }

  if (Object.keys(transactions).length === 0) {
    return null
  }

  const sortedDates = Object.keys(transactions).sort((a, b) => {
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
            {transactions[date].map(tx => (
              <TransactionItem
                key={tx.id}
                transaction={tx}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionList