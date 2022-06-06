import {Dimensions, PixelRatio, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

export const TextConstants = {
  APP_NAME: 'DemoApp',
  InternetNotAvailable: 'Internet connection not available.',
};


export const AUTH0_DOMAIN = 'dev-4cfyaake.us.auth0.com'
export const AUTH0_CLIENTID = 'lKg2k29NyVVWfbapGMYPdmQsh1ZzLoVR'


export const ColorConstants = {
  MAIN_APP_COLOR: 'rgb(247,199,126)',
  HEADER_COLOR: 'rgb(238,124,120)',
  BUTTON_COLOR: 'rgb(238,124,120)',
  BACKGROUND: 'rgb(255,255,255)',
  SHADOW_BACKGROUND: 'rgba(194,194,194,0.3)',
  UI_BACKGROUND: 'rgb(255,255,255)',
  GREY: 'grey',
  LIGHT_GREY1: '#F4F4F4',
  LIGHT_GREY2: '#F9F9F9',
  LIGHT_GREY: '#919191',
  VERY_LIGHT_GREY: '#E4E4E4',
  DARK_GREY: 'rgb(192,192,192)',
  BLACK_TRANS: 'rgba(0,0,0,0.33)',
  BLACK_01: 'rgba(0,0,0,0.01)',
  WHITE: '#FFF',
  CLEAR: 'transparent',
  // -----------------------------
  BLUE: '#4D94C9',
  GRAY: '#7D7D7D',
  GREEN: '#7FD2A3',
  LIGHT_BLUE: '#F5FBFF',
  BLACK: '#424242',
  DARK_GRAY: '#7B7B7B',
  LIGHT_GRay: '#E5E5E5',
  GRAY1: '#d3d3d3',
  gray: '#E2E2E2',
  Gray_dark: '#ADADAD',
  APP_RED: 'red',
};


export const screenSize = {
  width: width,
  height: height,
};
