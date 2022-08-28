import popup from './handlers/PopupAPI';
import background from './handlers/BackgroundAPI';
import MessageDuplex from '../MessageDuplex'

// const duplex = new MessageDuplex.Popup();

// popup.init(duplex);

export const PopupAPI = popup;

export const BackgroundAPI = background;