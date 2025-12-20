import './FooterPanel.scss'
import {Link} from "react-router-dom";

import IconOne from "../../assets/images/icons/footer_panel/1.svg";
import IconTwo from "../../assets/images/icons/footer_panel/2.svg";
import IconThree from "../../assets/images/icons/footer_panel/3.svg";
import IconFour from "../../assets/images/icons/footer_panel/4.svg";
import IconFive from "../../assets/images/icons/footer_panel/5.svg";

const FooterPanel = () => {
  return (
    <nav className="footer-panel">
      <ul className="footer-panel__list">
        <li className="footer-panel__item">
          <Link className={"footer-panel__link active"} to={"/"}>
            <IconOne/>
            Home
          </Link>
        </li>
        <li className="footer-panel__item">
          <Link className={"footer-panel__link"} to={"/"}>
            <IconTwo/>
            Trending
          </Link>
        </li>
        <li className="footer-panel__item">
          <Link className={"footer-panel__link"} to={"/"}>
            <IconThree/>
            Swap
          </Link>
        </li>
        <li className="footer-panel__item">
          <Link className={"footer-panel__link"} to={"/"}>
            <IconFour/>
            Earn
          </Link>
        </li>
        <li className="footer-panel__item">
          <Link className={"footer-panel__link"} to={"/"}>
            <IconFive/>
            Discover
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default FooterPanel