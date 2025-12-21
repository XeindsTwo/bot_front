import { useEffect, useRef, useState } from 'react'

const useTokenData = () => {
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(true)
  const [hideBalance, setHideBalance] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const didInit = useRef(false)

  const refreshBalances = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tokens/refresh-balances', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Ошибка обновления')
      }

      const result = await response.json()

      if (result.success && result.tokens) {
        setTokens(result.tokens)
      }
    } catch (error) {
      console.error('Ошибка обновления:', error)
      if (tokens.length === 0) {
        alert(`Ошибка загрузки: ${error.message}`)
      }
    }
  }

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true

    const randomDelay = 2000 + Math.floor(Math.random() * 1000)

    setTimeout(() => {
      refreshBalances().finally(() => {
        setLoading(false)
        setTimeout(() => setShowPulse(false), 300)
      })
    }, randomDelay)
  }, [])

  return {
    tokens,
    loading,
    hideBalance,
    setHideBalance,
    showPulse,
    refreshBalances
  }
}

export default useTokenData