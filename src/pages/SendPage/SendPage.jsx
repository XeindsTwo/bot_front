import {useState, useRef} from 'react'
import {useParams, useNavigate, useLocation} from 'react-router-dom'
import PageHeader from '@/components/PageHeader/PageHeader'
import TokenHeader from './Components/TokenHeader.jsx'
import AddressInput from './Components/AddressInput.jsx'
import AmountInput from './Components/AmountInput.jsx'
import {getTokenImage, createValidators, getPreviewData} from './utils'
import './SendPage.scss'

const SendPage = () => {
  const {symbol} = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const tokenData = location.state?.tokenData || null

  const [formData, setFormData] = useState({address: '', amount: ''})
  const [errors, setErrors] = useState({address: '', amount: ''})
  const [touched, setTouched] = useState({address: false, amount: false})

  const addressInputRef = useRef(null)
  const amountInputRef = useRef(null)

  const {validateAddress, validateAmount} = createValidators(tokenData)

  const handleAddressChange = (value) => {
    setFormData({...formData, address: value})
    if (touched.address) {
      setErrors({...errors, address: validateAddress(value)})
    }
  }

  const handleAmountChange = (value) => {
    setFormData({...formData, amount: value})
    if (touched.amount) {
      setErrors({...errors, amount: validateAmount(value)})
    }
  }

  const handleBlur = (field) => {
    setTouched({...touched, [field]: true})
    if (field === 'address') {
      setErrors({...errors, address: validateAddress(formData.address)})
    } else if (field === 'amount') {
      setErrors({...errors, amount: validateAmount(formData.amount)})
    }
  }

  const handleMaxClick = () => {
    const maxAmount = tokenData?.token_amount || 0
    setFormData({...formData, amount: maxAmount})
    setTouched({...touched, amount: true})
    setErrors({...errors, amount: validateAmount(maxAmount)})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({address: true, amount: true})

    const addressError = validateAddress(formData.address)
    const amountError = validateAmount(formData.amount)

    setErrors({address: addressError, amount: amountError})

    if (!addressError && !amountError) {
      navigate(`/send/preview`, {
        state: {
          token: symbol,
          amount: formData.amount,
          to: formData.address,
          tokenData: tokenData
        }
      })
    }
  }

  const isFormValid = !errors.address && !errors.amount && formData.address && formData.amount

  if (!tokenData) {
    return <PageHeader title="Loading..." backUrl={-1}/>
  }

  return (
    <>
      <PageHeader title={`Send ${symbol}`} backUrl={-1}/>
      <TokenHeader
        symbol={symbol}
        imageUrl={getTokenImage(symbol)}
        network={tokenData?.network || tokenData?.token?.network || ''}
      />
      <form className="send-form" onSubmit={handleSubmit}>
        <AddressInput
          value={formData.address}
          onChange={handleAddressChange}
          onBlur={() => handleBlur('address')}
          error={errors.address}
          touched={touched.address}
          inputRef={addressInputRef}
        />

        <AmountInput
          value={formData.amount}
          onChange={handleAmountChange}
          onBlur={() => handleBlur('amount')}
          error={errors.amount}
          touched={touched.amount}
          onMaxClick={handleMaxClick}
          balance={tokenData?.token_amount || 0}
          symbol={symbol}
          inputRef={amountInputRef}
        />

        <button type="submit" className="btn" disabled={!isFormValid}>
          Preview
        </button>
      </form>
    </>
  )
}

export default SendPage