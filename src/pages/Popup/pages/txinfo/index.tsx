import React from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import PageHeader from '../components/PageHeader'
import DataItem1 from "./DataItem1";
import DataItem2 from "./DataItem2";
const { PopupAPI } = require('../../../../api')

export type TxInfoProps = {
  language: string,
  txinfoData: { key: string, data: any },
  toTxInfo: string
}

const TxInfo: React.FC<TxInfoProps> = ({
  language,
  txinfoData,
  toTxInfo
}) => {
  const intl = useIntl()
  // const title = intl.formatMessage({ id: 'title.txinfo', defaultMessage: 'TX INFO' })
  const txinfoList = Object.keys(txinfoData.data).map(key => ({ key, data: txinfoData.data[key] }))

  return (
    <div className="w-360 page-root search-page " style={{ backgroundImage: 'none' }}>
      <PageHeader title={txinfoData.key} onBack={() => PopupAPI.changeState('searchpage' === toTxInfo ? APP_STATE.SEARCH : APP_STATE.TICKETINFER)} />

      <div className="page-content">
        <div className="setting-list">
          {
            txinfoList.map((item: any, key: number) => item.key.indexOf('Interacted Address') > -1 ? <DataItem2 key={key} itemData={item} /> : <DataItem1 key={key} itemData={item} />)
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