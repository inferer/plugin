import React from "react";
import LineChartT from "../../components/LineChart";
import { TTitle } from "./components";
const AnaPng = require('../images/ana.png')
const AnaaPng = require('../images/ana_a.png')
const RightPng = require('../images/right.png')

export const GoAnl: React.FC<any> = () => {
  return (
    <div className="flex justify-end items-center mt-3 go-ana cursor-pointer">
      <img className="img1" src={AnaPng} alt="" />
      <img className="img2" src={AnaaPng} alt="" />
      <div className="text-xs font-bold">Analysis</div>
      <img src={RightPng} alt="" />
    </div>
  )
}

export default GoAnl