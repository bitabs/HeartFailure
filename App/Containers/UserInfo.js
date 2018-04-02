import React, {Component} from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TouchableHighlight, Dimensions, Image, ScrollView, TextInput
} from 'react-native';
import Feather from "react-native-vector-icons/Feather";

import User from '../Components/User';
import firebase from 'react-native-firebase';
import Database from '../Components/Database';
import _ from 'lodash';
import {Images} from '../Containers/PreLoadImages';

import Chart from "./Chart";
import Svg, { Path, Polygon, Polyline, G } from 'react-native-svg';
import TimeAgo from "react-native-timeago";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user            : null,
      authUserUID     : null,
      authUserType    : null,
      message         : null,
      allMessages     : null,
      filteredMessages: null,
      randomFav       : null,
      type            : "",
      testing         : false,
      ECG             : null,
      heartSound      : null,
      HealthFromDB    : null,
      ECGFromDB       : null
    };

    this.userRef   = firebase.app().database().ref(`/Users/`);
    this.ecgRef     = firebase.app().database().ref(`/ECG/`);
    this.healthRef  = firebase.app().database().ref(`/Health/`);
    this.PCRef      = firebase.app().database().ref(`/PatientsCommentsToDoctors/`);
    this.DCRef      = firebase.app().database().ref(`/DoctorsCommentsToPatients/`);

    this.fetchComments = this.fetchComments.bind(this);
    this.initialiseDB = this.initialiseDB.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.fetchDummyData();
      User().then(authUser => {
        this.userRef.on('value', snap => {
          if (snap.val() && this._isMounted) this.setState({
            authUserUID: authUser.uid,
            authUserType: snap.val()[authUser.uid].type
          }, () => {
            this.initialiseDB(snap.val(), this.ecgRef, this.healthRef, this.PCRef, this.DCRef);
          })
        });
      });
    }
  }

  fetchDummyData = () => {
    fetch('https://raw.githubusercontent.com/NaseebullahSafi/HeartFailure/master/ECG.txt?token=APbiPfg9DRYV1oisDd6yXU30FdIFSmmtks5avQatwA%3D%3D')
      .then(response => response.text().then(text => {
        if (this._isMounted) this.setState({ECG: text.split('\n').map(Number)}, () => console.log(this.state.ECG))
      }));

    fetch('https://raw.githubusercontent.com/NaseebullahSafi/HeartFailure/master/Stethoscope.txt?token=APbiPc8PDxQZp3_Ris9gpqyeJjGxkegBks5avSIWwA%3D%3D')
      .then(response => response.text().then(text => {
        if (this._isMounted) this.setState({heartSound: text.split('\n').map(Number)})
      }))
  };

  initialiseDB = (userSnapData = null, ecgRef, healthRef, PCRef, DCRef) => {
    if (!this._isMounted) return;
    const {User} = this.props, {authUserUID, authUserType} = this.state;

    if (userSnapData && this._isMounted && User) {
      const user = userSnapData[authUserUID];
      Database.initialiseMessagesDB(user.name, authUserUID, User.uid, authUserType, authUserType === "Patient" ? PCRef : DCRef, healthRef).catch(e => console.log(e));


      healthRef.on('value', snap => {
        if (snap.val()) {
          this.setState({
            HealthFromDB: snap.val()[User.uid]
          })
        }
      });

      ecgRef.on('value', snap => {
        if (snap.val()) {
          this.setState({
            ECGFromDB: snap.val()[User.uid]
          })
        }
      });

      PCRef.on('value', snap => {
        this.fetchComments([PCRef, DCRef]).then(refValues => {
          const [PatientsComments, DoctorsComments] = refValues;
          this.filterMsg({...PatientsComments, ...DoctorsComments});
        })
      });

      DCRef.on('value', snap => {
        this.fetchComments([PCRef, DCRef]).then(refValues => {
          const [PatientsComments, DoctorsComments] = refValues;
          this.filterMsg({...PatientsComments, ...DoctorsComments});
        })
      });
    }
  };

  config = () => {
    const $this = this;
    return {
      chart: {
        backgroundColor: 'rgba(188,202,208, 0.045)',
        renderTo: 'container'
      },
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      xAxis: {
        visible: false,
        min: 5000
      },
      yAxis: {
        visible: false
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
            click: function () {
              if (this._isMounted) this.setState(this.state === 'select' ? '' : 'select');
            }
          }
        }
      },
      tooltip: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      scrollbar: {
        enabled: true,
        barBackgroundColor: 'rgba(188,202,208, 0.22)',
        barBorderRadius: 2,
        barBorderWidth: 0,
        buttonBackgroundColor: 'white',
        buttonBorderWidth: 0,
        buttonArrowColor: 'white',
        buttonBorderRadius: 0,
        rifleColor: 'rgba(188,202,208, 0.42)',
        trackBackgroundColor: 'rgba(188,202,208, 0.045)',
        trackBorderWidth: 1,
        trackBorderColor: 'white',
        trackBorderRadius: 7
      },
      series: [{
        data: $this.state.ECG
      }]
    }
  };

  soundConfig = () => {
    const $this = this;
    return {
      chart: {
        backgroundColor: 'rgba(188,202,208, 0.045)',
        renderTo: 'container'
      },
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      xAxis: {
        visible: false,
        min: 5000
      },
      yAxis: {
        visible: false
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
            click: function () {
              this.setState(this.state === 'select' ? '' : 'select');
            }
          }
        }
      },
      tooltip: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      scrollbar: {
        enabled: true,
        barBackgroundColor: 'rgba(188,202,208, 0.22)',
        barBorderRadius: 2,
        barBorderWidth: 0,
        buttonBackgroundColor: 'white',
        buttonBorderWidth: 0,
        buttonArrowColor: 'white',
        buttonBorderRadius: 0,
        rifleColor: 'rgba(188,202,208, 0.42)',
        trackBackgroundColor: 'rgba(188,202,208, 0.045)',
        trackBorderWidth: 1,
        trackBorderColor: 'white',
        trackBorderRadius: 7
      },
      series: [{
        data: $this.state.heartSound
      }]
    }
  };

  sendMessage = (toUid) => {
    if (!this._isMounted) return;
    const { message, authUserUID, authUserType } = this.state;
    if (this._isMounted) Database.setMessage(authUserUID, toUid, authUserType === "Patient" ? this.PCRef : this.DCRef, message);
  };

  fetchComments = async refs => {
    return new Promise.all(refs.map(async $ref => {
      return new Promise((resolve, reject) => {
        $ref.on('value', snap => {
          if (snap.val()) resolve(snap.val()); else reject();
        })
      });
    }))
  };


  filterMsg = AsyncMessages => {
    const {User} = this.props, {authUserUID} = this.state;
    let filtered = Object.keys(AsyncMessages).reduce((acc, val) => {
      const patientToDoctor = `${authUserUID}<=>${User.uid}`;
      const doctorToPatient = `${User.uid}<=>${authUserUID}`;
      if(val === patientToDoctor || val === doctorToPatient)
        acc[val] = AsyncMessages[val];
      return acc;
    }, {});
    if (filtered !== {} && this._isMounted) {
      this.setState({filteredMessages: filtered})
    }
  };

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
    const { User } = this.props, {filteredMessages} = this.state;
    let total = 0;
    let Messages = filteredMessages && this._isMounted ? Object.keys(filteredMessages).map((m, i) => {
      const person = filteredMessages[m];
      const obj = filteredMessages[m].messages;
      if (obj) {
        total += Object.values(obj).length;
        return Object.keys(obj).sort((a, b) => obj[a].timeStamp < obj[b].timeStamp).map((e, j) => {
          const message = obj[e];
          return (
            <View style={styles.comment} key={e}>

              {Images[person.uid] ? (
                <Image style={styles.profPic} source={Images[person.uid]} resizeMode="contain"/>
              ) : (
                <View style={[styles.profPic, {alignItems: 'center', justifyContent: 'center', backgroundColor: '#E67D8F'}]}>
                  <Feather name={"user"} size={20} color={"white"}/>
                </View>
              )}


              <View style={styles.msgText}>
                <View style={styles.$top}>
                  <Text style={styles.name}>{person.name}</Text>
                  <View style={styles.time}>
                    <Feather name={"clock"} size={15} color="#6d777d"/>
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
      <View style={{flex: 1, flexDirection: 'column', alignSelf: 'stretch', backgroundColor: 'white'}}>
        {this._isMounted ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View>

                <View style={{alignSelf: 'center'}}>
                  <View style={styles.profileTopContainer}>
                    {Images[User.uid] ? (
                      <Image style={styles.userImg} source={Images[User.uid]} resizeMode="contain"/>
                    ):(
                      <View style={[styles.userImg, {backgroundColor: '#E67D8F', alignItems: 'center', justifyContent: 'center'} ]}>
                        <Feather name={"user"} size={50} color={"white"}/>
                      </View>
                    )}

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
                </View>

                <View style={{flexDirection: 'row', maxWidth: 310, height: 2, backgroundColor: '#bccad0', opacity: 0.1, marginTop: 20, marginBottom: 20}} />

                {this.props.User && this.state.authUserType === "Doctor" && this.state.HealthFromDB ? (
                  <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                      <Text style={{fontSize: 18, color: '#bccad0'}}>Statistics:</Text>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{alignItems: 'center', marginLeft: 20}}>
                          <Text style={{fontSize: 30, color: '#bccad0'}}>{this.state.HealthFromDB.bpm}</Text>
                          <Svg width={"20"} height={"20"} x="0px" y="0px" viewBox="0 0 426.668 426.668">
                            <Path fill="#E67D8F" d="
                    M401.788,74.476c-63.492-82.432-188.446-33.792-188.446,49.92
                    c0-83.712-124.962-132.356-188.463-49.92c-65.63,85.222-0.943,234.509,188.459,320.265
                    C402.731,308.985,467.418,159.698,401.788,74.476z"/>
                          </Svg>
                        </View>
                        <View style={{alignItems: 'center', marginLeft: 20}}>
                          <Text style={{fontSize: 30, color: '#bccad0'}}>{this.state.HealthFromDB.calories}</Text>
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
                  </View>
                ): null}

                {this.state.authUserType === "Doctor" && this.props.User && this.state.ECGFromDB ? (
                  <View>
                    <View>
                      <View style={{alignItems: 'flex-start', marginBottom: 10}}>
                        <Text style={{fontSize: 17, color: '#bccad0'}}>Electrocardiography</Text>
                      </View>
                      <View style={{alignItems: 'center', padding: 0, marginBottom: 30}}>
                        <Chart type={"day"} stock={true} height={300} config={this.config()} component={"Statistics"}/>
                      </View>
                    </View>
                    <View>
                      <View style={{alignItems: 'flex-start', marginBottom: 10}}>
                        <Text style={{fontSize: 17, color: '#bccad0'}}>Stethoscope</Text>
                      </View>
                      <View style={{alignItems: 'center', padding: 0, marginBottom: 30}}>
                        <Chart type={"day"} stock={true} height={300} config={this.soundConfig()} component={"Statistics"}/>
                      </View>
                    </View>

                  </View>
                ): null}

                <View style={[styles.container, styles.commentsContainer]}>
                  <Text style={{fontSize: 17, color: '#bccad0', textAlign: 'center'}}>Comments({total})</Text>

                  <View style={{position: 'relative'}}>
                    <TextInput
                      style={styles.searchInput}
                      ref={input => { this.textInput = input }}
                      placeholder="Comment"
                      underlineColorAndroid="transparent"
                      placeholderTextColor={"#bccad0"}
                      onChangeText={(text) => (this._isMounted) ? this.setState({message: text}): null}
                    />

                    <View style={{
                      position: 'absolute', right: 20, top: 30, padding: 4, borderRadius: 300,
                      backgroundColor: '#E67D8F', elevation: 3,
                    }}>
                      <TouchableOpacity onPress={() => {
                        this.sendMessage(User.uid)
                        this.textInput.clear()
                      }}>
                        <Feather name={"chevron-right"} size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.comments}>
                    {
                      total > 0 ? Messages : <Text style={{fontSize: 12, color: '#bccad0', textAlign: 'center'}}>No Comments so far!</Text>
                    }
                  </View>
                </View>

              </View>
            </View>
          </ScrollView>
        ): null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    padding: 30,
    position: 'relative'
  },
  profileTopContainer: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    marginBottom: 20
  },
  userImg: {
    borderRadius: 5,
    height: 170,
    width: 170,
    marginRight: 30
  },
  commentsContainer: {
    backgroundColor: 'white',
    alignItems: 'stretch',
    padding: 0,
    paddingTop: 0,
    flexDirection: 'column',
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
