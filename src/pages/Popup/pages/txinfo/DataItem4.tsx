import React from "react";

//Inferer Label Item Page

const item1Png = require('../../../../assets/img/item1.png')

const DataItem4: React.FC<{
  itemData: { key: string, data: string }
}> = ({ itemData }) => {

  return (
    <div className="dataitem4 flex justify-between mt-5 cursor-pointer">
      
      <div className="w-full flex flex-col justify-center pl-16 pr-3">
        <div className="text-sm font-bold pl-3" style={{ color: '#3F4664' }}>{itemData.key}</div>
        <div className="text-xs mt-1 pl-3" style={{ color: '#7F8792' }}>{itemData.data}</div>
      </div>
    </div>
  )

}

export default DataItem4