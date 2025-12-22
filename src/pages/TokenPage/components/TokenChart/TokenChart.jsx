import React from 'react';
import NegativeImage from "../../../../assets/images/negative.png";
import PositiveImage from "../../../../assets/images/positive.png";
import "./TokenChart.scss"

const TokenChart = ({ isUp }) => (
  <>
    <img
      className={"chart__img"}
      src={isUp ? PositiveImage : NegativeImage}
      alt="chart"
      height={136}
    />
    <div className="chart__actions">
      <button className={"chart__btn"} type={"button"}>1H</button>
      <button className={"chart__btn active"} type={"button"}>1D</button>
      <button className={"chart__btn"} type={"button"}>1W</button>
      <button className={"chart__btn"} type={"button"}>1M</button>
      <button className={"chart__btn"} type={"button"}>1Y</button>
      <button className={"chart__btn"} type={"button"}>All</button>
    </div>
  </>
);

export default TokenChart;