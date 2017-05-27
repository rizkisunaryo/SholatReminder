import {Dimensions, Platform} from 'react-native';
import {
  Navigator,
} from 'react-native-deprecated-custom-components';
import buildStyleInterpolator from 'buildStyleInterpolator';

// DIMENSION
let WINDOW_HEIGHT = Dimensions.get('window').height;
let WINDOW_WIDTH = Dimensions.get('window').width;

// TRANSITION
let FloatFromBottom = Object.assign({}, Navigator.SceneConfigs.FloatFromBottom);
	delete FloatFromBottom.gestures.pop;

module.exports = {
  ACTION: {
    BACK_ANDROID: 'BACK_ANDROID', 
    FULLSCREEN_PUSH: 'FULLSCREEN_PUSH',
  },
  DIMENSION: {
    WINDOW_HEIGHT,
    WINDOW_WIDTH,
  },
  PAGE_TYPE: {
    AlarmList: 'AlarmList',
    CreateAlarm: 'CreateAlarm',
  },
  TRANSITION: {
  	FloatFromBottom, 
  }
}
