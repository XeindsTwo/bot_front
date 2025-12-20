import './TokenItem.scss'
import { Link } from 'react-router-dom'
import TokenIcon from '../TokenIcon/TokenIcon.jsx'
import CopyButton from '../CopyButton/CopyButton.jsx'

const TokenItem = ({ token }) => {
  const formatUSD = (num) => {
    if (num === null || num === undefined || num === 0) return '0.00'
    const rounded = parseFloat(num.toFixed(2))

    const parts = rounded.toFixed(2).split('.')
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    const decimalPart = parts[1]

    return `${integerPart},${decimalPart}`
  }

  const formatTokenAmount = (amount) => {
    if (amount === null || amount === undefined || amount === 0) return '0.00'

    if (amount < 0.000001) return '0.00'
    if (amount < 0.001) return amount.toFixed(6)
    if (amount < 1) return amount.toFixed(4)
    if (amount < 1000) return amount.toFixed(2)

    return parseFloat(amount.toFixed(2)).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  const {
    symbol,
    value = 0,
    balance_usd = 0,
    current_price = 1,
    price_change_24h = 0,
    network,
    address,
    full_name
  } = token

  return (
    <li>
      <Link
        to={`/token/${symbol.toLowerCase()}`}
        className="token-item"
      >
        <div className="token-item__left">
          <TokenIcon
            symbol={symbol}
            network={network}
          />
          <div className="token-item__info">
            <div className="token-item__info-top">
              <p className="token-item__name">
                {symbol}
                <span>{full_name}</span>
              </p>
              {address && <CopyButton address={address} />}
            </div>
            <p className="token-item__price">
              ${formatUSD(current_price)}
              <span className={`token-item__change ${price_change_24h >= 0 ? 'positive' : 'negative'}`}>
                {price_change_24h >= 0 ? '+' : ''}{price_change_24h.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>
        <div className="token-item__right">
          <p className="token-item__value">
            {formatTokenAmount(value)}
          </p>
          <p className="token-item__total">
            ${formatUSD(balance_usd)}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default TokenItem