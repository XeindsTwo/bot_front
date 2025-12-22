import './DetailRow.scss';
import ExploreTransactionIcon from "../../../../assets/images/icons/explore_transaction.svg";
import InfoTransactionIcon from "../../../../assets/images/icons/info_transaction.svg";
import FeeNextIcon from "../../../../assets/images/icons/fee-next.svg";

const DetailRow = ({
                     label,
                     value,
                     isAddress = false,
                     isTotal = false,
                     feeData = null,
                     showExplorerIcon = false,
                     showInfoIcon = false
                   }) => {
  const renderValue = () => {
    if (feeData) {
      const {amount, currency, networkIconName, feeUsd} = feeData;
      return (
        <div className="detail-transaction-row__fee-container">
          <div className="detail-transaction-row__fee-section">
            <div className="detail-transaction-row__fee-top">
              {networkIconName && (
                <img
                  src={`/images/tokens/${networkIconName}.png`}
                  alt="network"
                  className="detail-transaction-row__network-icon"
                  width={16}
                  height={16}
                />
              )}
              <span className="detail-transaction-row__fee-usd">
                ${feeUsd}
              </span>
            </div>
            <div className="detail-transaction-row__fee-bottom">
              <span className="detail-transaction-row__fee-amount">
                {amount} {currency}
              </span>
            </div>
          </div>
          <FeeNextIcon className="detail-transaction-row__fee-next-icon"/>
        </div>
      );
    }

    const valueContent = (
      <span className={`
        detail-transaction-row__value 
        ${isAddress ? 'detail-transaction-row__value--address' : ''} 
        ${isTotal ? 'detail-transaction-row__value--total' : ''}
      `}>
        {value}
      </span>
    );

    if (showExplorerIcon && isAddress) {
      return (
        <div className="detail-transaction-row__value-with-explorer">
          {valueContent}
          <button
            className="detail-transaction-row__explorer-btn"
          >
            <ExploreTransactionIcon/>
          </button>
        </div>
      );
    }

    return valueContent;
  };

  const renderLabel = () => {
    if (showInfoIcon) {
      return (
        <p className="detail-transaction-row__label">
          {label}
          <InfoTransactionIcon className="detail-transaction-row__info-icon"/>
        </p>
      );
    }

    return <span className="detail-transaction-row__label">{label}</span>;
  };

  return (
    <div className={`
      detail-transaction-row 
      ${isTotal ? 'detail-transaction-row--total' : ''}
    `}>
      {renderLabel()}
      {renderValue()}
    </div>
  );
};

export default DetailRow;