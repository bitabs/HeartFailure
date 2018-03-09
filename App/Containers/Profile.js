import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TouchableHighlight, Image, Dimensions, ScrollView} from "react-native";
import Svg, { Line, G, Path } from 'react-native-svg';

import Ionicons from "react-native-vector-icons/Feather";
import Chart from "./Chart";

import User from '../Components/User';
import firebase from 'react-native-firebase';
import Database from '../Components/Database';
import {Images} from '../Containers/PreLoadImages';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    User().then(user => {
      firebase.app().database().ref(`/Users/${user.uid}`).on('value', (snap) => {
        if (snap.val()) this.setState(prevState => ({
          user: {...prevState.user, ...snap.val(), uid: user.uid}
        }));
      });

      firebase.app().database().ref(`/ECG/${user.uid}`).on('value', (snap) => {
        if (snap.val()) this.setState(prevState => ({
          user: {...prevState.user, ECG: [...snap.val()]}
        }));
      });

      firebase.app().database().ref(`/Health/${user.uid}`).on('value', (snap) => {
        if (snap.val()) this.setState(prevState => ({
          user: {...prevState.user, Health: {...snap.val()}}
        }));
      });
    });
  }

  config = () => {
    const $this = this;
    return {
      chart: {
        backgroundColor: 'rgba(188,202,208, 0.1)',
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
          color: '#aab8be',
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
          data = $this.state.user.ECG;
          return data;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  };

  render() {

    console.log(this.state.user);

    const user = this.state.user;

    const Profile = user ? (
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.topSection}>
            <Image blurRadius={10} source={require('../Images/backgroundImg.jpg')} style={{
              position: 'absolute',
              flex: 1,
              width: Dimensions.get('window').width,
              height: 320,
              resizeMode: 'cover',
            }} />
            <View style={[styles.topSection, styles.navigationBar]}>

              <TouchableHighlight onPress={() => this.props.navigation.navigate('DrawerOpen')} activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">
                <Svg height="24" width="24">
                  <Line fill="none" stroke="#f3f3f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="3" y1="12" x2="21" y2="12"/>
                  <Line fill="none" stroke="#f3f3f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="10.208" y1="6" x2="21" y2="6"/>
                  <Line fill="none" stroke="#f3f3f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="3" y1="18" x2="13.791" y2="18"/>
                </Svg>
              </TouchableHighlight>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')}>
                <Ionicons name={"edit-2"} size={22} color="#f3f3f3" />
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <View style={styles.imgCircleContainer}>
                <Image style={styles.userImg} source={Images[user.uid]} resizeMode="contain"/>
                <View style={styles.imgOverlay} />
              </View>

              <Text style={styles.profileName}>{user.name}{'\n'}
                <Text style={styles.profession}>{user.profession}</Text>
              </Text>

              <View style={styles.socialIcons}>
                <View style={styles.facebook}><Ionicons name={"facebook"} size={18} color="rgba(243, 243, 243, 0.8)" /></View>
                <View style={styles.twitter}><Ionicons name={"twitter"} size={18} color="rgba(243, 243, 243, 0.8)" /></View>
                <View style={styles.instagram}><Ionicons name={"instagram"} size={18} color="rgba(243, 243, 243, 0.8)" /></View>
              </View>
            </View>
          </View>

          <View style={styles.infoSection}>

            <View style={{flexDirection: 'column', marginBottom: 20, position: 'relative'}}>
              <Ionicons name={"feather"} size={18} color="#aab8be" style={{paddingLeft: 20}} />
              <View style={styles.profileDetails}>
                <View style={styles.profileDetailsLeft}>
                  <Text style={styles.profileTextField}>
                    <Text style={styles.fieldValue}>{user.name || "Not Specified"}</Text>
                    {'\n'}
                    <Text style={styles.fieldTitle}>
                      <Ionicons name={"at-sign"} size={11} color="rgba(188,202,208, 0.9)" />
                      <Text style={{paddingLeft: 10}}>Name</Text>
                    </Text>
                  </Text>

                  <Text style={styles.profileTextField}>
                    <Text style={styles.fieldValue}>{user.profession || "Not Specified"}</Text>
                    {'\n'}
                    <Text style={styles.fieldTitle}>
                      <Ionicons name={"at-sign"} size={11} color="rgba(188,202,208, 0.9)" />
                      <Text style={{paddingLeft: 10}}>Profession</Text>
                    </Text>
                  </Text>

                  <Text style={styles.profileTextField}>
                    <Text style={styles.fieldValue}>{user.age || "Not Specified"}</Text>
                    {'\n'}
                    <Text style={styles.fieldTitle}>
                      <Ionicons name={"at-sign"} size={11} color="rgba(188,202,208, 0.9)" />
                      <Text style={{paddingLeft: 10}}>Age</Text>
                    </Text>
                  </Text>

                </View>
                <View style={styles.profileDetailsRight}>
                  <Text style={styles.profileTextField}>
                    <Text style={styles.fieldValue}>{user.address || "Not Specified"}</Text>
                    {'\n'}
                    <Text style={styles.fieldTitle}>
                      <Ionicons name={"at-sign"} size={11} color="rgba(188,202,208, 0.9)" />
                      <Text style={{paddingLeft: 10}}>Address</Text>
                    </Text>
                  </Text>

                  <Text style={styles.profileTextField}>
                    <Text style={styles.fieldValue}>{user.DOB || user.dob || "Not Specified"}</Text>
                    {'\n'}
                    <Text style={styles.fieldTitle}>
                      <Ionicons name={"at-sign"} size={11} color="rgba(188,202,208, 0.9)" />
                      <Text style={{paddingLeft: 10}}>Date Of Birth</Text>
                    </Text>
                  </Text>

                  <Text style={styles.profileTextField}>
                    <Text style={styles.fieldValue}>{user.contactNumber}</Text>
                    {'\n'}
                    <Text style={styles.fieldTitle}>
                      <Ionicons name={"at-sign"} size={11} color="rgba(188,202,208, 0.9)" />
                      <Text style={{paddingLeft: 10}}>Contact Number</Text>
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.bar} />
            </View>

            {
              user.Health ? (
                <View style={{marginBottom: 20, position: 'relative'}}>
                  <Ionicons name={"clipboard"} size={18} color="#aab8be" style={{paddingLeft: 20}} />
                  <View style={styles.healthContainer}>
                    <View>
                      <Text style={styles.healthTitle}>Temperature</Text>
                      <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons name={"thermometer"} size={18} color="#aab8be" style={{marginRight: 3, alignSelf: 'center'}} />
                        <Text style={{fontSize: 30, color: '#aab8be'}}>{user.Health.thermometer}°</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.healthTitle}>Calories Burned</Text>
                      <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons name={"droplet"} size={18} color="#aab8be" style={{marginRight: 3}} />
                        <Text style={{fontSize: 30, color: '#aab8be'}}>{user.Health.calories}
                          <Text style={{fontSize: 13, fontWeight: 'bold', color: 'rgba(144, 154, 174, 0.5)'}}>cal</Text>
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.healthTitle}>Heart Rate</Text>
                      <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons name={"heart"} size={18} color="#aab8be" style={{marginRight: 3}} />
                        <Text style={{fontSize: 30, color: '#aab8be'}}>{user.Health.bpm}
                          <Text style={{fontSize: 13, fontWeight: 'bold', color: 'rgba(144, 154, 174, 0.5)'}}>bpm</Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.bar} />
                </View>
              ): null
            }

            {
              user.ECG ? (
                <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                  <View style={{margin: 0}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Ionicons name={"activity"} size={18} color="#aab8be" style={{paddingLeft: 20}} />
                      <Text style={{fontSize: 17, color: '#aab8be', textAlign: 'center', paddingLeft: 10}}>Electrocardiograph</Text>
                    </View>
                    <View style={[styles.healthContainer, styles.infoSection, {padding: 0, paddingTop: 15, paddingBottom: 25}]}>
                      <Chart type={"day"} height={160} width={(Dimensions.get('window').width)} config={this.config()} component={"Statistics"}/>
                    </View>
                  </View>
                  <View style={{margin: 0}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Ionicons name={"heart"} size={18} color="#aab8be" style={{paddingLeft: 20}} />
                      <Text style={{fontSize: 17, color: '#aab8be', textAlign: 'center', paddingLeft: 10}}>Heart Sound</Text>
                    </View>
                    <View style={[styles.healthContainer, styles.infoSection, {padding: 0, paddingTop: 15, paddingBottom: 25}]}>
                      <Chart type={"day"} height={160} width={(Dimensions.get('window').width)} config={this.config()} component={"Statistics"}/>
                    </View>
                  </View>
                </View>
              ): null
            }

          </View>

        </ScrollView>
      </View>
    ): null;

    return (
      Profile
    )
  }
}

/*
*
*                   <View style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              width: Dimensions.get('window').width,
              height: 300,
              backgroundColor: 'rgba(188,202,208, 1)',
              transform: [{'skewY': '-5deg'}]
            }} />
*
    *       <TouchableHighlight style={styles.profileBtn}>
            <Ionicons name={"user-plus"} size={20} color="#f3f3f3" />
          </TouchableHighlight>*/


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  topSection: {
    flexDirection: 'column',
    backgroundColor: 'rgba(188,202,208, 1)',
    padding:10,
    position: 'relative',
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  imageContainer: {
    alignItems: 'center'
  },
  imgCircleContainer: {
    position: 'relative',
    borderRadius: 80,
    height: 110,
    width: 110,
    borderColor: 'white',
    backgroundColor: 'white',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 40,
    justifyContent: 'center',
    marginBottom: 10
  },
  userImg: {
    borderRadius: 300,
    height: 100,
    width: 100,
  },
  imgOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(246,246,246, 0.8)',
    opacity: 0.5,
    borderRadius: 300,
    height: 100,
    width: 100,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  profession: {
    fontSize: 15,
    fontWeight: '200',
    color: 'rgba(243, 243, 243, 0.8)'
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  facebook: {
    margin: 10,
    marginLeft: 15,
    marginRight: 15
  },
  twitter: {
    margin: 10,
    marginLeft: 15,
    marginRight: 15
  },
  instagram: {
    margin: 10,
    marginLeft: 15,
    marginRight: 15
  },
  profileBtn: {
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: (Dimensions.get('window').height / 2) - 65,
    backgroundColor: '#E67D8F',
    elevation: 10,
    marginTop: 30,
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
    width: 150,
    padding: 15,
    maxWidth: 150,
    borderRadius: 100 / 2
  },
  infoSection: {
    flexDirection: 'column',
    paddingTop: 40,
    padding:10,
    paddingBottom: 50,
    position: 'relative',
    backgroundColor: 'white'
  },
  profileDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    //backgroundColor: 'white'
  },
  profileDetailsLeft: {
    flexDirection: 'column',
  },
  profileDetailsRight: {
    flexDirection: 'column',
  },
  profileTextField: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  fieldTitle: {
    fontSize: 12,
    color: 'rgba(188,202,208, 0.9)'
  },
  fieldValue: {
    fontSize: 14,
    color: '#aab8be'
  },
  healthContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  healthTitle: {
    fontSize: 14,
    color: '#aab8be',
    textAlign: 'center'
  },
  bar: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: 100,
    height: 2,
    backgroundColor: 'rgba(188,202,208, 0.15)'
  }
});
