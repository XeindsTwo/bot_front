import Header from '../components/Header/Header.jsx'
import Balance from '../components/Balance/Balance.jsx'
import AlphaTokens from '../components/AlphaTokens/AlphaTokens.jsx'
import HomeActions from "../components/HomeActions/HomeActions.jsx";

const HomePage = ({ tokens, hideBalance, setHideBalance }) => {
  return (
    <div className="trust-app">
      <Header />
      <Balance
        tokens={tokens}
        hideBalance={hideBalance}
        setHideBalance={setHideBalance}
      />
      <HomeActions />
      <AlphaTokens />
    </div>
  )
}

export default HomePage