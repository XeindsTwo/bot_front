import {useState, useEffect, useRef, useCallback} from 'react'
import {API_BASE_URL} from "@/config/api.js";

export const useWalletData = () => {
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(true)
  const [hideBalance, setHideBalance] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const didInit = useRef(false)

  const refreshAllData = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tokens/refresh-balances`, {
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
      return result
    } catch (error) {
      console.error('Ошибка обновления:', error)
      throw error
    }
  }, [])

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true

    const randomDelay = 2000 + Math.floor(Math.random() * 1000)

    setTimeout(async () => {
      try {
        await refreshAllData()
      } catch (err) {
        console.error('Ошибка инициализации:', err)
      } finally {
        setLoading(false)
        setTimeout(() => setShowPulse(false), 300)
      }
    }, randomDelay)
  }, [refreshAllData])

  return {
    tokens,
    loading,
    hideBalance,
    setHideBalance,
    showPulse,
    refreshAllData
  }
}