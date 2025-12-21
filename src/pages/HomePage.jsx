import Header from '../components/Header/Header.jsx'
import Balance from '../components/Balance/Balance.jsx'
import AlphaTokens from '../components/AlphaTokens/AlphaTokens.jsx'
import HomeActions from "../components/HomeActions/HomeActions.jsx"
import CryptoList from "@/components/CryptoList/CryptoList.jsx"
import FooterPanel from "@/components/FooterPanel/FooterPanel.jsx"

const HomePage = ({ tokens, loading, hideBalance, setHideBalance, onRefresh, showPulse }) => {
  return (
    <>
      <Header />
      <Balance
        tokens={tokens}
        hideBalance={hideBalance}
        setHideBalance={setHideBalance}
        onRefresh={onRefresh}
        showPulse={showPulse}
      />
      <HomeActions />
      <div className="trust-main">
        <div className="trust-main__wrapper">
          <AlphaTokens />
          <CryptoList tokens={tokens} loading={loading} />
        </div>
      </div>
      <FooterPanel />
    </>
  )
}

export default HomePage