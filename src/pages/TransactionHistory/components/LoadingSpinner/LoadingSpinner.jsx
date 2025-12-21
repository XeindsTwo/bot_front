import './LoadingSpinner.scss'

const LoadingSpinner = () => {
  return (
    <div className="trust-loading-container">
      <p className="trust-loading-text">Loading</p>
      <div className="trust-spinner-wrapper">
        <div className="trust-spinner"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner