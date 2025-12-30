import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import PageHeader from "@/components/PageHeader/PageHeader.jsx"
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import TokenIcon from './components/TokenIcon'
import AmountSection from './components/AmountSection'
import DetailGrid from './components/DetailGrid'
import {getTitle} from './components/transactionUtils.jsx'
import './TransactionDetailPage.scss'
import {API_BASE_URL} from "@/config/api.js";

const TransactionDetailPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setTransaction(data)
      } catch (err) {
        setError('Failed to load transaction details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTransactionDetails()
    }
  }, [id])

  if (error) {
    return (
      <div className="transaction-detail">
        <PageHeader
          title={getTitle(transaction)}
          backUrl={-1}
        />
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <SkeletonTheme baseColor="#4D4D4E" highlightColor="#6B6B6B" speed={1}>
      <PageHeader
        title={loading ? 'Receive Transaction' : getTitle(transaction)}
        backUrl={-1}
      />

      <div className="trust-main">
        <div className="trust-main__wrapper none">
          {loading ? (
            <>
              <div className="token-icon-container">
                <Skeleton circle width={48} height={48}/>
              </div>

              <div className="amount-section">
                <Skeleton width={120} height={24} style={{margin: '0 auto 7px'}}/>
                <Skeleton width={80} height={16} style={{margin: '0 auto'}}/>
              </div>

              <div className="detail-grid">
                {Array.from({length: 8}).map((_, i) => (
                  <div key={i} className="detail-row">
                    <Skeleton width={100} height={17}/>
                    <Skeleton width={150} height={17}/>
                  </div>
                ))}
              </div>

              <div className="btn-container">
                <Skeleton height={52} borderRadius={55} width="100%"/>
              </div>
            </>
          ) : (
            <>
              <TokenIcon
                symbol={transaction.token?.symbol}
                network={transaction.token?.network || transaction.network}
                dbSymbol={transaction.token?.db_symbol}
              />

              <div className="detail-card">
                <AmountSection
                  cryptoAmount={transaction.amount_token_exact || transaction.amount_token}
                  usdAmount={transaction.amount_usd}
                />

                <DetailGrid transaction={transaction}/>
              </div>

              <div className="btn-container">
                <a
                  href={transaction.explorer_link || '#'}
                  target={transaction.explorer_link ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`btn ${!transaction.explorer_link ? 'btn--disabled' : ''}`}
                  onClick={!transaction.explorer_link ? (e) => e.preventDefault() : undefined}
                >
                  View on explorer
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default TransactionDetailPage