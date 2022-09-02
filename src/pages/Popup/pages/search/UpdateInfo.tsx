import React from "react";
import { transformTime } from "../../utils";

const UpdateInfo: React.FC = () => {
  return (
    <div className="flex items-baseline mt-4">
      <div className="text-base font-bold color-image">Key Info</div>
      <div className="text-xs ml-1" style={{ color: 'rgba(127, 135, 146, 0.7)' }}>update: {transformTime(Date.now())}</div>
    </div>
  )
}

export default UpdateInfo