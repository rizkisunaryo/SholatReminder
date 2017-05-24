import Constant from '../Constant';

export function backAndroidFullscreenAction() {
  return {
    type: Constant.ACTION.BACK_ANDROID,
  }
}

export function fullscreenPushAction(pageType, data={}) {
  return {
    type: Constant.ACTION.FULLSCREEN_PUSH,
    pageType,
    data, 
  }
}