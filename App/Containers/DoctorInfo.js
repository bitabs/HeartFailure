import React, {Component} from 'react';
import {Text, Image, View, ScrollView, TextInput, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from "react-native-vector-icons/Feather";
import User from '../Components/User';
import firebase from 'react-native-firebase';
import Database from '../Components/Database';
import {Images} from '../Containers/PreLoadImages';
import Svg, { Path, Polygon, Polyline, G } from 'react-native-svg';
import TimeAgo from "react-native-timeago";


export default class DoctorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user        : null,
      message     : null,
      globalObj   : null,
      messageObj  : null,
      randomFav   : null,
      doctorUid   : ""
    };
  }

  componentDidMount() {
    if (this.props.Doctor) {
      User().then(user => {
        this.setState({
          doctorUid: user.uid,
          randomFav: this.getRandomInt(0,4)
        });
        firebase.app().database().ref(`/Users/${user.uid}`).on('value', (snap) => {
          if (snap.val()) {
            const $user = snap.val();
            Database.initialiseMessagesDB($user.name, "", this.props.Doctor.uid, $user.type).then(() => {});
          }
        });
      });
      this.getMessage("d");
    }
  }

  sendMessage = (uid) => {
    User().then(user => {
      firebase.app().database().ref(`/Users/${user.uid}`).on('value', (snap) => {
        if (snap.val()) {
          const $user = snap.val();
          Database.setMessage(uid, $user.type, this.state.message);
        }
      });
    });
  };

  getMessage = (uid) => {
    let globalObj = null;
    console.log("rendering now!");

    firebase.app().database().ref(`/PatientsCommentsToDoctors`).on('value', (snap) => {
      this.setState(prevState => ({
        globalObj: {...prevState.globalObj, ...snap.val()}
      }), () => this.filterMsg(this.props.Doctor));
    });

    firebase.app().database().ref(`/DoctorsCommentsToPatients`).on('value', (snap) => {
      this.setState(prevState => ({
        globalObj: {...prevState.globalObj, ...snap.val()}
      }), () => this.filterMsg(this.props.Doctor));
    });
  };

  filterMsg = (Doctor) => {
    User().then(user => {
      const uid = user.uid;
      let filtered = Object.keys(this.state.globalObj).reduce((acc, val) => {
        const doctorToPatient = `${Doctor.uid}<=>${uid}`;
        const patientToDoctor = `${uid}<=>${Doctor.uid}`;

        if(val === patientToDoctor || val === doctorToPatient)  {
          acc[val] = this.state.globalObj[val];
        }
        //console.log(toReturn);
        return acc;
      }, {});
      if (filtered !== {}) {
        this.setState({messageObj: filtered})
      }
    });
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
    const { Doctor } = this.props;
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
      }}
    ) : null;

    let $Doctor = this.props.Doctor ? (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Ionicons style={{position: 'absolute', top: 20, left: 20}} name={"arrow-left"} size={30} color="#cedde3" />
          <View>
            <View style={styles.profileTopContainer}>
              <Image style={styles.userImg} source={Images[Doctor.uid]} resizeMode="contain"/>
              <View style={{alignItems: 'flex-end', flexDirection:'column', justifyContent: 'space-between'}}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#bccad0'}}>Get to know me:</Text>
                <Text style={{color: '#bccad0', flexWrap: 'wrap', maxWidth: 100, textAlign: 'right'}} numberOfLines={2}>{Doctor.address}</Text>
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
              <Text style={{fontSize: 23, color: '#bccad0', textAlign: 'left'}}>{Doctor.name}</Text>
              <Text style={{color: '#cedde3'}}>{Doctor.profession}</Text>
              <Text style={{color: '#3cecc8', fontWeight: 'bold', marginTop: 5}}>Online</Text>
            </View>

            <View style={{flexDirection: 'row', maxWidth: 310, height: 2, backgroundColor: '#bccad0', opacity: 0.1, marginTop: 20, marginBottom: 20}} />
          </View>
        </View>

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
                this.sendMessage(Doctor.uid);
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
    ):null;


    return(
      <View>
        {$Doctor}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    alignItems: 'flex-end',
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

DoctorInfo.propTypes = {

};
