import './CryptoList.scss'
import {Link} from 'react-router-dom'
import HistoryIcon from '../../assets/images/icons/history-main.svg'
import CopyButton from "@/components/CryptoList/CopyButton/CopyButton.jsx";

const CryptoList = () => {
  const tokens = [
    {
      symbol: 'USDT',
      network: 'Tron',
      balance: 1.115,
      price: 0.99,
      change24h: -0.01,
      valueUSD: 1114.86,
      address: '0x742d35Cc6634C0532925a3b844Bc9e'
    },
    {
      symbol: 'TRX',
      network: 'Tron',
      balance: 19.82758,
      price: 0.29,
      change24h: 1.82,
      valueUSD: 5.75,
      address: 'fdgdfgdgf'
    },
    {
      symbol: 'BNB',
      network: 'BNB Smart Chain',
      balance: 0,
      price: 964.33,
      change24h: -0.62,
      valueUSD: 0,
      address: '0x742d35Cc6634C0532925a3b844Bc9e'
    },
    {
      symbol: 'BTC',
      network: 'Bitcoin',
      balance: 0,
      price: 102141.17,
      change24h: -1.04,
      valueUSD: 0,
      address: '0x742d35Cc6634C0532925a3b844Bc9e'
    },
    {
      symbol: 'ETH',
      network: 'Ethereum',
      balance: 0,
      price: 3512.03,
      change24h: 2.71,
      valueUSD: 0,
      address: '0x742d35Cc6634C0532925a3b844Bc9e'
    },
    {
      symbol: 'POL',
      network: 'Polygon',
      balance: 0,
      price: 0.17,
      change24h: 7.76,
      valueUSD: 0,
      address: '0x742d35Cc6634C0532925a3b844Bc9e'
    },
    {
      symbol: 'TWT',
      network: 'BNB Smart Chain',
      balance: 0,
      price: 1.20,
      change24h: -0.16,
      valueUSD: 0,
      address: '0x742d35Cc6634C0532925a3b844Bc9e'
    }
  ]

  const formatNumber = (num) => {
    if (num >= 1000) {
      return num.toLocaleString('de-DE', {maximumFractionDigits: 0})
    }
    return num.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    })
  }

  return (
    <div className="crypto-list">
      <div className="crypto-list__top">
        <div className="crypto-list__tabs">
          <button className="crypto-list__tab active" type={"button"}>Crypto</button>
          <button className="crypto-list__tab" type={"button"}>NFTs</button>
          <button className="crypto-list__tab" type={"button"}>Approvals</button>
        </div>
        <Link className="crypto-list__history" to={"/#"}>
          <HistoryIcon></HistoryIcon>
        </Link>
      </div>
      <ul className="crypto-list__items">
        {tokens.map((token) => (
          <li key={token.symbol}>
            <Link
              to={`/token/${token.symbol.toLowerCase()}`}
              className="crypto-list__item"
            >
              <div className="crypto-list__left">
                <div className="crypto-list__circle">
                  <img className="crypto-list__big" width={40} height={40} src="/images/tokens/1.png"/>
                  <img className="crypto-list__small" width={18} height={18} src="/images/tokens/2.png"/>
                </div>
                <div className="crypto-list__info">
                  <div className="crypto-list__info-top">
                    <p className="crypto-list__name">
                      {token.symbol}
                      <span>{token.network}</span>
                    </p>
                    <CopyButton address={token.address}/>
                  </div>
                  <p className="crypto-list__price">
                    ${formatNumber(token.price)}
                    <span
                      className={`crypto-list__change ${
                        token.change24h >= 0 ? 'positive' : 'negative'
                      }`}
                    >
                      {token.change24h >= 0 ? '+' : ''}
                      {token.change24h.toFixed(2)}%
                     </span>
                  </p>
                </div>
              </div>
              <div className="crypto-list__right">
                <p className="crypto-list__value">
                  {formatNumber(token.balance)}
                </p>
                <p className="crypto-list__total">
                  ${formatNumber(token.valueUSD)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <button className="crypto-list__manage" type={"button"}>Manage crypto</button>
    </div>
  )
}

export default CryptoList