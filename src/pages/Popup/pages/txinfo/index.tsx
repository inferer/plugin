import React from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import PageHeader from '../components/PageHeader'
import DataItem1 from "./DataItem1";
import DataItem2 from "./DataItem2";
import DataItem3 from "./DataItem3";
import DataItem4 from "./DataItem4";
const { PopupAPI } = require('../../../../api')
// 0xd387a6e4e84a6c86bd90c158c6028a58cc8ac459
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
        <div className="setting-list" style={{ height: 490, overflow: 'auto' }}>
          {
            txinfoList.map((item: any, key: number) => {
              console.log("txinfoList item.key " + item.key)

              if (item.key.indexOf('Interacted Address') > -1) {
                return <DataItem2 key={key} itemData={item} />
              } else if (item.key.indexOf('Contributed Projects') > -1) {
                return <DataItem3 key={key} itemData={item} />
              } else if (txinfoData.key.indexOf('Inferer Label') > -1) {
                return <DataItem4 key={key} itemData={item} />
              } else {
                return <DataItem1 key={key} itemData={item} />
              }
            })
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