import './FooterPanel.scss'
import {Link, useLocation} from "react-router-dom";

import IconOne from "../../assets/images/icons/footer_panel/1.svg";
import IconTwo from "../../assets/images/icons/footer_panel/2.svg";
import IconThree from "../../assets/images/icons/footer_panel/3.svg";
import IconFour from "../../assets/images/icons/footer_panel/4.svg";
import IconFive from "../../assets/images/icons/footer_panel/5.svg";

const FooterPanel = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="footer-panel">
      <ul className="footer-panel__list">
        <li className="footer-panel__item">
          <Link
            className={`footer-panel__link ${currentPath === '/' ? 'active' : ''}`}
            to={"/"}
          >
            <IconOne/>
            Home
          </Link>
        </li>
        <li className="footer-panel__item">
          <Link
            className={`footer-panel__link ${currentPath === '/trending' ? 'active' : ''}`}
            to={"/trending"}
          >
            <IconTwo/>
            Trending
          </Link>
        </li>
        <li className="footer-panel__item">
          <Link
            className={`footer-panel__link ${currentPath === '/swap' ? 'active' : ''}`}
            to={"/swap"}
          >
            <IconThree/>
            Swap
          </Link>
        </li>
        <li className="footer-panel__item">
          <Link
            className={`footer-panel__link ${currentPath === '/earn' ? 'active' : ''}`}
            to={"/earn"}
          >
            <IconFour/>
            Earn
          </Link>
        </li>
        <li className="footer-panel__item">
          <Link
            className={`footer-panel__link ${currentPath === '/discover' ? 'active' : ''}`}
            to={"/discover"}
          >
            <IconFive/>
            Discover
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default FooterPanel