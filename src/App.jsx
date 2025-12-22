import {useEffect, useRef, useState, useCallback} from 'react'
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom'
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
  const [homeRefreshing, setHomeRefreshing] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const prevLocation = useRef(location.pathname)

  // Функция для перехода на Home с обновлением (ТОЛЬКО из истории)
  const navigateToHome = useCallback(async () => {
    const fromHistory = location.pathname === '/history'

    if (fromHistory) {
      // Для истории: сначала спиннер, потом обновление с долгой анимацией
      setIsTransitioning(true)

      // Сначала навигация
      navigate('/')

      // Даем время показать спиннер
      setTimeout(() => {
        setIsTransitioning(false)
        setHomeRefreshing(true)

        // Обновляем баланс
        refreshAllData().finally(() => {
          // Держим анимацию пульсации подольше
          setTimeout(() => {
            setHomeRefreshing(false)
          }, 2000) // 2 секунды чтобы увидеть анимацию
        })
      }, 800) // Спиннер показывается 0.8 секунды
    } else {
      // Для других страниц: обычный быстрый переход
      setIsTransitioning(true)
      navigate('/')
      setTimeout(() => setIsTransitioning(false), 300)
    }
  }, [navigate, refreshAllData, location.pathname])

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
              loading={loading || homeRefreshing}
              hideBalance={hideBalance}
              setHideBalance={setHideBalance}
              onRefresh={refreshAllData}
              showPulse={showPulse || homeRefreshing}
              isRefreshing={homeRefreshing}
            />
          }/>
          <Route path="/history" element={
            <TransactionHistory
              isTransitioning={isTransitioning}
              onBackToHome={navigateToHome}
            />
          }/>
          <Route path="/token/:symbol" element={
            <TokenPage
              isTransitioning={isTransitioning}
              onBackToHome={navigateToHome}
            />
          }/>
          <Route path="/transaction/:id" element={
            <TransactionDetailPage
              onBackToHome={navigateToHome}
            />
          }/>
          <Route path="/send/:symbol" element={
            <SendPage
              onBackToHome={navigateToHome}
            />
          } />
          <Route path="/send/preview" element={
            <TransactionPreview
              onBackToHome={navigateToHome}
            />
          } />
        </Routes>
      </div>
    </div>
  )
}

export default App