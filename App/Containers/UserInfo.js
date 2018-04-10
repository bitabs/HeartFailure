import React, {Component} from 'react'

// predefined components from react native
import {View, Text, TouchableOpacity, Image, ScrollView, TextInput} from 'react-native'

// importing feather icon package
import Feather from "react-native-vector-icons/Feather"

// importing User which will return the authenticated user
import User from '../Components/User'

// importing firebase to access firebase database
// import firebase from 'react-native-firebase'
import firebase from '../../firebase'
// static class containing common DB operations
import Database from '../Components/Database'

// Images object containing static url to Users image
import {Images} from '../Containers/PreLoadImages'

// chart to visualise ECG & heart sound
import Chart from "./Chart"

// SVG package for React Native to work
import Svg, { Path, Polygon, Polyline, G } from 'react-native-svg'

// TimeAgo to provide time passed from certain point mechanism
import TimeAgo from "react-native-timeago"

// styles of this component
import styles from './Styles/UserInfoStyles'

/**
 * This component will provide more information about the user
 * that was tapped from UserBox component
 * ==============================================================
 */
export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user            : null,  authUserUID     : null,
      authUserType    : null,  message         : null,
      allMessages     : null,  filteredMessages: null,
      randomFav       : null,  type            : "",
      testing         : false, ECG             : null,
      heartSound      : null,  HealthFromDB    : null,
      ECGFromDB       : null,  total           : 0
    };

    // references to the firebase database

    // returns list of users that is registered with the application
    this.userRef   = firebase.database().ref(`/Users/`);

    // returns ECG for each patient
    this.ecgRef     = firebase.database().ref(`/ECG/`);

    // returns health of each patient
    this.healthRef  = firebase.database().ref(`/Health/`);

    // returns comments from patients to doctors
    this.PCRef      = firebase.database().ref(`/PatientsCommentsToDoctors/`);

    // returns doctors comments to patients
    this.DCRef      = firebase.database().ref(`/DoctorsCommentsToPatients/`);

    // binding method that needs to be in the same context as "this"
    this.fetchComments = this.fetchComments.bind(this);
    this.initialiseDB  = this.initialiseDB.bind(this);
    this.messages      = this.messages.bind(this);
  }

  /**
   * This method is automatically called when the component is
   * about to unmount
   * ==============================================================
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Called when the component mounts
   * ==============================================================
   */
  componentDidMount() {
    // terminate if the component is not mounted
    this._isMounted = true;
    if (this._isMounted) {

      // fetch the ECG datapoints from the URL
      this.fetchDummyData();

      User().then(authUser => {

        // when list of users are available from the database...
        this.userRef.on('value', snap => {
          // if there exists data, then set the type of the user in the state obj
          if (snap.val() && this._isMounted) this.setState({
            // the uid of the user
            authUserUID: authUser.uid,
            // the type of the user
            authUserType: snap.val()[authUser.uid].type,

            randomFav: this.getRandomInt(0, 4)
          }, () => {
            // once the state has been updated, initialise the DB
            this.initialiseDB(
              snap.val(), this.ecgRef,
              this.healthRef, this.PCRef, this.DCRef
            );
          })
        });
      });
    }
  }

  /**
   * This method will fetch the data from the given url and update
   * the state object
   * ==============================================================
   */
  fetchDummyData = () => {

    // local references to the tokens of ECG and sound
    const
      baseURL = "https://raw.githubusercontent.com/NaseebullahSafi/HeartFailure/master/",
      ECG     = "ECG.txt?token=APbiPfg9DRYV1oisDd6yXU30FdIFSmmtks5avQatwA%3D%3D",
      sound   = "Stethoscope.txt?token=APbiPc8PDxQZp3_Ris9gpqyeJjGxkegBks5avSIWwA%3D%3D";

    // To acquire data from a url, fetch() is used
    fetch(`${baseURL}${ECG}`).then(response => response.text().then(text => {
      // if the component is mounted, then convert the data into numbers and push it to ECG
      if (this._isMounted) this.setState({
        ECG: text.split('\n').map(Number)
      })
    }));

    fetch(`${baseURL}${sound}`).then(response => response.text().then(text => {
      // set the sound data in the state object
      if (this._isMounted) this.setState({
        heartSound: text.split('\n').map(Number)
      })
    }))
  };

  /**
   * If new user, setup the messaging interface. Otherwise, filter
   * the previous messages based on the time.
   * ==============================================================
   */
  initialiseDB = (userSnapData = null, ecgRef, healthRef, PCRef, DCRef) => {

    // terminate if the component is unmounted
    if (!this._isMounted) return;

    // local reference to the user from the props, and the uid and type from state
    const {User} = this.props, {authUserUID, authUserType} = this.state;

    // ensure that we have the list of users, the component is mounted and USer exists
    if (userSnapData && this._isMounted && User) {

      // get the entire log of the user from list of users
      const user = userSnapData[authUserUID];

      // set the message ground
      Database.initialiseMessagesDB(
        user.name, authUserUID, User.uid, authUserType,
        authUserType === "Patient" ? PCRef : DCRef, healthRef
      ).catch(e => e);

      // fetch the health record of the user passed from the props to state obj
      healthRef.on('value', snap => {
        if (snap.val() && this._isMounted) {
          this.setState({
            HealthFromDB: snap.val()[User.uid]
          })
        }
      });

      // fetch the ecg record of the user to state obj
      ecgRef.on('value', snap => {
        if (snap.val() && this._isMounted) {
          this.setState({
            ECGFromDB: snap.val()[User.uid]
          })
        }
      });

      // fetch the entire comments from patients and filter it
      PCRef.on('value', snap => {
        // Promise method called to merge both entries as one obj
        this.fetchComments([PCRef, DCRef]).then(refValues => {
          const [PatientsComments, DoctorsComments] = refValues;
          // filter them so that only messages exist between the followed doctor
          this.filterMsg({...PatientsComments, ...DoctorsComments});
        })
      });

      // fetch the entire comments from doctors and filter it
      DCRef.on('value', snap => {
        this.fetchComments([PCRef, DCRef]).then(refValues => {
          const [PatientsComments, DoctorsComments] = refValues;
          this.filterMsg({...PatientsComments, ...DoctorsComments});
        })
      });
    }
  };

  /**
   * This method will visualise the ECG points as line graph
   * ==============================================================
   */
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

  /**
   * This method will visualise the heart sound points as line
   * graph.
   * ==============================================================
   */
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
      // stylise the scrollbar
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

  /**
   * This method will send the message to the corresponding user
   * ==============================================================
   */
  sendMessage = (toUid) => {
    // first insure the component is mounted
    if (!this._isMounted) return;
    // get the message content, uid and the type of the user
    const { message, authUserUID, authUserType } = this.state;
    // call the setMessage method in Database class
    if (this._isMounted) Database.setMessage(
      authUserUID, toUid, authUserType === "Patient"
        ? this.PCRef
        : this.DCRef,
      message
    );
  };

  /**
   * This method fetch the comments made between the two users.
   * ==============================================================
   * @param refs
   * @return {Promise.<Promise.all>}
   */
  fetchComments = async refs => {
    // it will return promise
    return new Promise.all(refs.map(async $ref => {
      return new Promise((resolve, reject) => {
        // get the actual data from refs and return it
        $ref.on('value', snap => {
          if (snap.val()) resolve(snap.val()); else reject();
        })
      });
    }))
  };


  /**
   * This method will filter the message passed from
   * fetchComments(). It will reduce the entire object until there
   * are only messages between the current user and all the users
   * that this user messaged
   * ==============================================================
   * @param AsyncMessages
   */
  filterMsg = AsyncMessages => {
    // local reference to the user passed from props, and the uid
    const {User} = this.props, {authUserUID} = this.state;

    // filter the actual content
    let filtered = Object.keys(AsyncMessages).reduce((acc, val) => {
      const patientToDoctor = `${authUserUID}<=>${User.uid}`;
      const doctorToPatient = `${User.uid}<=>${authUserUID}`;

      // show only messages between patientToDoctor & doctorToPatient
      if(val === patientToDoctor || val === doctorToPatient)
        acc[val] = AsyncMessages[val];
      return acc;
    }, {});

    // once filtered, store it in state object for later use
    if (filtered !== {} && this._isMounted) {
      this.setState({filteredMessages: filtered})
    }
  };

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  /**
   * This method will generate stars to depict the rating system.
   * ==============================================================
   */
  favorite = () => [1,2,3,4,5].map((e,i) => {
    return (
      <Svg height="15" width="15" key={i}>
        <Polygon
          fill={i < this.state.randomFav ? "#E67D8F" : '#f1f1f1'}
          stroke={i < this.state.randomFav ? "#E67D8F" : '#f1f1f1'}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          points="9,4.958 10.313,7.618 13.25,8.048 11.125,10.119
          11.627,13.042 9,11.66 6.374,13.042 6.875,10.119 4.75,8.048
          7.688,7.618"
        />
      </Svg>
    )
  });

  /**
   * This method will show the message content the image of the
   * user.
   * ==============================================================
   * @param filteredMessages
   * @return {{data: *, total: number}}
   */
  messages = filteredMessages => {

    // this is used later to check if there are any messages
    let total = 0;
    return {
      data: filteredMessages && this._isMounted
        ? Object.keys(filteredMessages).map((m, i) => {
        // get the message obj and its content
        const
          person = filteredMessages[m],
          obj    = filteredMessages[m].messages;

        // if there is a message
        if (obj) {
          // increment the total variable
          total = total += Object.values(obj).length;

          // filter the message and sort it by the timestamp
          return Object.keys(obj)
            .sort((a, b) => obj[a].timeStamp < obj[b].timeStamp)
            .map((e, j) => {

            // once filtered, get the message, and use this to create the view
            const message = obj[e];

            return (
              <View style={styles.comment} key={e}>
                {Images[person.uid]
                  ? (<Image
                      style={styles.profPic}
                      source={Images[person.uid]}
                      resizeMode="contain"
                  />)
                  : (<View
                      style={[styles.profPic, styles.profPicIcon]}
                    ><Feather name={"user"} size={20} color={"white"}/>
                    </View>
                  )
                }

                <View style={styles.msgText}>
                  <View style={styles.$top}>
                    <Text style={styles.name}>{person.name}</Text>
                    <View style={styles.time}>
                      <Feather name={"clock"} size={15} color="#6d777d"/>
                      <TimeAgo style={styles.timeStampTxt} time={message.timeStamp}/>
                    </View>
                  </View>
                  <Text numberOfLines={3} style={styles.msgTxtColor}>{message.msgText}</Text>
                </View>
              </View>
            )
          })
        }
      }): null,
      total: total
    }
  };

  /**
   * This method will create the top container, which will consist
   * of the user's photo, its general details, and whether they are
   * currently logged in or not
   * ==============================================================
   * @param User
   * @return {XML}
   */
  topContainer = User => {
    return (
      <View style={styles.topContainerView}>
        <View style={styles.profileTopContainer}>
          {User && Images[User.uid]
            ? (<Image
                style={styles.userImg}
                source={Images[User.uid]}
                resizeMode="contain"
              />)
            :(<View
                style={[styles.userImg, styles.userImgOverride]}>
              <Feather name={"user"} size={50} color={"white"}/>
            </View>
          )}

          <View style={styles.topContainerInnerView}>
            <Text style={styles.getToKnowMe}>Get to know me:</Text>
            <Text style={styles.address} numberOfLines={2}>{User.address}</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingView}>{this.favorite()}</View>
              <Text style={styles.ratingTxt}>{this.state.randomFav}.00</Text>
            </View>
            <View style={styles.verifiedIcon}>
              <Svg width="29" height="20" viewBox="0 0 24 24">
                <Polyline
                  fill="none" stroke="#E67D8F"
                  strokeWidth="3" strokeLinecap="round"
                  strokeLinejoin="round"
                  points="18.814,6.815 9.445,16.185 5.186,11.926"
                />
              </Svg>
              <Text style={styles.msgTxtColor}>Verified</Text>
            </View>
          </View>
        </View>

        <View style={styles.nameAndProfession}>
          <Text style={styles.$name}>{User.name}</Text>
          <Text style={styles.$profession}>{User.profession}</Text>
          <Text style={styles.online}>Online</Text>
        </View>
      </View>
    )
  };

  /**
   * This method will create the container that will hold bpm and
   * calories sub containers.
   * ==============================================================
   * @return {XML}
   */
  bpmAndCalories = () => {
    return (
      <View>
        <View style={styles.bpmAndCaloriesContainer}>
          <Text style={styles.statistics}>Statistics:</Text>
          <View style={styles.verifiedIcon}>
            <View style={styles.bpmContainer}>
              <Text style={styles.bpmTxt}>{this.state.HealthFromDB.bpm}</Text>
              <Svg
                width={"20"} height={"20"}
                x="0px" y="0px" viewBox="0 0 426.668 426.668">
                <Path
                  fill="#E67D8F"
                  d="M401.788,74.476c-63.492-82.432-188.446-33.792-188.446,
                  49.92c0-83.712-124.962-132.356-188.463-49.92c-65.63,
                  85.222-0.943,234.509,188.459,320.265C402.731,308.985,
                  467.418,159.698,401.788,74.476z"
                />
              </Svg>
            </View>
            <View style={styles.caloriesContainer}>
              <Text style={styles.bpmTxt}>{this.state.HealthFromDB.calories}</Text>
              <Svg width="20" height="20" viewBox="0 0 388.055 388.055">
                <G>
                  <Path
                    fill="#E67D8F"
                    d="M288.428,136.455c-26-32.4-53.2-66.4-52.4-128.4
                    c0-3.2-1.6-5.6-4.4-7.2c-2.8-1.2-6-1.2-8.4,0.4c-43.6,
                    31.2-82.4,99.6-71.2,182.8c-15.2-8.8-24.4-23.6-34.8-39.2
                    c-3.2-5.2-6.4-10.4-10-15.2c-1.6-2-4-3.6-6.8-3.2c-2.8,0-5.2,
                    1.6-6.4,3.6c-20.8,32.4-42,71.6-42,114c0,83.6,58.8,144,140,
                    144c82,0,144-62,144-144C336.028,195.655,312.028,165.655,
                    288.428,136.455z "
                  />
                </G>
              </Svg>
            </View>
          </View>
        </View>
      </View>
    )
  };

  /**
   * This method will create ecg and sound container. Both uses
   * <char /> component which will render the data points into line
   * graph.
   * ==============================================================
   * @return {XML}
   */
  ecgAndSound = () => {
    return (
      <View>
        <View>
          <View style={styles.ecgAndSoundContainer}>
            <Text style={styles.ecgAndSoundContainerTxt}>Electrocardiography</Text>
          </View>
          <View style={styles.chartView}>
            <Chart
              type={"day"}
              stock={true}
              height={300}
              config={this.config()}/>
          </View>
        </View>
        <View>
          <View style={styles.ecgAndSoundContainer}>
            <Text style={styles.ecgAndSoundContainerTxt}>Stethoscope</Text>
          </View>
          <View style={styles.chartView}>
            <Chart
              type={"day"}
              stock={true}
              height={300}
              config={this.soundConfig()}/>
          </View>
        </View>
      </View>
    )
  };

  /**
   * This method will create a the comments container, which will
   * hold all the messages that have occured between the two users.
   * ==============================================================
   * @param total
   * @param Messages
   * @return {XML}
   */
  commentsContainer = (User, total, Messages) => {
    return (
      <View style={[styles.container, styles.commentsContainer]}>
        <Text style={styles.commentsTitle}>Comments({total})</Text>

        <View style={styles.positionRelative}>
          <TextInput
            style={styles.searchInput}
            ref={input => { this.textInput = input }}
            placeholder="Comment"
            underlineColorAndroid="transparent"
            placeholderTextColor={"#bccad0"}
            onChangeText={(text) => (this._isMounted)
              ? this.setState({message: text})
              : null
            }
          />
          <View style={styles.sendBtn}>
            <TouchableOpacity onPress={() => {
              this.sendMessage(User.uid);
              this.textInput.clear()
            }}>
              <Feather
                name={"chevron-right"}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.comments}>
          {
            total > 0
            ? Messages
            : (
              <Text style={styles.noComments}>No Comments so far!</Text>
            )
          }
        </View>
      </View>
    )
  };

  /**
   * this method will be called after the component has mounted
   * ==============================================================
   * @return {XML}
   */
  render() {
    // local reference to the User object from props, and filtered msgs
    const
      { User } = this.props,
      {filteredMessages} = this.state,
      filteredComments = this.messages(filteredMessages);

    let
      Messages      = filteredComments.data,
      total         = filteredComments.total,
      isUser        = this.props.User,
      isDoctor      = this.state.authUserType === "Doctor";

    return (
      <View style={styles.mainContainer}>
        {this._isMounted ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View>
                {this.topContainer(User)}

                <View style={styles.HR} />

                {
                  isUser && isDoctor && this.state.HealthFromDB
                    ? this.bpmAndCalories()
                    : null
                }

                {
                  isUser && isDoctor && this.state.ECGFromDB
                    ? this.ecgAndSound()
                    : null
                }

                {this.commentsContainer(User, total, Messages)}

              </View>
            </View>
          </ScrollView>
        ): null}
      </View>
    )
  }
}
