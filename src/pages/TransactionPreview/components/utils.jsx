export const getNetworkIconName = (net) => {
  if (!net) return '';
  const netLower = net.toLowerCase();

  const mapping = {
    'bnb': 'bnb',
    'bsc': 'bnb',
    'bnb smart chain': 'bnb',
    'ethereum': 'eth',
    'erc20': 'eth',
    'tron': 'tron',
    'trc20': 'tron',
    'polygon': 'matic',
    'solana': 'sol',
    'ton': 'ton',
    'bitcoin': 'btc'
  };

  for (const key in mapping) {
    if (netLower.includes(key)) {
      return mapping[key];
    }
  }

  return '';
};

export const getNetworkIconNameFromFee = (feeCurrency) => {
  if (!feeCurrency) return '';
  const feeLower = feeCurrency.toLowerCase();

  const mapping = {
    'eth': 'eth',
    'bnb': 'bnb',
    'trx': 'tron',
    'matic': 'matic',
    'pol': 'matic'
  };

  for (const key in mapping) {
    if (feeLower.includes(key)) {
      return mapping[key];
    }
  }

  return '';
};

export const formatAddress = (address) => {
  if (!address) return '';
  if (address.length <= 20) return address;
  return `${address.substring(0, 15)}...${address.substring(address.length - 15)}`;
};

export const getTokenImage = (symbol) => {
  const cleanSymbol = symbol.split('_')[0];
  return `/images/tokens/${cleanSymbol.toLowerCase()}.png`;
};