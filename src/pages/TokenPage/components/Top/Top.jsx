import './Top.scss'

const Top = () => {
  return (
    <>
      <div className="recent-transactions">
        <h3 className="recent-transactions__title">Recent Transactions</h3>
        <div className="recent-transactions__inner">
          <p className="recent-transactions__text">
            Can’t find your transaction?
            <a href="https://bscscan.com/address/" target={"_blank"}>Check explorer</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Top