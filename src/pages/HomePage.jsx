import Header from '../components/Header/Header.jsx'
import Balance from '../components/Balance/Balance.jsx'
import AlphaTokens from '../components/AlphaTokens/AlphaTokens.jsx'
import HomeActions from "../components/HomeActions/HomeActions.jsx"
import CryptoList from "@/components/CryptoList/CryptoList.jsx"
import FooterPanel from "@/components/FooterPanelMain/FooterPanel.jsx"

const HomePage = ({
                    tokens,
                    loading,
                    hideBalance,
                    setHideBalance,
                    onRefresh,
                    showPulse,
                    onHomeClick,
                    isRefreshing = false
                  }) => {
  return (
    <>
      <Header />
      <Balance
        tokens={tokens}
        hideBalance={hideBalance}
        setHideBalance={setHideBalance}
        onRefresh={onRefresh}
        showPulse={showPulse || isRefreshing}
        isRefreshing={isRefreshing} // Новый пропс
      />
      <HomeActions />
      <div className="trust-main">
        <div className="trust-main__wrapper">
          <AlphaTokens />
          <CryptoList tokens={tokens} loading={loading || isRefreshing} />
        </div>
      </div>
      <FooterPanel onHomeClick={onHomeClick} />
    </>
  )
}

export default HomePage