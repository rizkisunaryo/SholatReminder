import React, {Component} from 'react';
import {
  ScrollView, 
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
      carMake: 'cadillac',
            modelIndex: 3,
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
      <View style={{height:Constant.DIMENSION.WINDOW_HEIGHT, paddingHorizontal:7}}>
        <TopMargin />
        <ScrollView showsHorizontalScrollIndicator={false} 
          showsVerticalScrollIndicator={false}>
        	
          {/* some minutes before / after pray time */}
        	<View
        		style={styles.container}>
        		<View style={[styles.subcontainer, {marginBottom:10}]} >
  	      		<TextInput keyboardType='numeric' placeholder='5'
  	      			style={{width:40, height:50, borderWidth:0.5, borderRadius:5, 
  	      				textAlign:'center', marginRight:10}} />
        			<Text style={{fontSize:23}} >minutes</Text>
        		</View>
        		<View style={[styles.subcontainer, {marginBottom:10}]}>
        			{_beforeAfterButton('before')}
              <View style={{width:10}} />
              {_beforeAfterButton('after')}
        		</View>
            <View style={[styles.subcontainer]}>
              <Text style={{fontSize:23}}>&lt;&nbsp;</Text>
              <View style={{height:30}}>
                <ScrollView horizontal pagingEnabled 
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  onMomentumScrollEnd={e => {
                    let prayTimeNo = Math.floor(e.nativeEvent.contentOffset.x / 100);
                    let prayTime = 'Shubuh';
                    switch(prayTimeNo) {
                      case 0:
                        prayTime = 'Shubuh';
                        break;
                      case 1:
                        prayTime = 'Sunrise';
                        break;
                      case 2:
                        prayTime = 'Zhuhur';
                        break;
                      case 3:
                        prayTime = "'Ashar";
                        break;
                      case 4:
                        prayTime = 'Maghrib';
                        break;
                      case 5:
                        prayTime = "'Isya";
                        break;
                    }
                    this.setState({prayTime});
                  }}
                  scrollEventThrottle={200}
                  style={{width:100}}>
                  <View style={styles.prayTimeContainer}>
                    <Text style={{fontSize:23}}>Shubuh</Text>
                  </View>
                  <View style={styles.prayTimeContainer}>
                    <Text style={{fontSize:23}}>Sunrise</Text>
                  </View>
                  <View style={styles.prayTimeContainer}>
                    <Text style={{fontSize:23}}>Zhuhur</Text>
                  </View>
                  <View style={styles.prayTimeContainer}>
                    <Text style={{fontSize:23}}>'Ashar</Text>
                  </View>
                  <View style={styles.prayTimeContainer}>
                    <Text style={{fontSize:23}}>Maghrib</Text>
                  </View>
                  <View style={styles.prayTimeContainer}>
                    <Text style={{fontSize:23}}>'Isya</Text>
                  </View>
                </ScrollView>
              </View>
              <Text style={{fontSize:23}}>&nbsp;&gt;</Text>
            </View>
        	</View>

          {/* repeat */}
          <View style={styles.container}></View>
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
	beforeAfterButton: {
		paddingVertical:5, 
    paddingHorizontal:10, 
    borderRadius:5, 
	}, 
  container: {
  	backgroundColor:'white', 
  	width:Constant.DIMENSION.WINDOW_WIDTH-14, 
    borderRadius:3, 
    padding:10, 
    alignItems:'center',
    marginBottom: 7 
  },  
  prayTimeContainer: {
    width:100, 
    alignItems:'center', 
  }, 
  subcontainer: {
  	flexDirection:'row', 
  	alignItems:'center', 
  }, 
});