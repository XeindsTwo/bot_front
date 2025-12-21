import {useEffect, useRef, useState} from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import HomePage from './pages/HomePage'
import TransactionHistory from './pages/TransactionHistory/TransactionHistory'
import TransitionSpinner from './components/TransitionSpinner/TransitionSpinner'
import useTokenData from './hooks/useTokenData'

function App() {
  const {
    tokens,
    loading,
    hideBalance,
    setHideBalance,
    showPulse,
    refreshBalances
  } = useTokenData()

  const [isTransitioning, setIsTransitioning] = useState(false)
  const location = useLocation()
  const prevLocation = useRef(location.pathname)

  useEffect(() => {
    if (prevLocation.current !== location.pathname) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 800)
      return () => clearTimeout(timer)
    }
    prevLocation.current = location.pathname
  }, [location.pathname])

  return (
    <div className="extension-wrapper">
      {isTransitioning && <TransitionSpinner/>}

      <div className={`trust-app ${isTransitioning ? 'transitioning' : ''}`}>
        <Routes location={location}>
          <Route path="/" element={
            <HomePage
              tokens={tokens}
              loading={loading}
              hideBalance={hideBalance}
              setHideBalance={setHideBalance}
              onRefresh={refreshBalances}
              showPulse={showPulse}
            />
          }/>
          <Route path="/history" element={
            <TransactionHistory isTransitioning={isTransitioning}/>
          }/>
        </Routes>
      </div>
    </div>
  )
}

export default App