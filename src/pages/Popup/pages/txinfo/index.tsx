import React from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import PageHeader from '../components/PageHeader'
import DataItem1 from "./DataItem1";
const { PopupAPI } = require('../../../../api')

export type TxInfoProps = {
  language: string,
}

const TxInfo: React.FC<TxInfoProps> = ({
  language
}) => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.txinfo', defaultMessage: 'TX INFO' })

  const changeLanguage = (lng: string) => {
    PopupAPI.setLanguage(lng)
  }

  return (
    <div className="w-360 page-root search-page ">
      <PageHeader title={title} onBack={() => PopupAPI.changeState(APP_STATE.SEARCH)} />

      <div className="page-content">
        <div className="setting-list">
          <DataItem1 />
          <DataItem1 />
          <DataItem1 />
          <DataItem1 />
          <DataItem1 />
        </div>

      </div>
    </div>
  )
}

export default TxInfo