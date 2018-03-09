import React, {Component} from 'react';
import {
  View, ScrollView, Text, StyleSheet, Image, Animated, Easing, TouchableHighlight, TouchableOpacity,
  Dimensions
} from "react-native";
import Chart from "./Chart";
import PropTypes from 'prop-types';
import {Images} from './PreLoadImages';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Svg, { Polygon, Circle, Path } from 'react-native-svg';

export default class UserBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: this.props.User,
      randomFav: null,
      randomWatch: null,
      totalMessages: null,
      wait: true,
      star: "9,4.958 10.313,7.618 13.25,8.048 11.125,10.119 11.627,13.042 9,11.66 6.374,13.042 6.875,10.119 4.75,8.048 7.688,7.618"
    };
    this.animatedValue = new Animated.Value(1);
  }

  componentDidMount() {
    this.setState({
      randomFav: this.getRandomInt(0,4),
      randomWatch: this.getRandomInt(0, 500)
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

  config = () => {
    const $this = this;
    return {
      chart: {
        backgroundColor: 'rgba(188,202,208, 0)',
      },
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      xAxis: {
        visible: false,
      },
      plotOptions: {
        series: {
          color: 'rgba(230, 125, 143, 0.4)',
          lineWidth: 1.5,
          marker: {
            enabled: false
          },
        },
        line: {
          marker: {
            enabled: false
          },
          states: {
            select: {
              lineWidth: 1.5
            }
          },
          events: {
            click: function() {
              this.setState(this.state === 'select' ? '' : 'select');
            }
          }
        }
      },
      yAxis: {
        visible: false
      },
      tooltip: { enabled: false },
      scrollbar: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Random data',
        data: (function() {
          let data = [];

          if ($this.props.User && $this.props.User.ecg)
            return $this.props.User.ecg;
          //data = $this.props.Patient.ecg;
          //return data;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  };

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  update = (user) => {
    console.log(this.props.type);
    this.props.updateIndex(this.props.type);
    this.props.userView(user);
  };

  stars = () => {
    return (
      <View style={{marginTop: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', color: '#97a4aa', marginRight: 5}}>{this.state.randomFav}.00</Text>
          {[1,2,3,4,5].map((e,i) => {
            return (
              <Svg height="15" width="15" key={i}>
                <Polygon
                  fill            = {i < this.state.randomFav ? "#E67D8F" : '#f1f1f1'}
                  stroke          = {i < this.state.randomFav ? "#E67D8F" : '#f1f1f1'}
                  strokeWidth     = "2"
                  strokeLinecap   = "round"
                  strokeLinejoin  = "round"
                  points          = {this.state.star}
                />
              </Svg>
            )
          })}
        </View>
      </View>
    )
  };

  stackedUsers = User => {
    let user = User.Patients || User.Doctors;


    const Users = User && user ? Object.keys(user).map((uid, i) => {
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

    const more = Users && Object.keys(Users).length > 3;


    return (
      <View>
        {Users ? (<View style={{marginTop: 10, position: 'relative', marginBottom: 10, height: 20}}>
          <View style={{flexDirection: 'row', position: 'relative'}}>
            <View style={{position: 'relative'}}>
              {Users}
            </View>
            {more ? (
              <View style={[styles.imgCircleContainer, {position: 'absolute', left: 56, backgroundColor: 'white', } ]}>
                <View style={{width: 25, height: 25, backgroundColor: '#f8f8f8', borderRadius: 300, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 10, fontWeight: 'bold'}}>+{Object.keys(Users).length - 3}</Text>
                </View>
              </View>
            ): null}
          </View>
        </View>): null}
      </View>
    );
  };

  UsersGeneralDetails = (name, profession, address) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexWrap: 'wrap', maxWidth: 130, alignItems: 'flex-start'}}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View style={{alignSelf: 'flex-start', marginTop: 5, flexDirection: 'row', alignItems: 'center'}}>
          <Feather style={{fontWeight: '900', marginRight: 5}} name="map-pin" size={10} color="#909aae" />
          <Text numberOfLines={1} style={{fontSize: 10, color: '#909aae', flexWrap: 'wrap', maxWidth: 100}}>{address || "Not Specified"}</Text>
        </View>
      </View>
    )
  };

  ECG = User => {
    return (
      User && User.ecg ? (
        <View style={{alignItems: 'center', padding: 0}}>
          <Chart type={"day"} height={100} width={"100%"} config={this.config()} component={"Statistics"}/>
        </View>
      ): null
    )
  };

  UserLeftSection = (User, uid) => {
    const {health = null} = User;
    const tagColor = ((healthAlert) => {
      if (healthAlert === "Stable") return "#44C8A6";
      if (healthAlert === "Average") return "#FB8469";
      if (healthAlert === "High") return "#E67D8F";
    })(health.healthAlert);

    return (
      <View style={styles.leftContainer}>

        <View style={{marginBottom: 20}}>
          <View style={[styles.imgRound, {
            backgroundColor: tagColor
          }]}>
            <Image style={styles.userImg} source={Images[uid]} resizeMode="contain"/>
            <View style={styles.imgOverlay} />
          </View>
          <View style={styles.verified}>
            <Feather style={{fontWeight: '900'}} name="check" size={15} color="white" />
          </View>
        </View>


        <View style={{width: '100%'}}>
          <View style={{alignSelf: 'center'}}>
            <Svg width="31.463" height="31.463" viewBox="0 0 31.463 31.463">
              <Circle fill={"rgba(144, 154, 174, 0.4)"} cx="15.698" cy="2.644" r="2.644" />
              <Path fill={'rgba(144, 154, 174, 0.4)'} d="M21.396,8.791c0,0,0.148-2.953-2.968-2.953h-5.403c-3.005,0-2.983,2.727-2.985,2.953l0.001,8.38
		c0.049,0.452,0.495,0.967,1.049,0.967c0.551,0,0.956-0.499,1.006-0.952l0.938,13.346c0.069,0.679,0.549,0.932,1.139,0.932
		c0.589,0,1.068-0.253,1.137-0.932h0.833c0.072,0.679,0.55,0.932,1.137,0.932c0.591,0,1.07-0.253,1.141-0.932l0.966-13.354
		c0,0.453,0.438,0.963,0.992,0.963c0.552,0,0.993-0.517,1.042-0.969L21.396,8.791z"/>
            </Svg>
          </View>

          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5}}>
              <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 12, fontWeight: 'bold'}}>{health.height}cm</Text>
              <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 10}}>Height</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5}}>
              <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 12, fontWeight: 'bold'}}>{health.weight}cm</Text>
              <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 10}}>Weight</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5}}>
              <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 12, fontWeight: 'bold'}}>{health.age}</Text>
              <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 10}}>Age</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5}}>
              <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 12, fontWeight: 'bold'}}>{health.fat}%</Text>
              <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 10}}>Fat</Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
              <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 12}}>Allergies</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {Object.values(health.allergies).map((allergy, i) => {
                  if (i <= 1)
                  return <Text key={i} style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 10}}>{allergy}{i !== 1 ? ', ' : ''}</Text>
                })}
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  };

  UserRightSection = User => {

    const {health = null} = User;

    return (
      <View style={styles.rightContainer}>

        {this.UsersGeneralDetails(User.name, User.profession, User.address)}

        {this.stars()}

        {this.stackedUsers(User)}

        {health ? (
          <View>
            <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 15, marginTop: 10, fontWeight: 'bold'}}>Health Summary</Text>

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons style={{fontWeight: '900'}} name="md-heart" size={17} color="rgba(144, 154, 174, 0.5)" />
                <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 20}}>{health.bpm}
                  <Text style={{fontSize: 13}}> bpm</Text>
                </Text>
              </View>

              <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons style={{fontWeight: '900'}} name="md-flame" size={17} color="rgba(144, 154, 174, 0.5)" />
                <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 20 }}>{health.calories}
                  <Text style={{fontSize: 13}}> cal</Text>
                </Text>
              </View>

              <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons style={{fontWeight: '900'}} name="md-thermometer" size={17} color="rgba(144, 154, 174, 0.5)" />
                <Text style={{color: 'rgba(144, 154, 174, 0.5)', fontSize: 20 }}>{health.thermometer}°
                </Text>
              </View>
            </View>
          </View>
        ):null}

        {this.ECG(User)}

      </View>
    );
  };

  render() {
    const
      opacity   = this.animatedValue.interpolate({inputRange: [0, 0.5, 1], outputRange: [0, 0.5, 1]}),
      { User }  = this.props;

    console.log(User);

    return(
      <View style={[styles.box, {position: 'relative'}]}>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.update({uid: this.props.uid,...User})}
          style={{alignSelf: 'flex-end', padding: 10, paddingRight: 0, paddingLeft: 30}}>
          <Feather style={{fontWeight: '900'}} name="more-horizontal" size={15} color="#909aae" />
        </TouchableOpacity>

        <View style={{flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start'}}>
          {this.UserLeftSection(User, this.props.uid)}
          {this.UserRightSection(User)}
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          paddingBottom: 20,
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather style={{fontWeight: '900'}} name="eye" size={15} color="rgba(144, 154, 174, 0.5)" />
            <Text style={{marginLeft: 5, fontSize: 10, color: 'rgba(144, 154, 174, 0.5)'}}>{this.state.randomWatch}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather style={{fontWeight: '900'}} name="message-square" size={15} color="rgba(144, 154, 174, 0.5)" />
            <Text style={{marginLeft: 5,  fontSize: 10, color: 'rgba(144, 154, 174, 0.5)'}}>{this.getRandomInt(0, 500)}</Text>

          </View>
        </View>


        {this.state.wait ? (
          <Animated.View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'white', opacity} } />
        ): null}
      </View>
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
    paddingBottom: 0,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width
  },
  leftContainer: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  rightContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column'
  },
  userImg: {
    borderRadius: 300,
    height: 80,
    width: 80
  },
  verified: {
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#59D0D0',
    padding: 2,
    width: 20, height: 20,
    borderRadius: 100 / 2,
    left: 5,
    elevation: 2,
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
    borderRadius: 300,
    height: 30,
    width: 30,
    borderColor: 'white',
    backgroundColor: 'white',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 0,
    justifyContent: 'center',
  },
  imgRound: {
    position: 'relative',
    borderRadius: 300,
    height: 83,
    width: 83,
    // borderColor: 'white',
    // backgroundColor: 'black',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 2,
    justifyContent: 'center',
  },
  imgOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(144, 154, 174, 0.8)',
    opacity: 0.5,
    borderRadius: 300,
    height: 100,
    width: 100,
  },
  messageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  }
});


UserBox.propTypes = {
  uid         : PropTypes.string.isRequired,
  User        : PropTypes.object.isRequired,
  updateIndex : PropTypes.func.isRequired
};
