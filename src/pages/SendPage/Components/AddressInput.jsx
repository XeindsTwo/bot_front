import BookIcon from '../../../assets/images/icons/book_send.svg'

const AddressInput = ({ value, onChange, onBlur, error, touched, inputRef }) => {
  return (
    <div className="form-group">
      <label htmlFor="address">Recipient Address</label>
      <div className="input-with-icon">
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          id="address"
          name="address"
          className={error && touched ? 'error' : ''}
          placeholder="Type or paste a valid address"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required
        />
        <BookIcon className="input-icon"/>
      </div>
      {error && touched && (
        <small className="send-form__error">{error}</small>
      )}
    </div>
  )
}

export default AddressInput