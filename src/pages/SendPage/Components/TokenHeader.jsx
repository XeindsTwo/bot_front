const TokenHeader = ({ symbol, imageUrl, network, showBadge = true }) => {
  const getNetworkIconName = (net) => {
    if (!net) return '';
    const netLower = net.toLowerCase();

    const mapping = {
      'bnb': 'bnb',
      'bsc': 'bnb',
      'bep': 'bnb',
      'bnb smart chain': 'bnb',
      'ethereum': 'eth',
      'erc20': 'eth',
      'erc': 'eth',
      'eth': 'eth',
      'tron': 'tron',
      'trc20': 'tron',
      'trc': 'tron',
      'trx': 'tron',
      'polygon': 'matic',
      'matic': 'matic',
      'pol': 'matic',
      'solana': 'sol',
      'sol': 'sol',
      'ton': 'ton',
      'bitcoin': 'btc',
      'btc': 'btc'
    };

    for (const key in mapping) {
      if (netLower.includes(key)) {
        return mapping[key];
      }
    }

    return '';
  };

  const networkIconName = getNetworkIconName(network);
  const shouldShow = showBadge && networkIconName;

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
        {shouldShow && (
          <img
            src={`/images/networks/${networkIconName}.png`}
            alt={network}
            className="token-network-badge"
            width={16}
            height={16}
          />
        )}
      </div>
      {symbol && (
        <span className="network-label">{symbol}</span>
      )}
    </div>
  );
};

export default TokenHeader;