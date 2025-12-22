export const getTokenImage = (symbol) => {
  if (!symbol) return '/images/tokens/default.png'

  let symbolLower = symbol.toLowerCase()

  // Обрабатываем USDT на разных сетях (USDT_ERC20, USDT_BEP20, USDT_TRC20)
  if (symbolLower.includes('usdt_')) {
    return '/images/tokens/usdt.png'
  }

  // Стандартный маппинг
  const imageMap = {
    'bnb': 'bnb.png',
    'btc': 'btc.png',
    'eth': 'eth.png',
    'matic': 'matic.png',
    'pol': 'matic.png',
    'tron': 'tron.png',
    'trx': 'tron.png',
    'sol': 'sol.png',
    'ton': 'ton.png',
    'usdt': 'usdt.png',
    'twt': 'twt.png',
    'usdt_erc20': 'usdt.png',
    'usdt_bep20': 'usdt.png',
    'usdt_trc20': 'usdt.png',
  }

  return `/images/tokens/${imageMap[symbolLower] || 'default.png'}`
}

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A'

  try {
    const date = new Date(dateString)

    // Проверка валидности даты
    if (isNaN(date.getTime())) {
      return dateString // Возвращаем оригинальную строку если невалидная дата
    }

    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    console.error('Error formatting date:', error, dateString)
    return dateString
  }
}

export const formatAddress = (address) => {
  if (!address || address === 'N/A' || address === '') return 'N/A'

  // Если адрес уже отформатирован (содержит ...)
  if (address.includes('...')) return address

  // Если адрес слишком короткий
  if (address.length <= 18) return address

  return `${address.substring(0, 10)}...${address.substring(address.length - 8)}`
}

export const getTitle = (transaction) => {
  if (!transaction) return 'Transaction'

  const symbol = transaction.token?.symbol || ''
  const typeText = transaction.type === 'income' ? 'Receive' : 'Send'

  // Добавляем network в заголовок если он есть
  const network = transaction.token?.network || transaction.network
  const networkText = network ? ` (${network.toUpperCase()})` : ''

  return `${typeText} ${symbol}${networkText}`
}

// Новая функция: проверка является ли токен USDT вариантом
export const isUsdtToken = (symbol) => {
  if (!symbol) return false
  const lowerSymbol = symbol.toLowerCase()
  return lowerSymbol.includes('usdt')
}

// Новая функция: получение короткого имени сети для отображения
export const getNetworkDisplay = (network) => {
  if (!network || network.trim() === '') return ''

  const lowerNetwork = network.toLowerCase()

  const networkDisplay = {
    'eth': 'ETH',
    'bnb': 'BNB',
    'tron': 'TRON',
    'matic': 'POL',
    'btc': 'BTC',
    'sol': 'SOL',
    'ton': 'TON',
  }

  return networkDisplay[lowerNetwork] || network.toUpperCase()
}

// Новая функция: форматирование суммы с учетом типа токена
export const formatTokenAmount = (amount, isStablecoin = false) => {
  if (amount === null || amount === undefined || amount === 0) return '0.00'

  const numAmount = parseFloat(amount)

  if (isStablecoin) {
    return numAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  if (numAmount < 0.000001) return '0.00'
  if (numAmount < 0.001) return numAmount.toFixed(6)
  if (numAmount < 1) return numAmount.toFixed(4)
  if (numAmount < 1000) return numAmount.toFixed(2)

  return parseFloat(numAmount.toFixed(2)).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

// Новая функция: получение иконки сети для маленького бейджа
export const getNetworkIconPath = (network) => {
  if (!network || network.trim() === '') return null

  const lowerNetwork = network.toLowerCase()
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