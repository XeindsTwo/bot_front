import './CryptoList.scss'
import TokenItem from './TokenItem/TokenItem.jsx'
import TokenListTabs from './TokenListTabs/TokenListTabs.jsx'

const CryptoList = ({ tokens, loading }) => {
  if (loading) {
    return (
      <div className="crypto-list">
        <TokenListTabs />
        <div className="crypto-list__loading">
          <p>Loading tokens...</p>
        </div>
        <button className="crypto-list__manage" type="button">
          Manage crypto
        </button>
      </div>
    )
  }

  if (tokens.length === 0) {
    return (
      <div className="crypto-list">
        <TokenListTabs />
        <div className="crypto-list__empty">
          <p>No tokens found</p>
        </div>
        <button className="crypto-list__manage" type="button">
          Manage crypto
        </button>
      </div>
    )
  }

  return (
    <div className="crypto-list">
      <TokenListTabs />

      <ul className="crypto-list__items">
        {tokens.map((token) => (
          <TokenItem key={`${token.symbol}-${token.id}`} token={token} />
        ))}
      </ul>

      <button className="crypto-list__manage" type="button">
        Manage crypto
      </button>
    </div>
  )
}

export default CryptoList