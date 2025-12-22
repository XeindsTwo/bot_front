import SendIcon from '../../assets/images/icons/send.svg'
import SwapIcon from '../../assets/images/icons/swap.svg'
import ReceiveIcon from '../../assets/images/icons/receive.svg'
import BuyIcon from '../../assets/images/icons/buy.svg'
import SellIcon from '../../assets/images/icons/sell.svg'
import {Link} from 'react-router-dom'
import './FooterPanelToken.scss'

const FooterPanelToken = ({tokenSymbol, tokenDbSymbol, tokenData}) => {
    return (
        <nav className="footer-panel none">
            <ul className="footer-panel-token">
                <li className="footer-panel-token__item">
                    <Link
                        className="footer-panel-token__link"
                        to={`/send/${tokenDbSymbol}`}
                        state={{
                            tokenData: {
                                ...tokenData,
                                symbol: tokenSymbol,
                                db_symbol: tokenDbSymbol,
                                network: tokenData?.network || ''
                            }
                        }}
                    >
                        <SendIcon/>
                    </Link>
                    <span className="footer-panel-token__name">Send</span>
                </li>
                <li className="footer-panel-token__item">
                    <a className="footer-panel-token__link" href="#">
                        <ReceiveIcon/>
                    </a>
                    <span className="footer-panel-token__name">Receive</span>
                </li>
                <li className="footer-panel-token__item">
                    <a className="footer-panel-token__link" href="#">
                        <SwapIcon/>
                    </a>
                    <span className="footer-panel-token__name">Swap</span>
                </li>
                <li className="footer-panel-token__item">
                    <a className="footer-panel-token__link accent" href="#">
                        <BuyIcon/>
                    </a>
                    <span className="footer-panel-token__name">Buy</span>
                </li>
                <li className="footer-panel-token__item">
                    <a className="footer-panel-token__link" href="#">
                        <SellIcon/>
                    </a>
                    <span className="footer-panel-token__name">Sell</span>
                </li>
            </ul>
        </nav>
    )
}

export default FooterPanelToken