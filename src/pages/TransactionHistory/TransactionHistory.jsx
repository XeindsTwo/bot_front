import { useState, useEffect, useRef, useCallback } from 'react'
import PageHeader from "@/components/PageHeader/PageHeader.jsx";
import TransactionList from './components/TransactionList/TransactionList'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import FooterPanel from '../../components/FooterPanelMain/FooterPanel'
import './TransactionHistory.scss'
import {API_BASE_URL} from "@/config/api.js";

const TransactionHistory = ({ isTransitioning, onBackToHome }) => {
  const [transactions, setTransactions] = useState([])
  const [groupedTransactions, setGroupedTransactions] = useState({})
  const [loading, setLoading] = useState(true)
  const hasFetched = useRef(false)

  const groupTransactionsByDate = (transactions) => {
    const grouped = {}

    transactions.forEach(tx => {
      const dateStr = tx.date
      const date = new Date(dateStr)
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

  const handleTransactionUpdate = useCallback((transactionId, newStatus) => {
    setTransactions(prev => prev.map(tx =>
      tx.id === transactionId ? { ...tx, status: newStatus } : tx
    ))

    setGroupedTransactions(prev => {
      const updated = { ...prev }
      Object.keys(updated).forEach(date => {
        updated[date] = updated[date].map(tx =>
          tx.id === transactionId ? { ...tx, status: newStatus } : tx
        )
      })
      return updated
    })
  }, [])

  useEffect(() => {
    if (hasFetched.current || isTransitioning) return

    const loadTransactions = async () => {
      try {
        hasFetched.current = true

        const minDelay = 2000
        const maxDelay = 4000
        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay

        const [response] = await Promise.all([
          fetch(`${API_BASE_URL}/api/transactions`),
          new Promise(resolve => setTimeout(resolve, delay))
        ])

        if (!response.ok) throw new Error('API error')
        const data = await response.json()

        setTransactions(data)
        const grouped = groupTransactionsByDate(data)
        setGroupedTransactions(grouped)
      } catch (err) {
        console.error('Ошибка загрузки транзакций:', err)
        hasFetched.current = false
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()

    return () => {
      if (!isTransitioning) {
        hasFetched.current = false
      }
    }
  }, [isTransitioning])

  const handleLoadMore = () => {
    console.log('Load more clicked')
  }

  return (
    <>
      <PageHeader
        title="History"
        backUrl={onBackToHome || "/"}
        showSettings={false}
      />

      <div className="transactions-container">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <TransactionList
              groupedTransactions={groupedTransactions}
              onTransactionUpdate={handleTransactionUpdate}
            />

            {transactions.length > 0 && (
              <button
                data-testid="show-more-btn"
                className="trust-load-more-btn"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            )}
          </>
        )}
      </div>

      <FooterPanel onHomeClick={onBackToHome} />
    </>
  )
}

export default TransactionHistory