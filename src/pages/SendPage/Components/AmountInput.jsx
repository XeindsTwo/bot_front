const AmountInput = ({
                       value, onChange, onBlur, error, touched,
                       onMaxClick, balance, symbol, inputRef
                     }) => {
  return (
    <div className="form-group">
      <label htmlFor="amount">Amount</label>
      <div className="amount-input-wrapper">
        <input
          ref={inputRef}
          type="number"
          step="any"
          id="amount"
          className={error && touched ? 'error' : ''}
          placeholder="Type or paste a valid amount"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required
        />
        <button type="button" className="max-btn" onClick={onMaxClick}>
          MAX
        </button>
      </div>
      {error && touched && (
        <small className="send-form__error bottom">{error}</small>
      )}
      <div className="balance-info">
        <span>Balance: {balance} {symbol}</span>
      </div>
    </div>
  )
}

export default AmountInput