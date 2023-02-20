import React from "react";
import { TTitle } from "./components";

const InfererScore: React.FC<any> = () => {
  return (
    <div className="box-wrap mt-3">
      <TTitle text="Inferer Analysis" tips="" />
      <div className="flex justify-between mt-3">
        <div className="" style={{ width: '160px' }}>
          <div className="flex items-center" style={{ marginBottom: '2px' }}>
            <div className="text5 text-xs leading-4">5.0</div>
            <div className=" relative overflow-hidden mx-2 flex-1">
              <div className="bg1 opacity-10 score-bar"></div>
              <div className=" absolute h-1 bg5 score-bar left-0 top-0" style={{ width: '30%' }}></div>
            </div>
            <div className=" text-xs leading-4" style={{ color: '#7F8792' }}>30%</div>
          </div>
          <div className="flex items-center" style={{ marginBottom: '2px' }}>
            <div className="text4 text-xs leading-4">4.0</div>
            <div className=" relative overflow-hidden mx-2 flex-1">
              <div className="bg4 opacity-10 score-bar"></div>
              <div className=" absolute h-1 bg4 score-bar left-0 top-0" style={{ width: '30%' }}></div>
            </div>
            <div className=" text-xs leading-4" style={{ color: '#7F8792' }}>30%</div>
          </div>
          <div className="flex items-center" style={{ marginBottom: '2px' }}>
            <div className="text3 text-xs leading-4">3.0</div>
            <div className=" relative overflow-hidden mx-2 flex-1">
              <div className="bg3 opacity-10 score-bar"></div>
              <div className=" absolute h-1 bg3 score-bar left-0 top-0" style={{ width: '20%' }}></div>
            </div>
            <div className=" text-xs leading-4" style={{ color: '#7F8792' }}>20%</div>
          </div>
          <div className="flex items-center" style={{ marginBottom: '2px' }}>
            <div className="text2 text-xs leading-4">2.0</div>
            <div className=" relative overflow-hidden mx-2 flex-1">
              <div className="bg2 opacity-10 score-bar"></div>
              <div className=" absolute h-1 bg2 score-bar left-0 top-0" style={{ width: '20%' }}></div>
            </div>
            <div className=" text-xs leading-4" style={{ color: '#7F8792' }}>20%</div>
          </div>
          <div className="flex items-center" style={{ marginBottom: '2px' }}>
            <div className="text1 text-xs leading-4">1.0</div>
            <div className=" relative overflow-hidden mx-2 flex-1">
              <div className="bg1 opacity-10 score-bar"></div>
              <div className=" absolute h-1 bg1 score-bar left-0 top-0" style={{ width: '10%' }}></div>
            </div>
            <div className=" text-xs leading-4" style={{ color: '#7F8792' }}>10%</div>
          </div>

        </div>
        <div className="flex flex-1 items-center" style={{ paddingLeft: '35px' }}>
          <div className="color-image inferer-score">3.2</div>
        </div>
      </div>
    </div>
  )
}

export default InfererScore