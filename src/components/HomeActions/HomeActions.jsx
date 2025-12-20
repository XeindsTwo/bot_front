import './HomeActions.scss';

import SendIcon from '../../assets/images/icons/send.svg';
import SwapIcon from '../../assets/images/icons/swap.svg';
import FundIcon from '../../assets/images/icons/fund.svg';
import SellIcon from '../../assets/images/icons/sell.svg';
import EarnIcon from '../../assets/images/icons/earn.svg';

const HomeActions = () => {
  return (
    <ul className="home-actions">
      <li className="home-actions__item">
        <a className="home-actions__link" href="#">
          <SendIcon/>
        </a>
        <span className="home-actions__name">Send</span>
      </li>
      <li className="home-actions__item">
        <a className="home-actions__link" href="#">
          <SwapIcon/>
        </a>
        <span className="home-actions__name">Swap</span>
      </li>
      <li className="home-actions__item">
        <a className="home-actions__link accent" href="#">
          <FundIcon/>
        </a>
        <span className="home-actions__name">Fund</span>
      </li>
      <li className="home-actions__item">
        <a className="home-actions__link" href="#">
          <SellIcon/>
        </a>
        <span className="home-actions__name">Sell</span>
      </li>
      <li className="home-actions__item">
        <a className="home-actions__link" href="#">
          <EarnIcon/>
        </a>
        <span className="home-actions__name">Earn</span>
      </li>
    </ul>
  );
};

export default HomeActions;