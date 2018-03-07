import React, {Component} from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TouchableHighlight, Dimensions, Image, ScrollView, TextInput
} from 'react-native';
import Ionicons from "react-native-vector-icons/Feather";

import User from '../Components/User';
import firebase from 'react-native-firebase';
import Database from '../Components/Database';
import {Images} from '../Containers/PreLoadImages';

import Chart from "./Chart";
import Svg, { Path, Polygon, Polyline, G } from 'react-native-svg';
import TimeAgo from "react-native-timeago";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      message: null,
      globalObj: null,
      messageObj: null,
      randomFav   : null,
      doctorUid: "",
      type: ""
    };

    this.initialiseDB = this.initialiseDB.bind(this);
    this.PCommentsRef = firebase.app().database().ref(`/PatientsCommentsToDoctors`);
    this.DCommentsRef = firebase.app().database().ref(`/DoctorsCommentsToPatients`);

    User().then(user => {
      this.userRef = firebase.app().database().ref(`/Users/${user.uid}`);
    });
  }

  componentDidMount() {
    User().then(user => {
      this.setState({
        user: user,
        doctorUid: user.uid,
        randomFav: this.getRandomInt(0,4)
      }, () => {
        this.initialiseDB(this.userRef);
      });
    });
  }

  initialiseDB = (userRef) => {
    if (this.props.User) userRef.on('value', (snap) => {
      if (snap.val()) this.setState(prevState => ({
        user: {...prevState.user, ...snap.val()},
        type: snap.val().type
      }), () => {
        Database.initialiseMessagesDB(
          snap.val().name, "", this.props.User.uid, snap.val().type
        ).then(() => this.getMessage(this.PCommentsRef, this.DCommentsRef));
      });
    });
  };

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

          if ($this.props.User && $this.props.User.ecg)
            return $this.props.User.ecg;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  };

  sendMessage = (uid) => {
    const {user} = this.state;
    if (user) Database.setMessage(uid, user.type, this.state.message);
  };

  getMessage = (PatientsCommentsToDoctors, DoctorsCommentsToPatients) => {
    let globalObj = null;

    PatientsCommentsToDoctors.on('value', (snap) => {
      this.setState(prevState => ({
        globalObj: {...prevState.globalObj, ...snap.val()}
      }));
    });

    DoctorsCommentsToPatients.on('value', (snap) => {
      this.setState(prevState => ({
        globalObj: {...prevState.globalObj, ...snap.val()}
      }), () => {
        this.filterMsg(this.props.User);
      });
    });
  };

  filterMsg = (User) => {
    const { user } = this.state;
    if (user) {
      let filtered = Object.keys(this.state.globalObj).reduce((acc, val) => {
        const patientToDoctor = `${User.uid}<=>${user.uid}`;
        const doctorToPatient = `${user.uid}<=>${User.uid}`;
        if(val === patientToDoctor || val === doctorToPatient)
          acc[val] = this.state.globalObj[val];
        return acc;
      }, {});
      if (filtered !== {}) this.setState({messageObj: filtered})
    }
  };

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  favorite = () => [1,2,3,4,5].map((e,i) => {
    return (
      <Svg height="15" width="15" key={i}>
        <Polygon fill={i < this.state.randomFav ? "#E67D8F" : '#f1f1f1'} stroke={i < this.state.randomFav ? "#E67D8F" : '#f1f1f1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 points= "9,4.958 10.313,7.618 13.25,8.048 11.125,10.119 11.627,13.042 9,11.66 6.374,13.042 6.875,10.119 4.75,8.048 7.688,7.618 "
        />
      </Svg>
    )
  });

  render() {
    const { User } = this.props;
    console.log(User);
    let total = 0;

    let Messages = this.state.messageObj ? Object.keys(this.state.messageObj).map((m, i) => {
      const person = this.state.messageObj[m];
      const obj = this.state.messageObj[m].messages;
      if (obj) {
        total += Object.values(obj).length;
        return Object.keys(obj).sort((a, b) => obj[a].timeStamp < obj[b].timeStamp).map((e, j) => {
          const message = obj[e];
          return (
            <View style={styles.comment} key={j}>
              <Image style={styles.profPic} source={Images[person.uid]} resizeMode="contain"/>
              <View style={styles.msgText}>
                <View style={styles.$top}>
                  <Text style={styles.name}>{person.name}</Text>
                  <View style={styles.time}>
                    <Ionicons name={"clock"} size={15} color="#6d777d"/>
                    <TimeAgo style={{fontSize: 13, marginLeft: 5, fontWeight: 'bold'}} time={message.timeStamp}/>
                  </View>
                </View>
                <Text numberOfLines={3} style={{color: '#bccad0'}}>{message.msgText}</Text>
              </View>
            </View>
          )
        })
      }}) : null;

    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Ionicons style={{position: 'absolute', top: 20, left: 20}} name={"arrow-left"} size={30} color="#cedde3" />
            <View>
              <View style={styles.profileTopContainer}>
                <Image style={styles.userImg} source={Images[User.uid]} resizeMode="contain"/>
                <View style={{alignItems: 'flex-end', flexDirection:'column', justifyContent: 'space-between'}}>
                  <Text style={{fontWeight: 'bold', fontSize: 16, color: '#bccad0'}}>Get to know me:</Text>
                  <Text style={{color: '#bccad0', flexWrap: 'wrap', maxWidth: 100, textAlign: 'right'}} numberOfLines={2}>{User.address}</Text>
                  <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                    <View style={{flexDirection: 'row'}}>{this.favorite()}</View>
                    <Text style={{fontWeight: 'bold', color: '#bccad0'}}>{this.state.randomFav}.00</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Svg width="29" height="20" viewBox="0 0 24 24">
                      <Polyline fill="none" stroke="#E67D8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points="18.814,6.815 9.445,16.185 5.186,11.926"/>
                    </Svg>
                    <Text style={{color: '#bccad0'}}>Verified</Text>
                  </View>
                </View>
              </View>

              <View style={{alignItems: 'flex-start'}}>
                <Text style={{fontSize: 23, color: '#bccad0', textAlign: 'left'}}>{User.name}</Text>
                <Text style={{color: '#cedde3'}}>{User.profession}</Text>
                <Text style={{color: '#3cecc8', fontWeight: 'bold', marginTop: 5}}>Online</Text>
              </View>

              <View style={{flexDirection: 'row', maxWidth: 310, height: 2, backgroundColor: '#bccad0', opacity: 0.1, marginTop: 20, marginBottom: 20}} />

              {
                this.props.User && this.props.User.health ? (
                  <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                      <Text style={{fontSize: 18, color: '#bccad0'}}>Statistics:</Text>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{alignItems: 'center', marginLeft: 20}}>
                          <Text style={{fontSize: 30, color: '#bccad0'}}>{User.health.bpm}</Text>
                          <Svg width={"20"} height={"20"} x="0px" y="0px" viewBox="0 0 426.668 426.668">
                            <Path fill="#E67D8F" d="
                    M401.788,74.476c-63.492-82.432-188.446-33.792-188.446,49.92
                    c0-83.712-124.962-132.356-188.463-49.92c-65.63,85.222-0.943,234.509,188.459,320.265
                    C402.731,308.985,467.418,159.698,401.788,74.476z"/>
                          </Svg>
                        </View>
                        <View style={{alignItems: 'center', marginLeft: 20}}>
                          <Text style={{fontSize: 30, color: '#bccad0'}}>{User.health.calories}</Text>
                          <Svg width="20" height="20" viewBox="0 0 388.055 388.055">
                            <G>
                              <Path fill="#E67D8F" d="M288.428,136.455c-26-32.4-53.2-66.4-52.4-128.4c0-3.2-1.6-5.6-4.4-7.2
                    c-2.8-1.2-6-1.2-8.4,0.4c-43.6,31.2-82.4,99.6-71.2,182.8c-15.2-8.8-24.4-23.6-34.8-39.2
                    c-3.2-5.2-6.4-10.4-10-15.2c-1.6-2-4-3.6-6.8-3.2c-2.8,0-5.2,1.6-6.4,3.6c-20.8,32.4-42,71.6-42,
                    114c0,83.6,58.8,144,140,144c82,0,144-62,144-144C336.028,195.655,312.028,165.655,288.428,136.455z "/>
                            </G>
                          </Svg>
                        </View>
                      </View>
                    </View>

                    <View style={{alignItems: 'flex-start'}}>
                      <Text style={{fontSize: 17, color: '#bccad0'}}>Electrocardiography</Text>
                    </View>
                  </View>
                ): null
              }
            </View>
          </View>

          {
            this.state.type === "Doctor" ? (
              <View style={{alignItems: 'center', padding: 0, marginBottom: 30}}>
                <Chart type={"day"} height={160} width={(Dimensions.get('window').width)} config={this.config()} component={"Statistics"}/>
              </View>
            ): null
          }

          <View style={styles.commentsContainer}>
            <Text style={{fontSize: 17, color: '#bccad0', textAlign: 'center'}}>Comments({total})</Text>

            <View style={{position: 'relative'}}>
              <TextInput
                style={styles.searchInput}
                ref={input => { this.textInput = input }}
                placeholder="Comment"
                underlineColorAndroid="transparent"
                placeholderTextColor={"#bccad0"}
                onChangeText={(text) => this.setState({message: text})}
              />

              <View style={{
                position: 'absolute', right: 20, top: 30, padding: 4, borderRadius: 300,
                backgroundColor: '#E67D8F', elevation: 3,
              }}>
                <TouchableOpacity onPress={() => {
                  this.sendMessage(User.uid)
                  this.textInput.clear()
                }}>
                  <Ionicons name={"chevron-right"} size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.comments}>
              {
                total > 0 ? Messages : <Text style={{fontSize: 12, color: '#bccad0', textAlign: 'center'}}>No Comments so far!</Text>
              }
            </View>
          </View>
        </ScrollView>


      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    //width: Dimensions.get('window').width,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 10,
    padding: 30,
    position: 'relative'
  },
  profileTopContainer: {
    flexDirection: 'row',
    marginBottom: 20
    // alignItems: 'flex-start'
  },
  userImg: {
    borderRadius: 5,
    height: 170,
    width: 170,
    marginRight: 30
  },
  commentsContainer: {
    backgroundColor: 'white',
    padding: 30,
    paddingTop: 0,
    flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  comments: {
    //flexDirection: 'column'
  },
  comment: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  profPic: {
    borderRadius: 300,
    height: 50,
    width: 50,
    marginRight: 10,
  },
  msgText: {
    flex: 1,
    flexDirection: 'column'
  },
  $top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  name: {
    fontWeight: 'bold',
    color: "#6d777d"
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInput: {
    fontSize: 13,
    color: "#aab8be",
    textAlignVertical: "top",
    height: 70,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 70,
    backgroundColor: 'rgba(188,202,208, 0.1)',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5
  },
});
