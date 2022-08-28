import React, { useState } from 'react';
import { APP_STATE } from '../../config/constants';
import Search from '../search';
import Setting from '../setting';
const { PopupAPI } = require('../../../../api')

const searchPng = require('./images/search.png');
const searchActivePng = require('./images//search_active.png');
const ticketPng = require('./images//ticket.png');
const ticketActivePng = require('./images/ticket_active.png');
const favPng = require('./images/fav.png');
const favActivePng = require('./images/fav_active.png');
const tipPng = require('./images/tip.png');
const tipActivePng = require('./images/tip_active.png');
const settingPng = require('./images/setting.png');
const settingActivePng = require('./images/setting_active.png');

const Popup: React.FC<{
  appState: number
}> = ({
  appState
}) => {
    console.log(appState)
    // const [appState, setAppState] = useState(APP_STATE.SEARCH)
    const navOnClick = (type: number) => {
      // setAppState(type)
      PopupAPI.changeState(type)
    }
    return (
      <div className="w-360">
        {
          appState === APP_STATE.SEARCH && <Search />
        }
        {
          appState === APP_STATE.SETTING && <Setting />
        }

        <div className='flex justify-around items-center fixed w-full bottom-0 left-0 right-0 nav-bar'>
          <div className=''
            onClick={() => navOnClick(APP_STATE.SEARCH)}
          >
            <img className=' w-5 h-5' src={appState === APP_STATE.SEARCH ? searchActivePng : searchPng} alt="" />
          </div>
          <div className=''
            onClick={() => navOnClick(APP_STATE.TICKET)}
          >
            <img className=' w-5 h-5' src={appState === APP_STATE.TICKET ? ticketActivePng : ticketPng} alt="" />
          </div>
          <div className=''
            onClick={() => navOnClick(APP_STATE.RECOMMEND)}
          >
            <img className=' w-5 h-5' src={appState === APP_STATE.RECOMMEND ? favActivePng : favPng} alt="" />
          </div>
          <div className=''
            onClick={() => navOnClick(APP_STATE.LABELS)}
          >
            <img className=' w-5 h-5' src={appState === APP_STATE.LABELS ? tipActivePng : tipPng} alt="" />
          </div>
          <div className=''
            onClick={() => navOnClick(APP_STATE.SETTING)}
          >
            <img className=' w-5 h-5' src={appState === APP_STATE.SETTING ? settingActivePng : settingPng} alt="" />
          </div>

        </div>
      </div>
    );
  };

export default Popup;
