export const isNativeCoin = (tokenSymbol, networkName) => {
  const token = tokenSymbol?.toUpperCase() || '';
  const network = networkName?.toLowerCase() || '';

  const nativeMap = {
    'ETH': ['ethereum', 'eth', 'erc'],
    'BTC': ['bitcoin', 'btc'],
    'BNB': ['bnb smart chain', 'bsc', 'bnb', 'bep'],
    'MATIC': ['polygon', 'matic', 'pol'],
    'POL': ['polygon', 'matic', 'pol'],
    'TRX': ['tron', 'trx', 'trc'],
    'TON': ['ton'],
    'SOL': ['solana', 'sol'],
    'TWT': ['bnb smart chain', 'bsc', 'bnb', 'bep'],
  };

  const nativeNetworks = nativeMap[token];
  if (!nativeNetworks) return false;

  return nativeNetworks.some(nativeNetwork =>
    network.includes(nativeNetwork.toLowerCase())
  );
};

export const getNetworkIconName = (network) => {
  if (!network) return null;

  const networkLower = network.toLowerCase();

  if (networkLower === 'eth' || networkLower === 'erc' || networkLower === 'erc20' || networkLower === 'eth') return 'eth';
  if (networkLower === 'bnb' || networkLower === 'bsc' || networkLower === 'bep' || networkLower === 'bep20' || networkLower === 'bnb smart chain') return 'bnb';
  if (networkLower === 'tron' || networkLower === 'trx' || networkLower === 'trc' || networkLower === 'trc20') return 'tron';
  if (networkLower === 'matic' || networkLower === 'pol' || networkLower === 'polygon') return 'matic';
  if (networkLower === 'ton') return 'ton';
  if (networkLower === 'sol' || networkLower === 'solana') return 'sol';
  if (networkLower === 'btc' || networkLower === 'bitcoin') return 'btc';

  if (networkLower.includes('ethereum')) return 'eth';
  if (networkLower.includes('bnb smart chain') || networkLower.includes('bep')) return 'bnb';
  if (networkLower.includes('tron')) return 'tron';
  if (networkLower.includes('polygon')) return 'matic';
  if (networkLower.includes('ton')) return 'ton';
  if (networkLower.includes('solana')) return 'sol';
  if (networkLower.includes('bitcoin')) return 'btc';

  return null;
};

export const getNetworkIconNameFromFee = (feeCurrency) => {
  if (!feeCurrency) return '';
  const feeLower = feeCurrency.toLowerCase();

  const mapping = {
    'eth': 'eth',
    'bnb': 'bnb',
    'trx': 'tron',
    'matic': 'matic',
    'pol': 'matic',
    'tron': 'tron',
    'ton': 'ton',
    'sol': 'sol',
    'btc': 'btc',
    'twt': 'bnb',
  };

  if (mapping[feeLower]) {
    return mapping[feeLower];
  }

  for (const key in mapping) {
    if (feeLower.includes(key)) {
      return mapping[key];
    }
  }

  if (feeLower.includes('usdt')) {
    if (feeLower.includes('bep') || feeLower.includes('bnb')) return 'bnb';
    if (feeLower.includes('trc') || feeLower.includes('tron')) return 'tron';
    if (feeLower.includes('erc') || feeLower.includes('eth')) return 'eth';
    return 'eth';
  }

  if (feeLower.includes('erc') || feeLower.includes('eth')) return 'eth';
  if (feeLower.includes('bep') || feeLower.includes('bnb')) return 'bnb';
  if (feeLower.includes('trc') || feeLower.includes('tron')) return 'tron';

  return feeLower.split('_')[0] || 'default';
};

export const normalizeTokenSymbol = (symbol) => {
  if (!symbol) return 'default';

  const symbolLower = symbol.toLowerCase();

  if (symbolLower === 'pol') return 'matic';
  if (symbolLower === 'trx') return 'tron';
  if (symbolLower.includes('usdt')) return 'usdt';

  return symbolLower.split('_')[0];
};

export const formatAddress = (address, type = 'medium') => {
  if (!address) return '';

  if (type === 'short') {
    if (address.length <= 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  if (address.length <= 20) return address;
  return `${address.substring(0, 13)}...${address.substring(address.length - 13)}`;
};

export const getTokenImage = (symbol) => {
  const cleanSymbol = normalizeTokenSymbol(symbol);
  return `/images/tokens/${cleanSymbol}.png`;
};