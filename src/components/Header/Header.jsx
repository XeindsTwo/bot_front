import './Header.scss'

import ArrowMainAccount from '../../assets/images/icons/arrow-main-account.svg'
import OneIcon from '../../assets/images/icons/header/1.svg'
import TwoIcon from '../../assets/images/icons/header/2.svg'
import ThreeIcon from '../../assets/images/icons/header/3.svg'
import FourIcon from '../../assets/images/icons/header/4.svg'

const Header = () => {
  return (
    <div className="header">
      <div className="header__info">
        <p className="header__main">
          Main wallet
          <ArrowMainAccount width={12} height={12}/>
        </p>
        <p className="header__account">Account 1</p>
      </div>
      <div className="header__actions">
        <button className="header__btn" type={"button"}>
          <OneIcon/>
        </button>
        <button className="header__btn" type={"button"}>
          <TwoIcon/>
        </button>
        <button className="header__btn" type={"button"}>
          ️<ThreeIcon/>
        </button>
        <button className="header__btn" type={"button"}>
          <FourIcon/>
        </button>
      </div>
    </div>
  )
}

export default Header