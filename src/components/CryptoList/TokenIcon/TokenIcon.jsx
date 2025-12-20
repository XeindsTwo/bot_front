import './TokenIcon.scss'

const TokenIcon = ({symbol, size = 40, network}) => {
  const getIconPath = (sym) => {
    const lowerSymbol = sym.toLowerCase()
    return `/images/tokens/${lowerSymbol}.png`
  }

  return (
    <div className="token-icon">
      <img
        className="token-icon__main"
        src={getIconPath(symbol)}
        alt={symbol}
        width={size}
        height={size}
      />
      {network && (
        <img
          className="token-icon__network"
          src={`/images/networks/${network.toLowerCase()}.png`}
          alt={network}
          width={18}
          height={18}
        />
      )}
    </div>
  )
}

export default TokenIcon