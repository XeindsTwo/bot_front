const AmountSection = ({cryptoAmount, usdAmount}) => {
  return (
    <div className="amount-section">
      <div className="crypto-amount">
        {cryptoAmount}
      </div>
      <div className="usd-amount">
        ${usdAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
      </div>
    </div>
  )
}

export default AmountSection