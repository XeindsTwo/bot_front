import './DetailRow.scss';

const DetailRow = ({label, value, isAddress = false, isTotal = false, feeData = null}) => {
  const renderValue = () => {
    if (feeData) {
      const {amount, currency, networkIconName} = feeData;
      return (
          <div className="detail-transaction-row__value detail-transaction-row__value--with-icon">
            <span className="detail-transaction-row__fee-amount">{amount} {currency}</span>
            {networkIconName && (
                <img
                    src={`/images/networks/${networkIconName}.png`}
                    alt="network"
                    className="detail-transaction-row__network-icon"
                    width={18}
                    height={18}
                />
            )}
          </div>
      );
    }

    return (
        <span className={`
        detail-transaction-row__value 
        ${isAddress ? 'detail-transaction-row__value--address' : ''} 
        ${isTotal ? 'detail-transaction-row__value--total' : ''}
      `}>
        {value}
      </span>
    );
  };

  return (
      <div className={`
      detail-transaction-row 
      ${isTotal ? 'detail-transaction-row--total' : ''}
    `}>
        <span className="detail-transaction-row__label">{label}</span>
        {renderValue()}
      </div>
  );
};

export default DetailRow;