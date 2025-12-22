export const getTokenImage = (symbol) => {
  if (!symbol) return '/images/tokens/default.png'
  const imageMap = {
    'bnb': 'bnb.png', 'btc': 'btc.png', 'eth': 'eth.png',
    'matic': 'matic.png', 'pol': 'matic.png', 'tron': 'tron.png',
    'trx': 'tron.png', 'sol': 'sol.png', 'ton': 'ton.png',
    'usdt': 'usdt.png', 'twt': 'twt.png',
  }
  return `/images/tokens/${imageMap[symbol.toLowerCase()] || 'default.png'}`
}

export const createValidators = (tokenData) => {
  const validateAddress = (address) => {
    if (!address) return ''
    if (address.length < 10) return 'Address is too short'
    if (address.length > 100) return 'Address is too long'
    return ''
  }

  const validateAmount = (amount) => {
    if (!amount) return ''
    const numAmount = parseFloat(amount)
    const balance = parseFloat(tokenData?.token_amount || 0)
    if (isNaN(numAmount)) return 'Invalid amount'
    if (numAmount <= 0) return 'Amount must be greater than 0'
    if (numAmount > balance) return 'Not enough balance'
    return ''
  }

  return { validateAddress, validateAmount }
}

export const getPreviewData = (formData, symbol, tokenData) => ({
  token: symbol,
  amount: formData.amount,
  to: formData.address,
  tokenData: tokenData
})