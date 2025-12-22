import {useNavigate} from 'react-router-dom'
import SettingsIcon from '../../assets/images/icons/settings-header.svg'
import './PageHeader.scss'
import BackIcon from '../../assets/images/icons/back.svg'

const PageHeader = ({
                      title,
                      subtitle,
                      backUrl = "/",
                      showSettings = false,
                      onSettingsClick,
                      className = "",
                      rightComponent
                    }) => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    if (typeof backUrl === 'function') {
      backUrl()
    } else if (backUrl === -1) {
      navigate(-1)
    } else {
      navigate(backUrl)
    }
  }

  return (
    <header className={`page-header ${className}`}>
      <button
        onClick={handleBackClick}
        className="page-header__back"
        aria-label="Go back"
      >
        <BackIcon/>
      </button>

      <h1 className="page-header__title">
        {title}
        {subtitle && <span>{subtitle}</span>}
      </h1>

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