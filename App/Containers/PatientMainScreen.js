import React, {PureComponent} from 'react'

// predefined components from React
import {
  Text, View, TouchableOpacity, Dimensions, ScrollView,
  Image, Keyboard, TouchableWithoutFeedback, TextInput
} from 'react-native'

// ECG component that mimics real-time ECG render
import ECG from "./ECG"

// Chart to visualise ECG and heart sound in line graph7
import Chart from "./Chart"

// Database Query relation operations
import Database from '../Components/Database'

// Images object with static URL to users images
import {Images} from '../Containers/PreLoadImages'

// Feather icon package
import Feather from "react-native-vector-icons/Feather"

// fireabse module to use firebase database
import firebase from '../../firebase'
// import firebase from 'react-native-firebase'

// used for editing profile
import {Field, reduxForm} from "redux-form"

// to acquire the current authenticated user's details
import User from '../Components/User'

// Component to intiate recording
import Counter from "./Counter"

// importing styles for this component
import styles from './Styles/PatientMainScreenStyles'

/**
 * This component provides a full set of functionality for
 * profile section.
 * ==============================================================
 */
export class PatientMainScreen extends PureComponent {
  constructor(props) {
    super(props);

    /**
     * There are certain data that this component needs to get
     * hold of. They are mostly continuously updated, and therefore
     * the component needs to refresh to get hold of up-to-date.
     * @typedef {(State)} State
     */
    this.state = {
      User        : null , ECG       : null , Health  : null,
      width       : null , height    : null , bpm     : 0,
      viewMoreBtn : true , editView  : false, counter : 0,
      addHealth   : false, aboutFormFields: [{
        inputTitle: "@Name", fieldName: "name",
        placeholder: "eg. Naseebullah Ahmadi", overrideStyle: null
      },{
        inputTitle: "@Bio", fieldName: "bio",
        placeholder: "eg. About yourself", overrideStyle: "overrideInput"
      },{
        inputTitle: "@Address", fieldName: "address",
        placeholder: "eg. 122 AtherStone", overrideStyle: null
      },{
        inputTitle: "@Profession", fieldName: "profession",
        placeholder: "eg. Full Stack Developer", overrideStyle: null
      },{
        inputTitle: "@Contact Number", fieldName: "contactNumber",
        placeholder: "eg. 05726293724", overrideStyle: null
      },{
        inputTitle: "@Date of birth", fieldName: "DOB",
        placeholder: "eg. 02/06/1997", overrideStyle: null
      },{
        inputTitle: "@Age", fieldName: "age",
        placeholder: "eg. 27", overrideStyle: null
      }, {
        inputTitle: "@Gender", fieldName: "gender",
        placeholder: "eg. Male or Female", overrideStyle: null
      }]
    };

    // binding this method to ensure same context of the component
    this.fetchData = this.fetchData.bind(this);

    this.connectionUser = this.connectionUser.bind(this);
  }

  /**
   * When the component is about to unmounts, falsify the variable
   * ==============================================================
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * When the component mounts, fetch the necessary data from
   * firebase.
   * ==============================================================
   */
  componentDidMount() {
    // first let the component that it has mounted
    this._isMounted = true;

    // used to retrieve the uid of the current user
    User().then(user => {

      // attach the user reference from firebase to the component
      this.userRef = firebase.database().ref(`/Users/${user.uid}`);

      // attach the ECG reference from firebase to the component
      this.ecgRef = firebase.database().ref(`/ECG/${user.uid}`);

      // attach the health reference from firebase to the component
      this.healthRef = firebase.database().ref(`/Health/${user.uid}`);

      // let us initiate the fetching by passing the required references
      this.fetchData(this.userRef, this.ecgRef, this.healthRef, user);
    });

    // local variable as dummy ECG data
    this.ECG = [
      0, 0, 0, 0, 0.0000050048828125, 0.0000137939453125, 0.000049560546875,
      0.00008740234375, 0.00015966796875, 0.000262451171875, 0.0003975830078125, 0.0005687255859375,
      0.0007802734375, 0.001037353515625, 0.0013468017578125, 0.00172119140625, 0.0021756591796875,
      0.0027232666015625, 0.0033880615234375, 0.004206787109375, 0.0052380371093750005,
      0.006586181640625, 0.008400146484375001, 0.010904296875, 0.0144892578125, 0.0196798095703125,
      0.049684204101562504, 0.0886883544921875, 0.11185363769531251, 0.134164306640625,
      0.137352294921875, 0.1160369873046875, 0.08516308593750001, 0.0539765625,
      0.014997436523437501, -0.015882568359375, -0.0387554931640625, -0.06125732421875,
      -0.0745780029296875, -0.07479357910156251, -0.0725338134765625, -0.0418538818359375,
      0.08582861328125001, 0.397717529296875, 0.8136408691406251, 1.2295617980957032,
      0.9944150390625001, 0.2824605712890625, -0.38949267578125, -0.597251220703125,
      -0.425675537109375, -0.1537947998046875, -0.0500914306640625, -0.0111041259765625,
      0.0027451171875, 0.0071739501953125, 0.008443359375, 0.0094327392578125, 0.012530517578125,
      0.0176046142578125, 0.0300162353515625, 0.0433489990234375, 0.056962646484375004,
      0.0704832763671875, 0.0770511474609375, 0.0898175048828125, 0.10311853027343751,
      0.117046142578125, 0.1312630615234375, 0.1529300537109375, 0.167607177734375,
      0.1899068603515625, 0.2124422607421875, 0.235044677734375, 0.2575535888671875,
      0.2724073486328125, 0.286978271484375, 0.3007579345703125, 0.3067425537109375,
      0.3106370849609375, 0.303756103515625, 0.2897236328125, 0.25916931152343753,
      0.2200599365234375, 0.1728209228515625, 0.133416259765625, 0.086224853515625,
      0.05493408203125, 0.02409423828125, 0.00922607421875, -0.0043409423828125,
      -0.0097349853515625, -0.013127685546875, -0.01423095703125, -0.013834716796875,
      -0.012556030273437501, -0.010675048828125, -0.00835888671875,
      -0.0057305908203125, -0.0000562744140625,
      0, 0, 0, 0, 0.0000050048828125, 0.0000137939453125, 0.000049560546875,
      0.00008740234375, 0.00015966796875, 0.000262451171875, 0.0003975830078125, 0.0005687255859375,
      0.0007802734375, 0.001037353515625, 0.0013468017578125, 0.00172119140625, 0.0021756591796875,
      0.0027232666015625, 0.0033880615234375, 0.004206787109375, 0.0052380371093750005,
      0.006586181640625, 0.008400146484375001, 0.010904296875, 0.0144892578125, 0.0196798095703125,
      0.049684204101562504, 0.0886883544921875, 0.11185363769531251, 0.134164306640625,
      0.137352294921875, 0.1160369873046875, 0.08516308593750001, 0.0539765625,
      0.014997436523437501, -0.015882568359375, -0.0387554931640625, -0.06125732421875,
      -0.0745780029296875, -0.07479357910156251, -0.0725338134765625, -0.0418538818359375,
      0.08582861328125001, 0.397717529296875, 0.8136408691406251, 1.2295617980957032,
      0.9944150390625001, 0.2824605712890625, -0.38949267578125, -0.597251220703125,
      -0.425675537109375, -0.1537947998046875, -0.0500914306640625, -0.0111041259765625,
      0.0027451171875, 0.0071739501953125, 0.008443359375, 0.0094327392578125, 0.012530517578125,
      0.0176046142578125, 0.0300162353515625, 0.0433489990234375, 0.056962646484375004,
      0.0704832763671875, 0.0770511474609375, 0.0898175048828125, 0.10311853027343751,
      0.117046142578125, 0.1312630615234375, 0.1529300537109375, 0.167607177734375,
      0.1899068603515625, 0.2124422607421875, 0.235044677734375, 0.2575535888671875,
      0.2724073486328125, 0.286978271484375, 0.3007579345703125, 0.3067425537109375,
      0.3106370849609375, 0.303756103515625, 0.2897236328125, 0.25916931152343753,
      0.2200599365234375, 0.1728209228515625, 0.133416259765625, 0.086224853515625,
      0.05493408203125, 0.02409423828125, 0.00922607421875, -0.0043409423828125,
      -0.0097349853515625, -0.013127685546875, -0.01423095703125, -0.013834716796875,
      -0.012556030273437501, -0.010675048828125, -0.00835888671875,
      -0.0057305908203125, -0.0000562744140625,
      0, 0, 0, 0, 0.0000050048828125, 0.0000137939453125, 0.000049560546875,
      0.00008740234375, 0.00015966796875, 0.000262451171875, 0.0003975830078125, 0.0005687255859375,
      0.0007802734375, 0.001037353515625, 0.0013468017578125, 0.00172119140625, 0.0021756591796875,
      0.0027232666015625, 0.0033880615234375, 0.004206787109375, 0.0052380371093750005,
      0.006586181640625, 0.008400146484375001, 0.010904296875, 0.0144892578125, 0.0196798095703125,
      0.049684204101562504, 0.0886883544921875, 0.11185363769531251, 0.134164306640625,
      0.137352294921875, 0.1160369873046875, 0.08516308593750001, 0.0539765625,
      0.014997436523437501, -0.015882568359375, -0.0387554931640625, -0.06125732421875,
      -0.0745780029296875, -0.07479357910156251, -0.0725338134765625, -0.0418538818359375,
      0.08582861328125001, 0.397717529296875, 0.8136408691406251, 1.2295617980957032,
      0.9944150390625001, 0.2824605712890625, -0.38949267578125, -0.597251220703125,
      -0.425675537109375, -0.1537947998046875, -0.0500914306640625, -0.0111041259765625,
      0.0027451171875, 0.0071739501953125, 0.008443359375, 0.0094327392578125, 0.012530517578125,
      0.0176046142578125, 0.0300162353515625, 0.0433489990234375, 0.056962646484375004,
      0.0704832763671875, 0.0770511474609375, 0.0898175048828125, 0.10311853027343751,
      0.117046142578125, 0.1312630615234375, 0.1529300537109375, 0.167607177734375,
      0.1899068603515625, 0.2124422607421875, 0.235044677734375, 0.2575535888671875,
      0.2724073486328125, 0.286978271484375, 0.3007579345703125, 0.3067425537109375,
      0.3106370849609375, 0.303756103515625, 0.2897236328125, 0.25916931152343753,
      0.2200599365234375, 0.1728209228515625, 0.133416259765625, 0.086224853515625,
      0.05493408203125, 0.02409423828125, 0.00922607421875, -0.0043409423828125,
      -0.0097349853515625, -0.013127685546875, -0.01423095703125, -0.013834716796875,
      -0.012556030273437501, -0.010675048828125, -0.00835888671875,
      -0.0057305908203125, -0.0000562744140625
    ];
  }

  /**
   * Fetch the data from firebase and save it in the global state
   * object for other sub-component to access.
   * ==============================================================
   * @param userRef
   * @param ecgRef
   * @param healthRef
   * @param authUser
   */
  fetchData = (userRef, ecgRef, healthRef, authUser) => {

    // this will fetch user table from firebase
    userRef.on('value', snap =>
      this._isMounted
        ? this.setState({ User: {...snap.val(), uid: authUser.uid} })
        : null
    );

    // this will fetch the ECG table from firebase
    ecgRef.on('value', snap =>
      this._isMounted
        ? this.setState({ ECG: snap.val() })
        : null
    );

    // this will fetch the health table from firebase
    healthRef.on('value', snap =>
      this._isMounted
        ? this.setState({ Health: snap.val() })
        : null
    );
  };

  /**
   * This method will add few spaces between each char on a given
   * string
   * ==============================================================
   * @param string
   * @param count
   */
  applyLetterSpacing = (string, count = 1) => string.split('').join('\u200A'.repeat(count));

  /**
   * This method will sign out the user from the application
   * ==============================================================
   */
  signOutUser = async () => await firebase.auth().signOut().catch(e => e);

  /**
   * This will toggle the boolean value of the attribute passed
   * ==============================================================
   */
  toggleBtns = (stateVariable, success) => this.setState({[stateVariable]: success});

  /**
   * This is the highcharts object that will visualise ECG
   * ==============================================================
   */
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
            click: function () {
              this.setState(this.state === 'select' ? '' : 'select');
            }
          }
        }
      },
      yAxis: {
        visible: false
      },
      tooltip: {enabled: false},
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
        data: (function () {
          let data = [];
          data = $this.state.ECG;
          return data;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  };

  /**
   * This will visualise the temperature graph
   * ==============================================================
   */
  temperature = (() => {
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
          color: '#fe824c',
          lineWidth: 1.5,
          marker: {
            enabled: false
          },
          shadow: true
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
      yAxis: {
        visible: false
      },
      tooltip: {enabled: false},
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
        type: 'spline',
        name: 'Random data',
        data: (function () {
          let data = [];
          data = [2, 4, 3, -2, 0, 2, 4, 2, 4, 2, 4];
          return data;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  })();

  /**
   * This will visualise the calories graph
   * ==============================================================
   */
  caloriesBurned = (() => {
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
          color: '#24b6d1',
          lineWidth: 1.5,
          marker: {
            enabled: false
          },
          shadow: true
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
      yAxis: {
        visible: false
      },
      tooltip: {enabled: false},
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
        type: 'spline',
        name: 'Random data',
        data: (function () {
          let data = [];
          data = [2, 4, 3, -2, 0, 2, 4, 2, 4, 2, 4];
          return data;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  })();

  /**
   * This will visualise the fat graph
   * ==============================================================
   */
  fatBurned = (() => {
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
          color: '#49b6e5',
          lineWidth: 1.5,
          marker: {
            enabled: false
          },
          shadow: true
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
      yAxis: {
        visible: false
      },
      tooltip: {enabled: false},
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
        type: 'spline',
        name: 'Random data',
        data: (function () {
          let data = [];
          data = [2, 4, 3, -2, 0, 2, 4, 2, 4, 2, 4];
          return data;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  })();

  /**
   * This will visualise the heart rate graph
   * ==============================================================
   */
  heartRate = (() => {
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
          color: '#cc6dff',
          lineWidth: 1.5,
          marker: {
            enabled: false
          },
          shadow: true
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
      yAxis: {
        visible: false
      },
      tooltip: {enabled: false},
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
        type: 'spline',
        name: 'Random data',
        data: (function () {
          return [
            1, 2, 3, 4, 4.5, 3.5, 2.6, 1,
            1, 2, 3, 4, 4.5, 3.5, 2.6, 1,
            1, 2, 3, 4, 4.5, 3.5, 2.6, 1,
            1, 2, 3, 4, 4.5, 3.5, 2.6, 1,
            1, 2, 3, 4, 4.5, 3.5, 2.6, 1,
            1, 2, 3, 4, 4.5, 3.5, 2.6, 1
          ];
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  })();

  /**
   * Tis method will generate a unified textInput and pass
   * properties
   * ==============================================================
   */
  renderInput = ({
    multiline, style,
    maxLength, secureTextEntry,
    password, placeholder,
    input: {
      onChange, ...restInput
    }
  }) => {
    return (
      <TextInput
        placeholder           = {placeholder}
        secureTextEntry       = {secureTextEntry}
        password              = {password}
        multiline             = {multiline}
        placeholderTextColor  = {"#cbd9df"}
        style                 = {style}
        onChangeText          = {onChange}
        maxLength             = {maxLength}
        underlineColorAndroid = "transparent"
        {...restInput}
      />
    )
  };

  /**
   * This method will open the side menu to show the messages
   * ==============================================================
   * @param navigate
   */
  openSideMenu = navigate => navigate('FooDrawerOpen');

  /**
   * This method will take care of displaying the current
   * authenticated user's image, and the message icon on the right
   * ==============================================================
   * @param User
   * @return {XML}
   */
  topContainer = User => {
    const {navigation} = this.props;
    return (
      <View style={styles.topSection}>
        <View>
          <View style={styles.imageContainer}>
            <View
              style={[
                styles.imgCircleContainer,
                !Images[User.uid]
                  ? {elevation: 1}
                  : null
              ]}>
              {Images[User.uid] ? (
                <Image
                  style      = {styles.userImg}
                  source     = {Images[User.uid]}
                  resizeMode = "contain"
                />
              ) : <Feather name={"user"} size={20} color={"#bccad0"}/>}
              <View
                style={[
                  styles.imgOverlay,
                  !Images[User.uid]
                    ? {backgroundColor: 'white', opacity: 0}
                    : null
                ]}
              />
            </View>
          </View>
        </View>

        <View style={styles.topContainerSubView}>
          <View>
            <TouchableOpacity
              onPress = {() => this.openSideMenu(navigation.navigate)}
              style   = {styles.messageBtn}>
              <View style={styles.positionRelative}>
                <Feather
                  name={"message-square"}
                  size={17}
                  color="#bccad0"/>
                <View style={styles.notificationDot}/>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.marginTwentyFive}
            onPress={() => this.signOutUser()}
          ><Text style={styles.logOutTxt}>L O G O U T</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  };


  /**
   * This method will show the about section without the user
   * being able to edit anything. So it's only readonly
   * ==============================================================
   * @param User
   * @return {XML}
   */
  aboutDefaultView = User => {
    const
      notSpecified = "Not specified",
      {
        name          = notSpecified,  bio = notSpecified,
        profession    = notSpecified,  age = notSpecified,
        DOB           = notSpecified,  address = notSpecified,
        contactNumber = notSpecified
      } = User;

    return (
      <View>
        <View style={styles.innerBox}>
          <TouchableOpacity
            style={styles.toggleViewBtn}
            onPress={() => this.toggleBtns("editView", true)}
          ><Feather
            name={'edit-2'}
            size={17}
            color='white'
          /></TouchableOpacity>
          <Text
            style={styles.boxTitle}>
            {this.applyLetterSpacing(
              `About ${name.split(" ")[0]}`
            ).toUpperCase()}
          </Text>
          <View style={styles.marginTwenty}>
            <Text numberOfLines={5} style={styles.mainText}>{bio}</Text>
          </View>

          <Text style={[styles.subHead, {fontSize: 12}]}>CONTACT INFORMATION</Text>
          <View style={styles.aboutContainer}>
            <View>
              <View style={styles.marginTen}>
                <Text style={styles.mainText}>{name}</Text>
                <Text style={styles.subHead}>@NAME</Text>
              </View>

              <View style={styles.marginTen}>
                <Text style={styles.mainText}>{profession}</Text>
                <Text style={styles.subHead}>@PROFESSION</Text>
              </View>

              <View style={styles.marginTen}>
                <Text style={styles.mainText}>{age}</Text>
                <Text style={styles.subHead}>@AGE</Text>
              </View>
            </View>
            <View>
              <View style={styles.marginTen}>
                <Text numberOfLines={1}
                      style={[styles.mainText, styles.mainTextOverride]}>{address}</Text>
                <Text style={styles.subHead}>@ADDRESS</Text>
              </View>

              <View style={styles.marginTen}>
                <Text style={styles.mainText}>{DOB}</Text>
                <Text style={styles.subHead}>@DATE OF BIRTH</Text>
              </View>

              <View style={styles.marginTen}>
                <Text style={styles.mainText}>{contactNumber}</Text>
                <Text style={styles.subHead}>@CONTACT NUMBER</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.socialIcons}>
          <View style={styles.connection}><Feather
            name={"facebook"}
            size={18}
            color="rgba(188,202,208, 1)"
          /></View>
          <View style={styles.connection}><Feather
            name={"twitter"}
            size={18}
            color="rgba(188,202,208, 1)"
          /></View>
          <View style={styles.connection}><Feather
            name={"instagram"}
            size={18}
            color="rgba(188,202,208, 1)"/>
          </View>
        </View>
      </View>
    )
  };

  /**
   * This method will enable the edit view so the user can change
   * the details about themselves
   * ==============================================================
   * @param User
   * @return {XML}
   */
  aboutEditView = User => {

    // submit function for redux form and the uid of the user
    const
      {handleSubmit} = this.props,
      {uid}          = User;

    return (
      <View>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={true}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flex: 0}}
          >
            <View
              style={styles.aboutEditView}
              keyboardShouldPersistTaps={'handled'}>
              <TouchableOpacity
                style={[styles.toggleViewBtn, {marginRight: 0}]}
                onPress={handleSubmit(saveEdit => {
                  Database.updateUserTable(uid, saveEdit);
                  this.toggleBtns("editView", false);
                })}
              ><Feather name={'check'} size={17} color='white'/>
              </TouchableOpacity>
              {
                this.state.aboutFormFields.map((input, i) => {
                  return (
                    <View style={styles.inputContainer} key={i}>
                      <Text style={styles.inputTitle}>{input.inputTitle}</Text>
                      <Field
                        style={[styles['input'], styles[input.overrideStyle]]}
                        name={input.fieldName}
                        placeholder={input.placeholder}
                        component={this.renderInput}
                      />
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  };

  /**
   * This will create the about section at the top of the page
   * ==============================================================
   */
  about = User => {

    // assign default values for the user and acquire form submit function
    const {editView} = this.state;

    return (
      <View style={[styles.box, styles.boxOverride]}>
        {
          !editView
            ? this.aboutDefaultView(User)
            : this.aboutEditView(User)
        }
      </View>
    )
  };


  /**
   * This will show the image of the users that is being followed
   * ==============================================================
   * @param Doctors
   * @param Patients
   * @param user
   * @param viewMoreBtn
   */
  connectionUser = (Doctors, Patients, user, viewMoreBtn) => user ? user.map((uid, i) => {
    if (i <= 3) {
      const $user = (Doctors && Doctors[uid]) || (Patients && Patients[uid]);
      return (
        <View style={styles.connection} key={uid}>
          <View style={styles.connectionOverride}>
            {Images[uid] ? (
              <Image
                style={[styles.userImg, styles.userImgOverride]}
                source={Images[uid]}
                resizeMode="contain"
              />
            ) : (
              <View style={[styles.userImg, styles.userImgOverrideSub]}>
                <Feather name={"user"} size={30} color={"white"}/>
              </View>
            )}
            <View style={styles.checkIconContainer}>
              <Feather
                style={styles.checkIcon}
                name={"check"}
                size={10}
                color="white"
              />
            </View>
          </View>
          <Text style={styles.txtNotSpecified}>
            {$user.name.split(" ")[0] || "Not specified"}
          </Text>
        </View>
      )
    } else if (!viewMoreBtn) {
      const $user = (Doctors && Doctors[uid]) || (Patients && Patients[uid]);
      return (
        <View style={styles.connection} key={uid}>
          <View style={{position: 'relative', marginBottom: 10}}>
            {Images[uid] ? (
              <Image
                style={[styles.userImg, styles.userImgOverride]}
                source={Images[uid]}
                resizeMode="contain"
              />
            ) : (
              <View style={[styles.userImg, styles.userImgOverrideSub]}>
                <Feather name={"user"} size={30} color={"white"}/>
              </View>
            )}
            <View style={styles.checkIconContainer}>
              <Feather
                style={styles.checkIcon}
                name={"check"}
                size={10}
                color="white"
              />
            </View>
          </View>
          <Text style={styles.txtNotSpecified}>
            {$user.name.split(" ")[0] || "Not specified"}
          </Text>
        </View>
      )
    }
  }): <Text>No Connections</Text>;

  /**
   * This method will show the connection section, with the
   * followers image
   * ==============================================================
   */
  connections = User => {
    const {
      Doctors = null, Patients = null
    } = User, {
      viewMoreBtn
    } = this.state,
      user = (Doctors || Patients)
        ? Object.keys(Doctors || Patients)
        : null
    ;

    return (
      <View style={[styles.box, {padding: 0}]}>
        {user && (user || viewMoreBtn) ? (
          <View style={styles.box}>
            <View>
              <Text style={styles.boxTitle}>
                {user
                  ? user.length
                  : 0
                }{
                  this.applyLetterSpacing(" Connections").toUpperCase()
                }
              </Text>
            </View>
            <View style={[styles.socialIcons, styles.socialIconsOverride]}>
              {this.connectionUser(Doctors, Patients, user, viewMoreBtn)}
            </View>
            {user && user.length > 4 ? (
              <View>
                <TouchableOpacity
                  style={styles.plusMinus}
                  onPress={() => this.toggleBtns("viewMoreBtn", !viewMoreBtn)}
                >
                  <Feather
                    name={viewMoreBtn ? "plus" : "minus"}
                    size={15}
                    color={"white"}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.connectionError}>
            <TouchableOpacity style={styles.XIcon}>
              <Feather name={'x'} size={17} color='white'/>
            </TouchableOpacity>
            <Text style={styles.yourNotSafe}>You're not
              safe!</Text>
            <View style={styles.yourNotSafeContainer}/>
            <Text style={styles.yourNotSafeTxt}>
              We're sorry, but you have no connections with
              any doctors. Don't worry, it's not your fault. Please join
              with a doctor and try again
            </Text>

            <TouchableOpacity style={styles.userIcon}>
              <Feather name={'users'} size={17} color='white'/>
            </TouchableOpacity>
          </View>
        )}

      </View>
    )
  };


  /**
   * This will visualise visualise ECG in line graph
   * ==============================================================
   * @param User
   * @param ecg
   * @param type
   * @return {XML}
   */
  $ECG = (User, ecg, type) => {
    const { uid } = User;
    return (
      <View style={[styles.box, styles.ecgBoxOverride]}>
        {ecg && type === "Patient" ? (
          <View>
            <View>
              <View style={styles.ecgSubView}>
                <Text style={styles.boxTitle}>
                  {this.applyLetterSpacing("Electrocardiograph").toUpperCase()}
                </Text>
              </View>
              <Counter/>
              <View>
                <Text style={styles.ecgTitle}>
                  <Text style={{color: '#d0d4db'}}>0</Text>
                  {97}
                </Text>
                <Text style={styles.ecgCaption}>
                  b e a t s   p e r   m i n u t e
                </Text>
              </View>
              <ECG
                height={130}
                width={Dimensions.get('window').width - 10}
              />
            </View>
            <View style={styles.paddingBottomZero}>
              <View style={styles.ECG$HeartSound}>
                <View style={styles.marginZero}>
                  <View style={styles.ecgInnerSubView}>
                    <Feather
                      name={"activity"}
                      size={18}
                      color="#aab8be"
                      style={{paddingLeft: 20}}
                    />
                    <Text style={styles.ECG$HeartSoundTxt}>Electrocardiograph</Text>
                  </View>
                  <View style={styles.ECG$HeartSoundContainer}>
                    <Chart
                      type={"day"}
                      height={160}
                      width={(Dimensions.get('window').width)}
                      config={this.config()}
                      component={"Statistics"}
                    />
                  </View>
                </View>
                <View style={styles.marginZero}>
                  <View style={styles.ecgInnerSubView}>
                    <Feather
                      name={"heart"}
                      size={18}
                      color="#aab8be"
                      style={{paddingLeft: 20}}
                    />
                    <Text style={styles.ECG$HeartSoundTxt}>
                      Heart Sound
                    </Text>
                  </View>
                  <View style={styles.ECG$HeartSoundContainer}>
                    <Chart
                      type={"day"}
                      height={160}
                      width={(Dimensions.get('window').width)}
                      config={this.config()}
                      component={"Statistics"}/>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.ECGError}>
            <TouchableOpacity style={styles.ECGErrorBtn}>
              <Feather name={'x'} size={17} color='white'/>
            </TouchableOpacity>
            <Text style={styles.ohSnap}>Oh Snap!</Text>
            <View style={styles.ohSnapContainer}/>
            <Text style={styles.ohSnapTxt}>
              We're sorry, but something went wrong. Don't worry,
              it's not your fault. Please import your ECG and try
              again!
            </Text>
            <TouchableOpacity
              style={styles.updateECGBtn}
              onPress={() => Database.updateECG(uid, this.ECG)}
            ><Feather name={'activity'} size={17} color='white'/>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  };

  /**
   *
   * @param health
   * @param addHealth
   * @return {XML}
   */
  generalHealthGraphs = (health, addHealth) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => this.toggleBtns("addHealth", !addHealth)}
        >
          <Feather name={'edit-2'} size={17} color='white'/>
        </TouchableOpacity>
        <View style={styles.healthSubView}>
          <View style={styles.singleHealthContainer}>
            <View style={styles.healthSubContainer}>
              <Text style={[
                styles.boxTitle, styles.boxTitleOverride
              ]}>{health.thermometer || 0}
                <Text style={{color: '#d0d4db'}}>°</Text>{'\n'}
                <Text style={[
                  styles.boxTitle, styles.temperatureOverride
                ]}>Temperature</Text>
              </Text>
            </View>
            <Chart
              type={"day"}
              height={50}
              width={130}
              config={this.temperature}
            />
          </View>
          <View style={styles.singleHealthContainer}>
            <View style={styles.healthSubContainer}>
              <Text style={[
                styles.boxTitle, styles.boxTitleOverride
              ]}>
                {health.calories || 0}
                <Text style={styles.healthTitle}>cal</Text>{'\n'}
                <Text style={[
                  styles.boxTitle, styles.temperatureOverride
                ]}>Calories burned</Text>
              </Text>
            </View>
            <Chart
              type={"day"}
              height={50}
              width={130}
              config={this.caloriesBurned}
            />
          </View>
          <View style={styles.singleHealthContainer}>
            <View style={styles.healthSubContainer}>
              <Text style={[
                styles.boxTitle, styles.boxTitleOverride
              ]}>{health.fat}<Text style={styles.healthTitle}>%</Text>{'\n'}
                <Text style={[
                  styles.boxTitle, styles.temperatureOverride
                ]}>Fat burned</Text>
              </Text>
            </View>
            <Chart
              type={"day"}
              height={50}
              width={130}
              config={this.fatBurned}
            />
          </View>
          <View style={styles.singleHealthContainer}>
            <View style={styles.healthSubContainer}>
              <Text style={[
                styles.boxTitle, styles.boxTitleOverride
              ]}>{health.bpm}<Text style={styles.healthTitle}>bpm</Text>{'\n'}
                <Text style={[
                  styles.boxTitle, styles.temperatureOverride
                ]}>Heart rate</Text>
              </Text>
            </View>
            <Chart
              type={"day"}
              height={50}
              width={130}
              config={this.heartRate}
            />
          </View>
        </View>
      </View>
    )
  };

  /**
   * This is a form for editing the health container. It is used
   * to edit or update any information about one's health
   * ==============================================================
   * @param User
   * @param addHealth
   * @return {XML}
   */
  healthInputFields = (User, addHealth) => {
    const {handleSubmit} = this.props, {uid} = User;
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex: 0}}>
        <View style={styles.healthSubSubView}
              keyboardShouldPersistTaps={'handled'}>
          <TouchableOpacity
            style={styles.healthCheckIconContainer}
            onPress={handleSubmit(saveEdit => {
              Database.updateHealthTable(uid, {
                ...saveEdit,
                allergies: saveEdit.allergies ? saveEdit.allergies.split(',') : null
              });
              this.toggleBtns("addHealth", !addHealth);
            })}
          >
            <Feather name={"check"} size={17} color={"white"}/>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>@Temperature</Text>
            <Field
              style={styles.input}
              name="thermometer"
              placeholder="eg 37.5"
              component={this.renderInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>@Calories</Text>
            <Field
              style={styles.input}
              name="calories"
              placeholder="eg 500"
              component={this.renderInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>@Fat</Text>
            <Field
              style={styles.input}
              name="fat"
              placeholder="eg. 11"
              component={this.renderInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>@Age</Text>
            <Field
              style={styles.input}
              name="age"
              placeholder="eg. 20"
              component={this.renderInput}/>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>@Beats per minute</Text>
            <Field
              style={styles.input}
              name="bpm"
              placeholder="eg. between 60-100"
              component={this.renderInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>@Body mass index</Text>
            <Field
              style={styles.input}
              name="bmi"
              placeholder="eg. 22.3"
              component={this.renderInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>@Height</Text>
            <Field
              style={styles.input}
              name="height"
              placeholder="eg. (cm)"
              component={this.renderInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>@Weight</Text>
            <Field
              style={styles.input}
              name="weight"
              placeholder="eg. (kg)"
              component={this.renderInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>@Allergies</Text>
            <Field
              style={styles.input}
              name="allergies"
              placeholder="eg. peanuts"
              component={this.renderInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>@Health alert</Text>
            <Field
              style={styles.input}
              name="healthAlert"
              placeholder="eg. Stable | Average | High"
              component={this.renderInput}
            />
          </View>
        </View>
      </ScrollView>
    )
  };

  /**
   * Should there be any issues with displaying health information,
   * this method will be invoked and show an error message
   * ==============================================================
   * @param User
   * @param health
   * @param addHealth
   * @return {XML}
   */
  errorHealth = (User, health, addHealth) => {
    return (
      <View>
        {!health && !addHealth ? (
          <View style={styles.healthAlternative}>
            <TouchableOpacity
              style={styles.addHealthBtn}
            >
              <Feather name={'x'} size={17} color='white'/>
            </TouchableOpacity>
            <Text style={styles.areYouHealthy}>Are you
              healthy?</Text>
            <View style={styles.errorHealthContainer}/>
            <Text style={styles.errorHealthTxt}>
              We're sorry, but it seems we do not hold any of
              your health records. Don't worry, it's not your fault.
              Please add them and try again
            </Text>

            <TouchableOpacity
              onPress={() => this.toggleBtns("addHealth", !addHealth)}
              style={styles.addHealthBtnTwo}>
              <Feather name={'plus'} size={17} color='white'/>
            </TouchableOpacity>
          </View>
        ) : addHealth ? (
          <View style={[styles.box, styles.alignItemsStretch]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
              {this.healthInputFields(User, addHealth)}
            </TouchableWithoutFeedback>
          </View>
        ) : null}
      </View>
    )
  };

  /**
   * The main container that holds the health section together.
   * It has many sub containers grouping relevant information
   * ==============================================================
   * @param User
   * @param health
   * @param type
   * @return {XML}
   */
  $Health = (User, health, type) => {
    const {addHealth} = this.state;
    return (
      <View style={[styles.box, styles.healthBoxOverride]}>
        {health && type === "Patient" && !addHealth ? (
          this.generalHealthGraphs(health, addHealth)
        ) : (
          this.errorHealth(User, health, addHealth)
        )}
      </View>
    )
  };

  /**
   * This method will be called once the component has been
   * mounted and ready for the user to see.
   * ==============================================================
   * @return {XML}
   */
  render() {
    const {User, ECG, Health} = this.state;
    return (<ScrollView showsVerticalScrollIndicator={false}>
      {User ? this.topContainer(User) : null}
      <View style={styles.mainContainer}>
        <View style={[styles.middleContainer, {
          width: this.state.width <= 412 ? '95%' : 550
        }]}>

          {User
            ? this.about(User)
            : null}

          {User
            ? this.connections(User)
            : null}

          {User && User.type === "Patient"
            ? this.$ECG(User, ECG, User.type)
            : null}

          {User && User.type === "Patient" ?
            this.$Health(User, Health, User.type)
            : null}

        </View>
      </View>
    </ScrollView>)
  }
}

export default reduxForm({form: 'testdasd'})(PatientMainScreen)
