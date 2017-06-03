import React, {Component} from 'react';
import {
  Modal,
  ScrollView,
	StyleSheet,
  Switch,
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
      daysActive: [],
      modalType: '',
      modalVisible: false,
      prayTime: 'Shubuh',
      repeatModalTop: 40,
    }

    this._switchRepeatDay = this._switchRepeatDay.bind(this);
  }

  _switchRepeatDay(value, dayIndex) {
    let {daysActive} = this.state;
    if (value) {
      this.setState({daysActive: [...daysActive, dayIndex]});
    }
    else {
      daysActive = daysActive.filter(el => el !== dayIndex);
      this.setState({daysActive});
    }
  }

  render() {
    let {
      beforeOrAfter,
      daysActive,
      modalType,
      modalVisible,
      prayTime,
      repeatModalTop,
    } = this.state;

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

    let _repeatModal = () => {
      if (modalType !== 'repeat') return null;

      let _weekButton = (daysArr, label) => {
        let weekActive = true;
        daysArr.forEach(el => {
          if (!weekActive) return;
          if (daysActive.indexOf(el) < 0) weekActive = false;
        });
        return (
          <TouchableOpacity
            style={[styles.repeatButton,
              weekActive ? styles.repeatButtonActive : styles.repeatButtonInactive]}
            onPress={() => {
              let nextWeekdaysActive = !weekActive;
              daysArr.forEach((el, i) => {
                setTimeout(function(el) {
                  this._switchRepeatDay(nextWeekdaysActive, el);
                }.bind(this,el), 100*i);
              });
            }}>
            <Text
              style={weekActive ? styles.repeatButtonTextActive :
                styles.repeatButtonTextInactive}>{label}</Text>
          </TouchableOpacity>
        );
      }

      return (
        <View
          onLayout={e => this.setState({repeatModalTop:
            (Constant.DIMENSION.WINDOW_HEIGHT - e.nativeEvent.layout.height) / 2 })
          }
          style={{position:'absolute', top:repeatModalTop,
            left:(Constant.DIMENSION.WINDOW_WIDTH-250)/2, backgroundColor:'white',
            borderRadius:7, width:250}}>
          <View
            style={[{height:40, alignItems:'center', justifyContent:'center'},
              styles.modalBottomBorder]}>
            <Text style={{fontWeight:'bold'}}>Repeat</Text>
          </View>
          <View
            style={[{padding:7, flexDirection:'row', justifyContent:'center'},
              styles.modalBottomBorder]}>
            {_weekButton([2,3,4,5,6], 'Weekdays')}
            <View style={{width:10}} />
            {_weekButton([1,7], 'Weekend')}
          </View>
          <View
            style={[styles.repeatRow, styles.modalBottomBorder]}>
            <Text style={styles.repeatDayText}>Sunday</Text>
            <Switch
              onValueChange={(value) => this._switchRepeatDay(value, 1)}
              value={daysActive.indexOf(1) > -1} />
          </View>
          <View
            style={[styles.repeatRow, styles.modalBottomBorder]}>
            <Text style={styles.repeatDayText}>Monday</Text>
            <Switch
              onValueChange={(value) => this._switchRepeatDay(value, 2)}
              value={daysActive.indexOf(2) > -1} />
          </View>
          <View
            style={[styles.repeatRow, styles.modalBottomBorder]}>
            <Text style={styles.repeatDayText}>Tuesday</Text>
            <Switch
              onValueChange={(value) => this._switchRepeatDay(value, 3)}
              value={daysActive.indexOf(3) > -1} />
          </View>
          <View
            style={[styles.repeatRow, styles.modalBottomBorder]}>
            <Text style={styles.repeatDayText}>Wednesday</Text>
            <Switch
              onValueChange={(value) => this._switchRepeatDay(value, 4)}
              value={daysActive.indexOf(4) > -1} />
          </View>
          <View
            style={[styles.repeatRow, styles.modalBottomBorder]}>
            <Text style={styles.repeatDayText}>Thursday</Text>
            <Switch
              onValueChange={(value) => this._switchRepeatDay(value, 5)}
              value={daysActive.indexOf(5) > -1} />
          </View>
          <View
            style={[styles.repeatRow, styles.modalBottomBorder]}>
            <Text style={styles.repeatDayText}>Friday</Text>
            <Switch
              onValueChange={(value) => this._switchRepeatDay(value, 6)}
              value={daysActive.indexOf(6) > -1} />
          </View>
          <View
            style={[styles.repeatRow, styles.modalBottomBorder]}>
            <Text style={styles.repeatDayText}>Saturday</Text>
            <Switch
              onValueChange={(value) => this._switchRepeatDay(value, 7)}
              value={daysActive.indexOf(7) > -1} />
          </View>
        </View>
      )
    }

    let _repeatDaysLabel = () => {
      if (daysActive.length < 1) return 'Never';

      let label = '';
      daysActive.sort();
      daysActive.forEach(el => {
        switch (el) {
          case 1:
            label += 'Sun, ';
            break;
          case 2:
            label += 'Mon, ';
            break;
          case 3:
            label += 'Tue, ';
            break;
          case 4:
            label += 'Wed, ';
            break;
          case 5:
            label += 'Thu, ';
            break;
          case 6:
            label += 'Fri, ';
            break;
          case 7:
            label += 'Sat, ';
            break;
        }
      });
      return label.slice(0,-2);
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
                    <Text style={{fontSize:23}}>&#39;Ashar</Text>
                  </View>
                  <View style={styles.prayTimeContainer}>
                    <Text style={{fontSize:23}}>Maghrib</Text>
                  </View>
                  <View style={styles.prayTimeContainer}>
                    <Text style={{fontSize:23}}>&#39;Isya</Text>
                  </View>
                </ScrollView>
              </View>
              <Text style={{fontSize:23}}>&nbsp;&gt;</Text>
            </View>
        	</View>

          {/* repeat */}
          <View
            style={[styles.container,
              {flexDirection:'row', justifyContent:'space-between', padding:0}]}>
            <Text style={{marginLeft:10}}>Repeat</Text>
            <TouchableOpacity style={{padding:10, flex:1, alignItems:'flex-end'}}
              onPress={() => this.setState({modalVisible:true, modalType:'repeat'})} >
              <Text style={{color:'blue'}}>{_repeatDaysLabel()}</Text>
            </TouchableOpacity>
          </View>

          {/* label */}
          <View
            style={[styles.container,
              {flexDirection:'row', justifyContent:'space-between', padding:10}]}>
            <Text>Label</Text>
            <TextInput placeholder={prayTime} style={{flex:1, textAlign:'right', fontSize:14}}
            onChangeText={text => this.labelValue = text}/>
          </View>
        </ScrollView>

        <Modal animationType='slide' transparent={true} visible={modalVisible}>
          <TouchableOpacity
            style={{width:Constant.DIMENSION.WINDOW_WIDTH,
              height:Constant.DIMENSION.WINDOW_HEIGHT,
              backgroundColor:'rgba(0,0,0,0.3)'}}
            onPress={() => this.setState({modalVisible:false})}>
          </TouchableOpacity>
          {_repeatModal()}
        </Modal>
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
  modalBottomBorder: {
    borderBottomWidth:0.5,
    borderBottomColor:'#aaa',
  },
  prayTimeContainer: {
    width:100,
    alignItems:'center',
  },
  repeatButton: {
    borderRadius:7,
    width:100,
    height:23,
    alignItems:'center',
    justifyContent:'center',
  },
  repeatButtonActive: {
    backgroundColor:'#28a5ff',
  },
  repeatButtonInactive: {
    borderWidth: 0.5,
    borderColor: '#28a5ff',
  },
  repeatButtonTextActive: {
    color: 'white',
  },
  repeatButtonTextInactive: {
    color: '#28a5ff',
  },
  repeatDayText: {
    fontSize: 17,
  },
  repeatRow: {
    height:50,
    flexDirection:'row',
    alignItems:'center', padding:10,
    justifyContent:'space-between'
  },
  subcontainer: {
  	flexDirection:'row',
  	alignItems:'center',
  },
});
