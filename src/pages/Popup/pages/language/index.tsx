import React from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import PageHeader from '../components/PageHeader'
const { PopupAPI } = require('../../../../api')
const selectPng = require('../setting/images/select.png')

export type LanguageProps = {
  language: string,
}

const Language: React.FC<LanguageProps> = ({
  language
}) => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.language', defaultMessage: 'LANGUAGE' })

  const changeLanguage = (lng: string) => {
    PopupAPI.setLanguage(lng)
  }

  return (
    <div className="w-360 page-root page-language">
      <PageHeader title={title} onBack={() => PopupAPI.changeState(APP_STATE.SETTING)} />

      <div className="page-content">
        <div className="setting-list">
          <div className="setting-item flex justify-between items-center"
            onClick={() => changeLanguage('en')}
          >
            <div className="flex items-center ">
              <div className={`item-text1 ${language === 'en' ? 'color-image' : ''}`}>English</div>
            </div>
            {
              language === 'en' && <img src={selectPng} alt="" style={{ width: 13, height: 9 }} />
            }

          </div>
          {/* <div className="setting-item flex justify-between items-center"
            onClick={() => changeLanguage('zh')}
          >
            <div className="flex items-center ">
              <div className={`item-text1 ${language === 'zh' ? 'color-image' : ''}`}>简体中文</div>
            </div>
            {
              language === 'zh' && <img src={selectPng} alt="" style={{ width: 13, height: 9 }} />
            }
          </div> */}
        </div>

      </div>
    </div>
  )
}

export default Language