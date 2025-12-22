import {useState, useEffect, useRef} from 'react'
import {API_BASE_URL} from "@/config/api.js";

export const usePendingStatus = (transaction, onStatusChange) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const timeoutRef = useRef(null)
  const isCheckingRef = useRef(false)
  const mountedRef = useRef(true)

  const isPending = transaction.status?.toLowerCase() === 'pending'

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!isPending) {
      setIsSpinning(false)
      return
    }

    if (isCheckingRef.current) return

    setIsSpinning(true)
    isCheckingRef.current = true

    const checkStatus = async () => {
      if (!mountedRef.current) return

      try {
        const response = await fetch(`${API_BASE_URL}/api/transactions/${transaction.id}/status`)
        const data = await response.json()

        if (data.status && data.status.toLowerCase() === 'confirmed') {
          if (mountedRef.current) {
            setIsSpinning(false)
            onStatusChange?.(transaction.id, 'confirmed')
          }
          isCheckingRef.current = false
        } else {
          timeoutRef.current = setTimeout(() => {
            if (mountedRef.current) {
              checkStatus()
            }
          }, 5000 + Math.random() * 1000)
        }
      } catch (error) {
        console.error('Error checking transaction status:', error)
        if (mountedRef.current) {
          timeoutRef.current = setTimeout(() => {
            if (mountedRef.current) {
              checkStatus()
            }
          }, 10000)
        }
      }
    }

    const initialDelay = Math.random() * 5000
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        checkStatus()
      }
    }, initialDelay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      isCheckingRef.current = false
    }
  }, [transaction.id, isPending, onStatusChange])

  return {
    isPending,
    isSpinning
  }
}