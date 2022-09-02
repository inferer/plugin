import React from "react";

const loadingPng = require('../../../../assets/img/loading.gif')

const Loading: React.FC<{ size: number }> = ({ size = 42 }) => {
  return (
    <div className="">
      <img src={loadingPng} alt="" style={{ width: size, height: size }} />
    </div>
  )
}

export default Loading