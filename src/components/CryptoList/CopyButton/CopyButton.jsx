import './CopyButton.scss'
import {useState} from 'react'
import CopyIcon from '../../../assets/images/icons/copy_address.svg'

const CopyButton = ({address}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="copy-info">
      <span className="badge">{copied ? 'Copied!' : 'Copy'}</span>
      <button className="copy-info__btn" type="button" onClick={handleCopy}>
        <CopyIcon/>
      </button>
    </div>
  )
}

export default CopyButton