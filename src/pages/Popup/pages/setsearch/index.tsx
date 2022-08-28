import React from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import PageHeader from '../components/PageHeader'
const { PopupAPI } = require('../../../../api')
const selectPng = require('../setting/images/select.png')

export type SetSearchProps = {
  searchNum: number,
}

const SetSearch: React.FC<SetSearchProps> = ({
  searchNum
}) => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.setsearch', defaultMessage: 'SEARCH' })

  const changeNum = (num: number) => {
    PopupAPI.setSearchNum(num)
  }

  return (
    <div className="w-360 page-root page-language">
      <PageHeader title={title} onBack={() => PopupAPI.changeState(APP_STATE.SETTING)} />

      <div className="page-content">
        <div className="setting-list">
          <div className="setting-item flex justify-between items-center"
            onClick={() => changeNum(20)}
          >
            <div className="flex items-center ">
              <div className={`item-text1 ${searchNum === 20 ? 'color-image' : ''}`}>20</div>
            </div>
            {
              searchNum === 20 && <img src={selectPng} alt="" style={{ width: 13, height: 9 }} />
            }

          </div>
          <div className="setting-item flex justify-between items-center"
            onClick={() => changeNum(10)}
          >
            <div className="flex items-center ">
              <div className={`item-text1 ${searchNum === 10 ? 'color-image' : ''}`}>10</div>
            </div>
            {
              searchNum === 10 && <img src={selectPng} alt="" style={{ width: 13, height: 9 }} />
            }
          </div>
          <div className="setting-item flex justify-between items-center"
            onClick={() => changeNum(5)}
          >
            <div className="flex items-center ">
              <div className={`item-text1 ${searchNum === 5 ? 'color-image' : ''}`}>5</div>
            </div>
            {
              searchNum === 5 && <img src={selectPng} alt="" style={{ width: 13, height: 9 }} />
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default SetSearch