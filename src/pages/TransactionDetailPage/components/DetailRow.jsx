import InfoTransactionIcon from "../../../assets/images/icons/info_transaction.svg"
import ExploreTransactionIcon from "../../../assets/images/icons/explore_transaction.svg"
import CopyHashIcon from "../../../assets/images/icons/copy_hash.svg"
import ConfirmedTransactionIcon from "../../../assets/images/icons/confirmed_transaction.svg"

const DetailRow = ({
                     label,
                     value,
                     type = 'text',
                     showIcon = false,
                     iconType = 'info',
                     onIconClick
                   }) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'explore':
        return <ExploreTransactionIcon/>
      case 'copy':
        return <CopyHashIcon/>
      case 'info':
        return <InfoTransactionIcon/>
      default:
        return null
    }
  }

  const renderValue = () => {
    if (type === 'status') {
      return (
        <span className={`detail-value status-${value}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
          {showIcon && <ConfirmedTransactionIcon/>}
        </span>
      )
    }

    if (type === 'address' || type === 'hash') {
      return (
        <div className="detail-row__right">
          <span className={`detail-value ${type}`}>{value}</span>
          {showIcon && (
            <button type="button" onClick={onIconClick}>
              {renderIcon()}
            </button>
          )}
        </div>
      )
    }

    return <span className="detail-value">{value}</span>
  }

  return (
    <div className="detail-row">
      <span className={`detail-label ${onIconClick ? 'cursor' : ''}`}>
        {label}
        {label === 'Total USD' && <InfoTransactionIcon/>}
      </span>
      {renderValue()}
    </div>
  )
}

export default DetailRow