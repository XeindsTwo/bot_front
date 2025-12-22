import './TokenHeader.scss';

const TokenHeader = ({displaySymbol, amount, previewData, networkIconName}) => {
  const getTokenImage = (symbol) => {
    const cleanSymbol = symbol.split('_')[0];
    return `/images/tokens/${cleanSymbol.toLowerCase()}.png`;
  };

  const shouldShowNetworkBadge = () => {
    const tokenLower = displaySymbol.toLowerCase();

    if (tokenLower.includes('usdt')) return true;
    if (tokenLower === 'twt') return true;

    const nativeTokens = ['eth', 'bnb', 'btc', 'matic', 'sol', 'ton', 'trx'];
    if (nativeTokens.includes(tokenLower)) return false;

    return Boolean(networkIconName);
  };

  return (
    <div className="transaction-review">
      <div className="transaction-review__wrapper">
        <img
          src={getTokenImage(displaySymbol)}
          alt={displaySymbol}
          onError={(e) => e.target.src = '/images/tokens/default.png'}
          className="transaction-review__image"
          width={36}
          height={36}
        />
        {shouldShowNetworkBadge() && networkIconName && (
          <img
            src={`/images/networks/${networkIconName}.png`}
            alt="network"
            className="transaction-review__badge"
            width={16}
            height={16}
          />
        )}
      </div>
      <div className="transaction-review__amount">
        <p className="transaction-review__crypto">{amount} {displaySymbol}</p>
        <p className="transaction-review__usd">
          ≈ ${previewData.amounts.amount_usd.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
        </p>
      </div>
    </div>
  );
};

export default TokenHeader;