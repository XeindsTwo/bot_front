import DetailRow from './DetailRow'
import {formatDateTime, formatAddress} from './transactionUtils'

const DetailGrid = ({transaction}) => {
  if (!transaction) return null

  const getNetworkDisplay = () => {
    if (transaction.token?.network && transaction.token.network.trim() !== '') {
      return transaction.token.network.toUpperCase()
    }

    const networkMap = {
      'eth': 'ETH',
      'btc': 'BTC',
      'bnb': 'BNB',
      'matic': 'MATIC',
      'pol': 'MATIC',
      'tron': 'TRON',
      'trx': 'TRON',
      'sol': 'SOL',
      'ton': 'TON',
      'twt': 'BNB',
      'doge': 'DOGE',
      'ltc': 'LTC',
      'ada': 'ADA'
    }

    return networkMap[transaction.token?.db_symbol?.toLowerCase()] || ''
  }

  const networkDisplay = getNetworkDisplay()

  return (
    <div className="detail-grid">
      <DetailRow
        label="Status"
        value={transaction.status}
        type="status"
        showIcon={true}
      />

      <DetailRow
        label="Time"
        value={formatDateTime(transaction.date)}
      />

      {transaction.from_address && (
        <DetailRow
          label="From"
          value={formatAddress(transaction.from_address)}
          type="address"
          showIcon={true}
          iconType="explore"
        />
      )}

      {transaction.to_address && (
        <DetailRow
          label="To"
          value={formatAddress(transaction.to_address)}
          type="address"
          showIcon={true}
          iconType="explore"
        />
      )}

      {transaction.tx_hash && (
        <DetailRow
          label="Hash"
          value={formatAddress(transaction.tx_hash)}
          type="hash"
          showIcon={true}
          iconType="copy"
        />
      )}

      <DetailRow
        label="Amount"
        value={`${transaction.amount_token_exact || transaction.amount_token} ${transaction.token?.symbol}`}
      />

      {(transaction.fee_token_exact > 0 || transaction.fee_token > 0) && (
        <DetailRow
          label="Network Fee"
          value={`${transaction.fee_token || transaction.fee_token_exact} ${transaction.fee_currency}`}
        />
      )}

      {networkDisplay && (
        <DetailRow
          label="Network"
          value={networkDisplay}
        />
      )}

      <DetailRow
        label="Total USD"
        value={`$${transaction.total_usd.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`}
      />
    </div>
  )
}
export default DetailGrid