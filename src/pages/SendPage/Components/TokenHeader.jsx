const TokenHeader = ({ symbol, imageUrl, network }) => {
  return (
    <div className="token-image-container">
      <div className="token-icon-wrapper">
        <img
          src={imageUrl}
          alt={symbol}
          className="token-image"
          width={36}
          height={36}
        />
        {network && network.trim() !== '' && (
          <img
            src={`/images/networks/${network.toLowerCase()}.png`}
            alt={network}
            className="token-network-badge"
            width={16}
            height={16}
          />
        )}
      </div>
      <span>on {symbol}</span>
    </div>
  )
}

export default TokenHeader