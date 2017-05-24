import React, {Component} from 'react';
import {
	StyleSheet, 
	Text,
	TextInput, 
	TouchableOpacity,
  View,
} from 'react-native';

import Constant from '../../Constant';
import TopMargin from '../../widget/TopMargin';

export default class CreateAlarm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beforeOrAfter: 'before', 
    }
  }

  render() {
    let {beforeOrAfter} = this.state;

    let _beforeAfterButton = (pBeforeAfter) => {
      let buttonColor = '#ccc';
      if (beforeOrAfter === pBeforeAfter) buttonColor = 'green';
      return (
        <TouchableOpacity
          style={[styles.beforeAfterButton, 
            {backgroundColor:buttonColor}]}
          onPress={() => this.setState({beforeOrAfter:pBeforeAfter})}>
          <Text style={{color:'white'}}>{pBeforeAfter}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={{height:Constant.DIMENSION.WINDOW_HEIGHT, paddingHorizontal:5}}>
      	<TopMargin />
      	<View
      		style={styles.container}>
      		<View style={[styles.subcontainer, {marginBottom:10}]} >
	      		<TextInput keyboardType='numeric' placeholder='5'
	      			style={{width:40, height:50, borderWidth:0.5, borderRadius:5, 
	      				textAlign:'center', marginRight:10}} />
      			<Text style={{fontSize:23}} >minutes</Text>
      		</View>
      		<View style={styles.subcontainer}>
      			{_beforeAfterButton('before')}
            <View style={{width:10}} />
            {_beforeAfterButton('after')}
      		</View>
      		<Text>shubuh</Text>
      	</View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
	beforeAfterButton: {
		paddingVertical:5, paddingHorizontal:10, borderRadius:5, 
	}, 
  container: {
  	backgroundColor:'white', 
  	width:Constant.DIMENSION.WINDOW_WIDTH-10, 
    borderRadius:3, 
    padding:10, 
    alignItems:'center', 
  },
  subcontainer: {
  	flexDirection:'row', 
  	alignItems:'center', 
  } 
});