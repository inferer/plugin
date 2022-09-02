import React from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import PageHeader from '../components/PageHeader'
import DataItem1 from "./DataItem1";
import DataItem2 from "./DataItem2";
const { PopupAPI } = require('../../../../api')

export type TxInfoProps = {
  language: string,
  txinfoData: { key: string, data: any }
}

const TxInfo: React.FC<TxInfoProps> = ({
  language,
  txinfoData
}) => {
  const intl = useIntl()
  // const title = intl.formatMessage({ id: 'title.txinfo', defaultMessage: 'TX INFO' })

  console.log(txinfoData)
  const txinfoList = Object.keys(txinfoData.data).map(key => ({ key, data: txinfoData.data[key] }))

  return (
    <div className="w-360 page-root search-page ">
      <PageHeader title={txinfoData.key} onBack={() => PopupAPI.changeState(APP_STATE.SEARCH)} />

      <div className="page-content">
        <div className="setting-list">
          {
            txinfoList.map(item => item.key.indexOf('Interacted Address') > -1 ? <DataItem2 key={item.key} itemData={item} /> : <DataItem1 key={item.key} itemData={item} />)
          }
          {/* <DataItem1 key={} txinfoList={txinfoList} />
          <DataItem1 />
          <DataItem1 />
          <DataItem1 />
          <DataItem1 /> */}
        </div>

      </div>
    </div>
  )
}

export default TxInfo