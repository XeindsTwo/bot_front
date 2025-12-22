import DetailRow from './DetailRow'
import {formatDateTime, formatAddress} from './transactionUtils'

const DetailGrid = ({transaction}) => {
  if (!transaction) return null

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
        value={`${transaction.amount_token} ${transaction.token?.symbol}`}
      />

      {transaction.fee > 0 && (
        <DetailRow
          label="Network Fee"
          value={`${transaction.fee} ${transaction.fee_currency}`}
        />
      )}

        {transaction.network && transaction.network.trim() !== '' && (
            <DetailRow
                label="Network"
                value={transaction.network}
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