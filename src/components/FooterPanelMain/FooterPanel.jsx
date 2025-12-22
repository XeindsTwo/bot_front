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
            onClick={(e) => e.preventDefault()}
            aria-disabled="true"
          >
            <IconTwo/>
            Trending
          </Link>
        </li>
        <li className="footer-panel__item">
          <Link
            className={`footer-panel__link ${currentPath === '/swap' ? 'active' : ''}`}
            to={"/swap"}
            onClick={(e) => e.preventDefault()}
            aria-disabled="true"
          >
            <IconThree/>
            Swap
          </Link>
        </li>
        <li className="footer-panel__item">
          <Link
            className={`footer-panel__link ${currentPath === '/earn' ? 'active' : ''}`}
            to={"/earn"}
            onClick={(e) => e.preventDefault()}
            aria-disabled="true"
          >
            <IconFour/>
            Earn
          </Link>
        </li>
        <li className="footer-panel__item">
          <Link
            className={`footer-panel__link ${currentPath === '/discover' ? 'active' : ''}`}
            to={"/discover"}
            onClick={(e) => e.preventDefault()}
            aria-disabled="true"
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