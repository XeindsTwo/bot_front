import './BuyNow.scss'

const BuyNow = () => {
  return (
    <>
      <span className="buy__title">Buy Now</span>
      <div className="buy__inner">
        <div className="buy__top">
          <p className="buy__price">
            50
            <span>USD</span>
          </p>
          <button className={"buy__btn"} type={"button"}>Buy</button>
        </div>
        <div className="buy__values">
          <button className="buy__value" type={"button"}>30</button>
          <button className="buy__value" type={"button"}>50</button>
          <button className="buy__value" type={"button"}>80</button>
          <button className="buy__value" type={"button"}>100</button>
        </div>
        <p className="buy__info">
          <span>Buying 47.95 USDT</span>
          <span>• Credit Card • Transak</span>
        </p>
      </div>
    </>
  )
}

export default BuyNow