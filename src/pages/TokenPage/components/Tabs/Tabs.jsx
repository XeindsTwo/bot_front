const Tabs = () => {
  return (
    <div className="token-list-tabs">
      <div className="token-list-tabs__buttons">
        <button className="token-list-tabs__button active" type="button">History</button>
        <button className="token-list-tabs__button" type="button">Holdings</button>
        <button className="token-list-tabs__button" type="button">About</button>
      </div>
    </div>
  )
}

export default Tabs