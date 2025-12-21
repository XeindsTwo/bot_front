import {Link} from 'react-router-dom'
import SettingsIcon from '../../assets/images/icons/settings-header.svg'
import './PageHeader.scss'
import BackIcon from '../../assets/images/icons/back.svg'

const PageHeader = ({
                      title,
                      backUrl = "/",
                      showSettings = false,
                      onSettingsClick,
                      className = "",
                      rightComponent
                    }) => {
  return (
    <header className={`page-header ${className}`}>
      <Link to={backUrl} className="page-header__back">
        <BackIcon/>
      </Link>
      <h1 className="page-header__title">{title}</h1>
      <div className="page-header__right">
        {rightComponent ? (
          rightComponent
        ) : showSettings ? (
          <button
            className="page-header__settings"
            onClick={onSettingsClick}
            aria-label="Settings"
          >
            <SettingsIcon/>
          </button>
        ) : (
          <div className="page-header__spacer"/>
        )}
      </div>
    </header>
  )
}

export default PageHeader