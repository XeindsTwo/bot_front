import {getTokenImage} from './transactionUtils'

const TokenIcon = ({symbol, network, dbSymbol}) => {
  const getNetworkIcon = () => {
    // Если нет сети - не показываем
    if (!network || network.trim() === '') return null

    const lowerNetwork = network.toLowerCase()
    const lowerSymbol = symbol?.toLowerCase() || ''
    const lowerDbSymbol = dbSymbol?.toLowerCase() || ''

    const nativeTokens = ['eth', 'btc', 'bnb', 'matic', 'pol', 'tron', 'trx', 'sol', 'ton', 'doge', 'ltc', 'ada']

    // Если токен нативный И сеть совпадает с токеном - не показываем иконку сети
    if (nativeTokens.includes(lowerSymbol) && lowerNetwork === lowerSymbol) {
      return null
    }

    if (lowerDbSymbol.includes('usdt_')) {
      // USDT на BNB сети → показываем BNB иконку
      // USDT на ETH сети → показываем ETH иконку
      // USDT на TRON сети → показываем TRON иконку
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

    // TWT на BNB сети - показываем BNB иконку
    if (lowerSymbol === 'twt' && lowerNetwork === 'bnb') {
      return '/images/networks/bnb.png'
    }

    // Остальные случаи - не показываем
    return null
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