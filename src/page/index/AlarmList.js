import React, {Component} from 'react';
import {
	ListView, 
	Text, 
	TouchableOpacity, 
  View,
} from 'react-native';

import Constant from '../../Constant';

class AlarmList extends Component {
  render() {
    return (
      <View style={{height:Constant.DIMENSION.WINDOW_HEIGHT}}>
      	<TouchableOpacity
        	style={{backgroundColor:'#6ba3ff', position:'absolute', bottom:20, right:20, 
        		width:56, height:56, borderRadius:28, justifyContent:'center', 
        		alignItems:'center'}}
        	onPress={() => this.props.fullscreenPushAction(
	          Constant.PAGE_TYPE.CreateAlarm
	        )}>
	        <Text style={{color:'white', fontSize:41, fontWeight:'200'}}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as KumparanActions from '../../redux/Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    // fullscreenPushState: state.fullscreenPushState,
  }
}

export default connect(
  mapStateToProps,
  function(dispatch, ownProps) {
    return bindActionCreators(KumparanActions, dispatch)
  },
)(AlarmList)
