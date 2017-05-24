import { combineReducers } from 'redux';
import uuidV4 from 'uuid/v4';
import Constant from '../Constant';



function backAndroidFullscreenState(state = {
  flagNew: '',
}, action) {
  switch (action.type) {
    case Constant.ACTION.BACK_ANDROID:
      return {
        flagNew: uuidV4(),
      }
    default:
      return state;
  }
}

function fullscreenPushState(state = {
  data: {}, 
  flagNew: '',
  id: '',
  pageType: '', 
}, action) {
  switch (action.type) {
    case Constant.ACTION.FULLSCREEN_PUSH:
      return {
        data: action.data, 
        flagNew: uuidV4(),
        id: uuidV4(),
        pageType: action.pageType,
      }
    default:
      return state;
  }
}



const asyncReducers = combineReducers({
  backAndroidFullscreenState, 
  fullscreenPushState,
});

export default asyncReducers
