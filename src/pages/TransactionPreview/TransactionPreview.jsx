import {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import PageHeader from '@/components/PageHeader/PageHeader'
import './TransactionPreview.scss'

const TransactionPreview = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {token, amount, to, tokenData} = location.state || {}

  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [previewData, setPreviewData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setLoading(true)

        const response = await fetch('http://localhost:8000/api/send/preview', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            token: token,
            amount: parseFloat(amount),
            to: to
          })
        })

        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const data = await response.json()
        if (data.success) {
          setPreviewData(data.preview)
        } else {
          throw new Error(data.detail || 'Ошибка расчета')
        }
      } catch (err) {
        setError(err.message || 'Ошибка загрузки')
      } finally {
        setLoading(false)
      }
    }

    if (token && amount && to) {
      fetchPreview()
    } else {
      navigate('/send/' + (token || 'ETH'))
    }
  }, [token, amount, to, navigate])

  const handleConfirm = async () => {
    try {
      setSending(true)

      const response = await fetch('http://localhost:8000/api/send/confirm', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token: token,
          amount: parseFloat(amount),
          to: to,
          network_fee: previewData?.amounts?.network_fee || 0,
          total_usd: previewData?.amounts?.total_usd || 0
        })
      })

      if (!response.ok) throw new Error('Ошибка отправки')

      const data = await response.json()
      if (data.success) {
        navigate('/history', {
          state: {
            newTransaction: data.transaction,
            message: 'Transaction sent!'
          }
        })
      }
    } catch (err) {
      setError('Ошибка отправки транзакции')
      setSending(false)
    }
  }

  const formatAddress = (address) => {
    if (!address) return ''
    if (address.length <= 16) return address
    return `${address.substring(0, 10)}...${address.substring(address.length - 6)}`
  }

  if (loading) {
    return (
      <div className="transaction-preview">
        <PageHeader title="Confirm" backUrl={-1}/>
        <div className="preview-card">
          <div className="loading-skeleton">
            <div className="skeleton-line wide"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !previewData) {
    return (
      <div className="transaction-preview">
        <PageHeader title="Error" backUrl={-1}/>
        <div className="error-state">
          <p>{error || 'Failed to load'}</p>
          <button onClick={() => navigate(-1)} className="back-btn">
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="transaction-preview">
      <PageHeader title="Confirm" backUrl={-1}/>

      <div className="preview-card">
        <div className="token-header">
          <div className="token-icon">
            <img
              src={`/images/tokens/${token.toLowerCase()}.png`}
              alt={token}
              onError={(e) => e.target.src = '/images/tokens/default.png'}
              width={48}
              height={48}
            />
          </div>
          <div className="token-info">
            <div className="token-symbol">{token}</div>
            <div className="token-network">{previewData.network}</div>
          </div>
          <div className="token-amount">
            <div className="amount-crypto">{amount} {token}</div>
            <div className="amount-usd">${previewData.amounts.amount_usd.toLocaleString()}</div>
          </div>
        </div>

        <div className="transaction-details">
          <div className="detail-row">
            <span className="detail-label">From</span>
            <span className="detail-value address">{formatAddress(previewData.addresses.from)}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">To</span>
            <span className="detail-value address">{formatAddress(previewData.addresses.to)}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Amount</span>
            <span className="detail-value">{amount} {token}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Network</span>
            <span className="detail-value">{previewData.network}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Network Fee</span>
            <span className="detail-value">
              {previewData.amounts.network_fee} {previewData.amounts.network_fee_currency}
            </span>
          </div>

          <div className="detail-row total">
            <span className="detail-label">Total USD</span>
            <span className="detail-value total-usd">
              ${previewData.amounts.total_usd.toLocaleString('en-US', {minimumFractionDigits: 2})}
            </span>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={sending}
          className="btn"
        >
          {sending ? 'Sending...' : 'Continue'}
        </button>
      </div>
    </div>
  )
}

export default TransactionPreview