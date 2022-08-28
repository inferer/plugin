import React, { useState } from "react";
import { useIntl } from 'react-intl'
import { APP_STATE } from "../../config/constants";
import PageHeader from "../components/PageHeader";

const { PopupAPI } = require('../../../../api')

const copyImg = require('./images/copy2.png')
const l1Png = require('./images/l1.png')
const l2Png = require('./images/l2.png')
const l3Png = require('./images/l3.png')
const l4Png = require('./images/l4.png')
const l5Png = require('./images/l5.png')
const l6Png = require('./images/l6.png')
const ticketsPng = require('./images/ticket.png')
const tickets2Png = require('./images/tickets2.png')
const labelsPng = require('./images/labels.png')
const labels2Png = require('./images/labels2.png')

const ticketsList = [
  { level: 1 },
  { level: 2 },
  { level: 3 },
  { level: 4 },
  { level: 5 },
  { level: 1 },
]

const labelsList = [
  { level: 1 },
  { level: 2 },
  { level: 3 },
  { level: 4 },
  { level: 5 },
  { level: 6 },
]

const Collection: React.FC<any> = () => {

  const onItemClick = (type: string) => {
    if (type === 'language') {
      PopupAPI.changeState(APP_STATE.LANGUAGE)
    }
  }
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'title.collection', defaultMessage: 'COLLECTION' })

  const [tickets, setTickets] = useState(ticketsList)
  const [labels, setLabels] = useState(labelsList)

  const getLabelImg = (level: number) => {
    if (level === 1) return l1Png
    if (level === 2) return l2Png
    if (level === 3) return l3Png
    if (level === 4) return l4Png
    if (level === 5) return l5Png
    if (level === 6) return l6Png
  }

  const [active, setActive] = useState(1)


  return (
    <div className="w-360 page-root collection-page">
      <PageHeader title={title} onBack={() => PopupAPI.changeState(APP_STATE.SETTING)} />
      <div className="page-content pt-3">
        <div className="flex items-center collection-header">
          <div className="flex items-center justify-center w-1/2"
            onClick={() => setActive(1)}
          >
            {
              active === 1 ?
                <img src={tickets2Png} alt="" /> :
                <img src={ticketsPng} alt="" />
            }
            <div className={`text-base font-bold ${active === 1 ? 'color-image' : 'text-title'}`}>Tickets</div>
          </div>
          <div className="flex items-center justify-center w-1/2"
            onClick={() => setActive(2)}
          >
            {
              active === 2 ?
                <img src={labels2Png} alt="" /> :
                <img src={labelsPng} alt="" />
            }
            <div className={`text-base font-bold ${active === 2 ? 'color-image' : 'text-title'}`}>Labels</div>
          </div>
        </div>
        {
          active === 1 &&
          <div className="setting-list">
            {
              tickets.map(item =>
                <div key={item.level} className={`collection-item flex items-center h-16 bg${item.level}`}
                >
                  <div className="flex justify-center items-center w-16 h-16">
                    <div className={`text text${item.level}`}>{item.level}.0</div>
                  </div>
                  <div className="ml-4 ">
                    <div className="text-sm font-bold flex items-center" style={{ color: '#7F8792' }}>
                      0x8eb8.....3f23
                      <img src={copyImg} alt="" className="w-4 h-4 ml-1" />
                    </div>
                    <div className="text-xs " style={{ color: 'rgba(127, 135, 146, 0.7)' }}>Collect on 15:00 7/22 2022</div>
                  </div>
                </div>
              )
            }
          </div>
        }
        {
          active === 2 &&
          <div className="setting-list">
            {
              labels.map(item =>
                <div key={item.level} className={`collection-item flex items-center h-16 bg${item.level}`}
                >
                  <div className="flex justify-center items-center w-16 h-16">
                    <img src={getLabelImg(item.level)} alt="" style={{ width: 24, height: 24 }} />
                  </div>
                  <div className="ml-4 ">
                    <div className="text-sm font-bold flex items-center" style={{ color: '#7F8792' }}>
                      0x8eb8.....3f23
                      <img src={copyImg} alt="" className="w-4 h-4 ml-1" />
                    </div>
                    <div className="text-xs " style={{ color: 'rgba(127, 135, 146, 0.7)' }}>Collect on 15:00 7/22 2022</div>
                  </div>
                </div>
              )
            }
          </div>
        }


      </div>
    </div>
  )
}

export default Collection