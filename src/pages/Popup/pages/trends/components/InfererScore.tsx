import React, { useEffect, useState } from "react";
import { TTitle } from "./components";

const InfererScore: React.FC<any> = ({
  infererAnalysis = {}
}) => {
  const [per5, setPer5] = useState(0)
  const [per4, setPer4] = useState(0)
  const [per3, setPer3] = useState(0)
  const [per2, setPer2] = useState(0)
  const [per1, setPer1] = useState(0)
  useEffect(() => {
    const holderCount = infererAnalysis?.holder_address_count || 1;
    setPer5(infererAnalysis?.score5_count / holderCount * 100)
    setPer4(infererAnalysis?.score4_count / holderCount * 100)
    setPer3(infererAnalysis?.score3_count / holderCount * 100)
    setPer2(infererAnalysis?.score2_count / holderCount * 100)
    setPer1(infererAnalysis?.score1_count / holderCount * 100)
  }, [infererAnalysis])
  return (
    <div className="box-wrap mt-3">
      <TTitle text="Inferer Analysis" tips="" />
      <div className="flex justify-between mt-3">
        <div className="" style={{ width: '160px' }}>
          <div className="flex items-center" style={{ marginBottom: '2px' }}>
            <div className="text5 text-xs leading-4">5.0</div>
            <div className=" relative overflow-hidden mx-2 flex-1">
              <div className="bg1 opacity-10 score-bar"></div>
              <div className=" absolute h-1 bg5 score-bar left-0 top-0" style={{ width: per5 + '%' }}></div>
            </div>
            <div className=" text-xs leading-4 shrink-0" style={{ color: '#7F8792', width: '25px' }}>{per5.toFixed(0)}%</div>
          </div>
          <div className="flex items-center" style={{ marginBottom: '2px' }}>
            <div className="text4 text-xs leading-4">4.0</div>
            <div className=" relative overflow-hidden mx-2 flex-1">
              <div className="bg4 opacity-10 score-bar"></div>
              <div className=" absolute h-1 bg4 score-bar left-0 top-0" style={{ width: per4 + '%' }}></div>
            </div>
            <div className=" text-xs leading-4 shrink-0" style={{ color: '#7F8792', width: '25px' }}>{per4.toFixed(0)}%</div>
          </div>
          <div className="flex items-center" style={{ marginBottom: '2px' }}>
            <div className="text3 text-xs leading-4">3.0</div>
            <div className=" relative overflow-hidden mx-2 flex-1">
              <div className="bg3 opacity-10 score-bar"></div>
              <div className=" absolute h-1 bg3 score-bar left-0 top-0" style={{ width: per3 + '%' }}></div>
            </div>
            <div className=" text-xs leading-4 shrink-0" style={{ color: '#7F8792', width: '25px' }}>{per3.toFixed(0)}%</div>
          </div>
          <div className="flex items-center" style={{ marginBottom: '2px' }}>
            <div className="text2 text-xs leading-4">2.0</div>
            <div className=" relative overflow-hidden mx-2 flex-1">
              <div className="bg2 opacity-10 score-bar"></div>
              <div className=" absolute h-1 bg2 score-bar left-0 top-0" style={{ width: per2 + '%' }}></div>
            </div>
            <div className=" text-xs leading-4 shrink-0" style={{ color: '#7F8792', width: '25px' }}>{per2.toFixed(0)}%</div>
          </div>
          <div className="flex items-center" style={{ marginBottom: '2px' }}>
            <div className="text1 text-xs leading-4">1.0</div>
            <div className=" relative overflow-hidden mx-2 flex-1">
              <div className="bg1 opacity-10 score-bar"></div>
              <div className=" absolute h-1 bg1 score-bar left-0 top-0" style={{ width: per1 + '%' }}></div>
            </div>
            <div className=" text-xs leading-4 shrink-0" style={{ color: '#7F8792', width: '25px' }}>{per1.toFixed(0)}%</div>
          </div>

        </div>
        <div className="flex flex-1 items-center" style={{ paddingLeft: '35px' }}>
          <div className="color-image inferer-score">{infererAnalysis.score_avg}</div>
        </div>
      </div>
    </div>
  )
}

export default InfererScore