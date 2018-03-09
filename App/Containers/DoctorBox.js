import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Image, Animated, Easing, TouchableHighlight, TouchableOpacity} from "react-native";
import PropTypes from 'prop-types';
import {Images} from './PreLoadImages';
import Ionicons from 'react-native-vector-icons/Feather';
import Svg, { Path, Polygon, Polyline, G } from 'react-native-svg';

export default class DoctorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Doctor: this.props.Doctor,
      randomFav: null,
      wait: true,
      clicked: false
    };
    this.animatedValue = new Animated.Value(1)
  }

  componentDidMount() {
    this.setState({
      randomFav: this.getRandomInt(0,4)
    });

    this.spin();
  }

  spin () {
    this.animatedValue.setValue(1);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 1000,
        delay: 100,
        easing: Easing.linear
      }
    ).start( () => this.setState({wait: false}));
  }


  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  update = (doctor) => {
    this.props.updateIndex('Patient');
    this.props.doctorView(doctor);
  };


  toggleClick = () => this.setState({clicked: !this.state.clicked});

  render() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    });
    const { Doctor } = this.props;

    const favorite = [1,2,3,4,5].map((e,i) => {
      return (
        <Svg height="15" width="15" key={i}>
          <Polygon fill={i < this.state.randomFav ? "#E67D8F" : '#f1f1f1'} stroke={i < this.state.randomFav ? "#E67D8F" : '#f1f1f1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                   points= "9,4.958 10.313,7.618 13.25,8.048 11.125,10.119 11.627,13.042 9,11.66 6.374,13.042 6.875,10.119 4.75,8.048 7.688,7.618 "
          />
        </Svg>
      )
    });

    const patients = Doctor.Patients ? Object.keys(Doctor.Patients).map((uid, i) => {
      if (i < 3) return (
        <View style={[styles.imgCircleContainer, {position: 'absolute', left: i * 17}]} key={i}>
          <Image style={{
            borderRadius: 300,
            height: 25,
            width: 25,
          }} source={Images[uid]} resizeMode="contain" key={i}/>
        </View>
      )
    }): null;

    let returnThis = (
      <View style={[styles.box, {position: 'relative'}]}>

        <View style={{flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start'}}>

          <View style={styles.leftContainer}>
            <Image style={styles.userImg} source={Images[this.props.uid]} resizeMode="contain"/>
            <View style={styles.verified}>
              <Ionicons style={{fontWeight: '900'}} name="check" size={15} color="white" />
            </View>
          </View>

          <View style={styles.rightContainer}>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexWrap: 'wrap', maxWidth: 130, alignItems: 'flex-start'}}>
                <Text style={styles.name}>{this.props.Doctor.name}</Text>
                <Text style={styles.profession}>{this.props.Doctor.profession}</Text>
              </View>
              <View style={{alignSelf: 'flex-start', marginTop: 5, flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons style={{fontWeight: '900', marginRight: 5}} name="map-pin" size={10} color="#909aae" />
                <Text numberOfLines={1} style={{fontSize: 10, color: '#909aae', flexWrap: 'wrap', maxWidth: 100}}>{Doctor.address || "Not Specified"}</Text>
              </View>
            </View>

            <View style={{marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold', color: '#97a4aa', marginRight: 5}}>{this.state.randomFav}.00</Text>
                {favorite}
              </View>
            </View>

            {
              patients ? (
                <View style={{marginTop: 10, position: 'relative', marginBottom: 10, height: 20}}>
                  <View style={{flexDirection: 'row', position: 'relative'}}>
                    <View style={{position: 'relative'}}>
                      {patients}
                    </View>
                    {
                      patients && Object.keys(patients).length > 3 ? (
                        <View style={[styles.imgCircleContainer, {position: 'absolute', left: 56, backgroundColor: 'white', } ]}>
                          <View style={{width: 25, height: 25, backgroundColor: '#f8f8f8', borderRadius: 300, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 10, fontWeight: 'bold'}}>+{Object.keys(patients).length - 3}</Text>
                          </View>
                        </View>
                      ): null
                    }
                  </View>
                </View>
              ):null
            }

            <View style={{marginTop: 10}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  this.update({uid: this.props.uid,...this.props.Doctor});
                  this.toggleClick();
                }}
                style={[styles.messageBtn, {
                  padding: 15,
                  borderRadius: 5,
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: "#f6f6f6",
                  //elevation: 1
                }]}
              >
                <View style={[styles.messageBtn, {backgroundColor: "#f6f6f6",}]}>
                  <Ionicons style={{fontWeight: '900', marginRight: 5}} name="message-square" size={16} color="#bccad0" />
                  <Text style={{fontSize: 11, color: '#bccad0'}}>Send Message</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {
          this.state.wait ? (
            <Animated.View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'white', opacity} } />
          ) : null
        }
      </View>
    );

    return(
      <View>{returnThis}</View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    //elevation: 0.5,
    minWidth: 360,
    //minHeight: 120
  },
  leftContainer: {
    position: 'relative',
    marginRight: 20
  },
  rightContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column'
  },
  userImg: {
    //marginTop: 40,
    borderRadius: 300,
    height: 80,
    width: 80
  },
  verified: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#59D0D0',
    padding: 2,
    width: 20, height: 20,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: 16,
    color: '#909aae'
  },
  profession: {
    fontSize: 13,
    opacity: 0.5,
    color: 'rgba(144, 154, 174, 0.8)'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  infoBox: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  imgCircleContainer: {
    //position: 'relative',
    borderRadius: 300,
    height: 30,
    width: 30,
    borderColor: 'white',
    backgroundColor: 'white',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 0,
    justifyContent: 'center',
    //marginBottom: 10
  },
  messageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: this.state.clicked ? "red" : "f6f6f6",
    // backgroundColor: '#f6f6f6',
    alignSelf: 'flex-start'
  }
});


DoctorBox.propTypes = {
  uid    : PropTypes.string.isRequired,
  Doctor : PropTypes.object.isRequired,
  updateIndex: PropTypes.func.isRequired
};
