import {useEffect, useRef, useState} from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import HomePage from './pages/HomePage'
import TransactionHistory from './pages/TransactionHistory/TransactionHistory'
import TokenPage from './pages/TokenPage/TokenPage'
import TransactionDetailPage from './pages/TransactionDetailPage/TransactionDetailPage'
import TransitionSpinner from './components/TransitionSpinner/TransitionSpinner'
import {useWalletData} from './hooks/useWalletData'
import SendPage from "@/pages/SendPage/SendPage.jsx";
import TransactionPreview from "@/pages/TransactionPreview/TransactionPreview.jsx";

function App() {
  const {
    tokens,
    loading,
    hideBalance,
    setHideBalance,
    showPulse,
    refreshAllData
  } = useWalletData()

  const [isTransitioning, setIsTransitioning] = useState(false)
  const location = useLocation()
  const prevLocation = useRef(location.pathname)

  useEffect(() => {
    if (prevLocation.current !== location.pathname) {
      setIsTransitioning(true)
      const timer = setTimeout(() => setIsTransitioning(false), 800)
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
              onRefresh={refreshAllData}
              showPulse={showPulse}
            />
          }/>
          <Route path="/history" element={
            <TransactionHistory isTransitioning={isTransitioning}/>
          }/>
          <Route path="/token/:symbol" element={
            <TokenPage isTransitioning={isTransitioning}/>
          }/>
          <Route path="/transaction/:id" element={
            <TransactionDetailPage/>
          }/>
          <Route path="/send/:symbol" element={<SendPage />} />
          <Route path="/send/preview" element={<TransactionPreview />} />
        </Routes>
      </div>
    </div>
  )
}

export default App