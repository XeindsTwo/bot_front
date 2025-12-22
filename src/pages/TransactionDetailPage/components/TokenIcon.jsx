import {getTokenImage} from './transactionUtils'

const TokenIcon = ({symbol, network}) => {
  const getNetworkIcon = () => {
    if (!network || network.trim() === '') return null

    const lowerNetwork = network.toLowerCase()

    const networkIcons = {
      'eth': 'eth.png',
      'bnb': 'bnb.png',
      'tron': 'tron.png',
      'matic': 'matic.png',
      'btc': 'btc.png',
      'sol': 'sol.png',
      'ton': 'ton.png',
    }

    const iconName = networkIcons[lowerNetwork]
    if (!iconName) return null

    return `/images/networks/${iconName}`
  }

  const networkIconPath = getNetworkIcon()

  return (
    <div className="token-icon-container">
      <div className="token-icon-wrapper">
        <img
          width={48}
          height={48}
          src={getTokenImage(symbol)}
          alt={symbol || 'Token'}
          className="token-icon"
        />
        {networkIconPath && (
          <img
            src={networkIconPath}
            alt={network}
            className="token-network-icon"
            width={21}
            height={21}
          />
        )}
      </div>
    </div>
  )
}

export default TokenIcon