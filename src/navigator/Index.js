import React, {Component} from 'react';
import {
	BackHandler, 
	StatusBar,
  View,
} from 'react-native';
import {
  Navigator,
} from 'react-native-deprecated-custom-components';

import uuidV4 from 'uuid/v4';

import AlarmList from '../page/index/AlarmList';
import Constant from '../Constant';
import CreateAlarm from '../page/index/CreateAlarm';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // handle BackAndroid
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.backAndroidFullscreenAction();
      return true;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fullscreenPushState.flagNew
      !== nextProps.fullscreenPushState.flagNew) {
      this.fullscreenNavigator.push(nextProps.fullscreenPushState);
    }
  }

  render() {
    return (
      <View
        style={{width:Constant.DIMENSION.WINDOW_WIDTH,
          height:Constant.DIMENSION.WINDOW_HEIGHT, backgroundColor:'#0047ba'}}>
        <StatusBar barStyle='light-content' transculent />
        <Navigator
        	ref={e => this.fullscreenNavigator = e}
          initialRoute={{pageType:Constant.PAGE_TYPE.AlarmList, id:uuidV4()}}
          configureScene={(route, routeStack) => 
          	Constant.TRANSITION.FloatFromBottom}
          renderScene={(route, navigator) => {
            if (route.pageType === Constant.PAGE_TYPE.AlarmList) 
            	return <AlarmList route={route} navigator={navigator} />;
           	if (route.pageType === Constant.PAGE_TYPE.CreateAlarm) 
            	return <CreateAlarm route={route} navigator={navigator} />;
          }}
        />
      </View>
    )
  }
}



import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as KumparanActions from '../redux/Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    fullscreenPushState: state.fullscreenPushState,
  }
}

export default connect(
  mapStateToProps,
  function(dispatch, ownProps) {
    return bindActionCreators(KumparanActions, dispatch)
  },
)(Index)
