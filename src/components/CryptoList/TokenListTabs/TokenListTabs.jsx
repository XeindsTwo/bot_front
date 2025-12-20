import './TokenListTabs.scss'
import {Link} from 'react-router-dom'
import HistoryIcon from '../../../assets/images/icons/history-main.svg'

const TokenListTabs = () => {
  return (
    <div className="token-list-tabs">
      <div className="token-list-tabs__buttons">
        <button className="token-list-tabs__button active" type="button">Crypto</button>
        <button className="token-list-tabs__button" type="button">NFTs</button>
        <button className="token-list-tabs__button" type="button">Approvals</button>
      </div>
      <Link className="token-list-tabs__history" to="/#">
        <HistoryIcon/>
      </Link>
    </div>
  )
}

export default TokenListTabs