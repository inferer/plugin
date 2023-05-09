import React from "react";

import { loadingGif } from './image'

const Loading: React.FC<{ size: number }> = ({ size = 42 }) => {
  return (
    <div className="">
      <img src={loadingGif} alt="" style={{ width: size, height: size }} />
    </div>
  )
}

export default Loading