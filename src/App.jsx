import { useEffect, useState } from 'react'
import { fetchTokens } from './api/walletApi'
import HomePage from './pages/HomePage'

function App() {
  const [tokens, setTokens] = useState([])
  const [, setLoading] = useState(true)
  const [hideBalance, setHideBalance] = useState(false)

  useEffect(() => {
    fetchTokens()
      .then(data => {
        setTokens(data.map(t => ({ ...t, symbol: t.symbol.toUpperCase() })))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="extension-wrapper">
      <HomePage
        tokens={tokens}
        hideBalance={hideBalance}
        setHideBalance={setHideBalance}
      />
    </div>
  )
}

export default App