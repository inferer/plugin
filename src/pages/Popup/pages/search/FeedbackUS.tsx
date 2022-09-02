import React from "react"
import { APP_STATE } from "../../config/constants"

const { PopupAPI } = require('../../../../api')

const FeedBackUS: React.FC = () => {
  return (
    <div
      onClick={() => PopupAPI.changeState(APP_STATE.FEEDBACK)}
      className="text-xs mt-3 flex justify-end cursor-pointer" style={{ color: 'rgba(63, 70, 100, 0.3)' }}>
      Incorrect? Feedback us
    </div>
  )
}

export default FeedBackUS