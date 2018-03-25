import React, {Component, PureComponent} from 'react';
import {
  Text, View,
  TouchableOpacity, TouchableHighlight,
  StyleSheet, Dimensions, ScrollView, Image, Keyboard,
  TouchableWithoutFeedback, TextInput
} from 'react-native';
import ECG from "./ECG";
import HeartBeat from "../Components/HeartBeat";
import Chart from "./Chart";
import Database from '../Components/Database';
import {Images} from '../Containers/PreLoadImages';
import Feather from "react-native-vector-icons/Feather";
import EditUser from "./EditUser";
import firebase from 'react-native-firebase';
import {Field, reduxForm} from "redux-form";
import User from '../Components/User';
import Counter from "./Counter";


class PatientMainScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      User: null,
      ECG: null,
      Health: null,
      width: null,
      height: null,
      bpm: 0,
      viewMoreBtn: true,
      editView: false,
      counter: 0,
      addHealth: false
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    User().then(user => {
      this.userRef = firebase.app().database().ref(`/Users/${user.uid}`);
      this.ecgRef = firebase.app().database().ref(`/ECG/${user.uid}`);
      this.healthRef = firebase.app().database().ref(`/Health/${user.uid}`);
      this.fetchData(this.userRef, this.ecgRef, this.healthRef, user);
    });

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

  fetchData = (userRef, ecgRef, healthRef, authUser) => {
    userRef.on('value', snap => this._isMounted ? this.setState({User: {...snap.val(), uid: authUser.uid}}) : null);
    ecgRef.on('value', snap => this._isMounted ? this.setState({ECG: snap.val()}) : null);
    healthRef.on('value', snap => this._isMounted ? this.setState({Health: snap.val()}) : null);
  };

  applyLetterSpacing = (string, count = 1) => string.split('').join('\u200A'.repeat(count));

  signOutUser = async () => await firebase.auth().signOut().catch(e => console.log(e));

  toggleBtns = (stateVariable, success) => this.setState({[stateVariable]: success});

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

  random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

  calroiesBurned = (() => {
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

  renderInput = ({multiline, style, maxLength, secureTextEntry, password, placeholder, input: {onChange, ...restInput}}) => {
    return (
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        password={password}
        multiline={multiline}
        placeholderTextColor={"#cbd9df"}
        style={style}
        onChangeText={onChange}
        maxLength={maxLength}
        underlineColorAndroid="transparent"
        {...restInput}
      />
    )
  };

  topContainer = User => {
    const {navigation} = this.props;
    return (
      <View style={styles.topSection}>
        <View>
          <View style={styles.imageContainer}>
            <View style={[styles.imgCircleContainer, !Images[User.uid] ? {elevation: 1} : null]}>
              {Images[User.uid] ? (
                <Image style={styles.userImg} source={Images[User.uid]} resizeMode="contain"/>
              ) : <Feather name={"user"} size={20} color={"#bccad0"}/>}
              <View style={[styles.imgOverlay, !Images[User.uid] ? {backgroundColor: 'white', opacity: 0} : null]}/>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate('FooDrawerOpen')} style={styles.messageBtn}>
              <View style={{position: 'relative'}}>
                <Feather name={"message-square"} size={17} color="#bccad0"/>
                <View style={styles.notificationDot}/>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{marginLeft: 25}} onPress={() => this.signOutUser()}>
            <Text style={{color: '#a1a2a7', fontWeight: 'bold', fontSize: 10}}>L O G O U T</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  };

  about = User => {
    const notSpecified = "Not specified";
    const {handleSubmit} = this.props, {
      uid,
      name = notSpecified,
      bio = notSpecified,
      profession = notSpecified,
      age = notSpecified,
      DOB = notSpecified,
      address = notSpecified,
      contactNumber = notSpecified
    } = User, {editView} = this.state;

    return (
      <View style={[styles.box, {minHeight: 250}]}>
        {!editView ? (
          <View>
            <View style={styles.innerBox}>
              <TouchableOpacity
                style={styles.toggleViewBtn}
                onPress={() => this.toggleBtns("editView", true)}
              ><Feather name={'edit-2'} size={17} color='white'/>
              </TouchableOpacity>
              <Text
                style={styles.boxTitle}>{this.applyLetterSpacing(`About ${name.split(" ")[0]}`).toUpperCase()}</Text>
              <View style={{marginBottom: 20}}>
                <Text numberOfLines={5} style={styles.mainText}>{bio}</Text>
              </View>

              <Text style={[styles.subHead, {fontSize: 12}]}>CONTACT INFORMATION</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text style={styles.mainText}>{name}</Text>
                    <Text style={styles.subHead}>@NAME</Text>
                  </View>

                  <View style={{marginBottom: 10}}>
                    <Text style={styles.mainText}>{profession}</Text>
                    <Text style={styles.subHead}>@PROFESSION</Text>
                  </View>

                  <View style={{marginBottom: 10}}>
                    <Text style={styles.mainText}>{age}</Text>
                    <Text style={styles.subHead}>@AGE</Text>
                  </View>
                </View>
                <View>
                  <View style={{marginBottom: 10}}>
                    <Text numberOfLines={1}
                          style={[styles.mainText, {flexWrap: 'wrap', maxWidth: 190}]}>{address}</Text>
                    <Text style={styles.subHead}>@ADDRESS</Text>
                  </View>

                  <View style={{marginBottom: 10}}>
                    <Text style={styles.mainText}>{DOB}</Text>
                    <Text style={styles.subHead}>@DATE OF BIRTH</Text>
                  </View>

                  <View style={{marginBottom: 10}}>
                    <Text style={styles.mainText}>{contactNumber}</Text>
                    <Text style={styles.subHead}>@CONTACT NUMBER</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.socialIcons}>
              <View style={styles.connection}><Feather name={"facebook"} size={18} color="rgba(188,202,208, 1)"/></View>
              <View style={styles.connection}><Feather name={"twitter"} size={18} color="rgba(188,202,208, 1)"/></View>
              <View style={styles.connection}><Feather name={"instagram"} size={18}
                                                       color="rgba(188,202,208, 1)"/></View>
            </View>
          </View>
        ) : (
          <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex: 0}}>
                <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch',}}
                      keyboardShouldPersistTaps={'handled'}>
                  <TouchableOpacity
                    style={[styles.toggleViewBtn, {marginRight: 0}]}
                    onPress={handleSubmit(saveEdit => {
                      Database.updateUserTable(uid, saveEdit);
                      this.toggleBtns("editView", false);
                    })}
                  >
                    <Feather name={'check'} size={17} color='white'/>
                  </TouchableOpacity>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Name</Text>
                    <Field style={styles.input} name="name" placeholder="eg. Naseebullah Ahmadi"
                           component={this.renderInput}/>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Bio</Text>
                    <Field style={[styles.input, {height: 100, textAlignVertical: "top"}]} multiline={true} name="bio"
                           placeholder="your Text" component={this.renderInput}/>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Address</Text>
                    <Field style={styles.input} name="address" placeholder="eg. 123 Wallstreet"
                           component={this.renderInput}/>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Profession</Text>
                    <Field style={styles.input} name="profession" placeholder="eg. Frontend Developer"
                           component={this.renderInput}/>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Contact Number</Text>
                    <Field style={styles.input} name="contactNumber" placeholder="eg. 07473693312"
                           component={this.renderInput}/>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Date of birth</Text>
                    <Field style={styles.input} name="DOB" placeholder="eg. 02/06/1997" component={this.renderInput}/>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Age</Text>
                    <Field style={styles.input} name="age" placeholder="eg. 20" component={this.renderInput}/>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Gender</Text>
                    <Field style={styles.input} name="gender" placeholder="eg. male/female"
                           component={this.renderInput}/>
                  </View>
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    )
  };

  connections = User => {
    const {Doctors = null, Patients = null} = User, {viewMoreBtn} = this.state;
    const user = (Doctors || Patients) ? Object.keys(Doctors || Patients) : null;
    return (
      <View style={[styles.box, {padding: 0}]}>
        {user && (user || viewMoreBtn) ? (
          <View style={styles.box}>
            <View>
              <Text style={styles.boxTitle}>
                {user ? user.length : 0} {this.applyLetterSpacing("Connections").toUpperCase()}</Text>
            </View>
            <View style={[styles.socialIcons, {flexWrap: 'wrap', justifyContent: 'flex-start'}]}>
              {
                user ? user.map((uid, i) => {
                  if (i <= 3) {
                    const $user = (Doctors && Doctors[uid]) || (Patients && Patients[uid]);
                    return (
                      <View style={styles.connection} key={uid}>
                        <View style={{position: 'relative', marginBottom: 10}}>
                          {Images[uid] ? (
                            <Image
                              style={[styles.userImg, {
                                borderRadius: 300,
                                height: 50,
                                width: 50
                              }]}
                              source={Images[uid]}
                              resizeMode="contain"
                            />
                          ) : (
                            <View style={[styles.userImg, {
                              borderRadius: 300,
                              height: 50,
                              width: 50,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: "#E67D8F"
                            }]}>
                              <Feather name={"user"} size={30} color={"white"}/>
                            </View>
                          )}
                          <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            bottom: -4,
                            right: -8,
                            padding: 3,
                            backgroundColor: 'white',
                            borderRadius: 300
                          }}>
                            <Feather style={{backgroundColor: '#65C178', borderRadius: 300, padding: 2}} name={"check"}
                                     size={10} color="white"/>
                          </View>
                        </View>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: 11,
                          color: '#a1a2a7'
                        }}>{$user.name.split(" ")[0] || "Not specified"}</Text>

                      </View>
                    )
                  } else if (!viewMoreBtn) {
                    const $user = (Doctors && Doctors[uid]) || (Patients && Patients[uid]);
                    return (
                      <View style={styles.connection} key={uid}>
                        <View style={{position: 'relative', marginBottom: 10}}>
                          <Image
                            style={[styles.userImg, {
                              borderRadius: 300,
                              height: 50,
                              width: 50
                            }]}
                            source={Images[uid]}
                            resizeMode="contain"
                          />
                          <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            bottom: -4,
                            right: -8,
                            padding: 3,
                            backgroundColor: 'white',
                            borderRadius: 300
                          }}>
                            <Feather style={{backgroundColor: '#65C178', borderRadius: 300, padding: 2}} name={"check"}
                                     size={10} color="white"/>
                          </View>
                        </View>
                        <Text style={{
                          fontWeight: 'bold',
                          fontSize: 11,
                          color: '#a1a2a7'
                        }}>{$user.name.split(" ")[0] || "Not specified"}</Text>

                      </View>
                    )
                  }
                }) : <Text>No Connections</Text>
              }
            </View>
            {user && user.length >= 3 ? (
              <View>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    margin: 10,
                    marginRight: 0,
                    padding: 10,
                    backgroundColor: '#6482e6',
                    borderRadius: 300,
                    elevation: 2
                  }}
                  onPress={() => this.toggleBtns("viewMoreBtn", !viewMoreBtn)}
                >
                  <Feather name={viewMoreBtn ? "plus" : "minus"} size={15} color={"white"}/>
                </TouchableOpacity>

              </View>
            ) : null}
          </View>
        ) : (
          <View style={{
            padding: 30,
            paddingBottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginBottom: 20,
                marginRight: 13,
                padding: 10,
                backgroundColor: '#E67D8F',
                borderRadius: 300,
                elevation: 4
              }}
            >
              <Feather name={'x'} size={17} color='white'/>
            </TouchableOpacity>
            <Text style={{fontSize: 30, color: '#aab8be', textAlign: 'center', fontWeight: 'bold'}}>You're not
              safe!</Text>
            <View style={{
              marginTop: 10,
              marginBottom: 10,
              width: 20,
              height: 3,
              backgroundColor: 'rgba(188,202,208, 0.15)'
            }}/>
            <Text style={{fontSize: 14, color: '#d2d6d9', textAlign: 'center'}}>
              We're sorry, but you have no connections with any doctors. Don't worry, it's not your fault. Please join
              with a doctor and try again
            </Text>

            <TouchableOpacity style={{
              padding: 15,
              paddingLeft: 65,
              paddingRight: 65,
              elevation: 0.6,
              borderRadius: 5,
              backgroundColor: '#6482e6',
              marginTop: 20,
              marginBottom: 20
            }}>
              <Feather name={'users'} size={17} color='white'/>
            </TouchableOpacity>
          </View>
        )}

      </View>
    )
  };

  $ECG = (User, ecg, type) => {
    const {uid} = User;
    let liveBeatsPerMinute = 0;
    return (
      <View style={[styles.box, {padding: 0, marginBottom: 10}]}>
        {ecg && type === "Patient" ? (
          <View>
            <View>
              <View style={{padding: 30, paddingBottom: 0}}>
                <Text style={styles.boxTitle}>{this.applyLetterSpacing("Electrocardiograph").toUpperCase()}</Text>
              </View>
              <Counter/>
              <View>
                <Text style={{fontSize: 50, color: '#7D8292', textAlign: 'center'}}><Text
                  style={{color: '#d0d4db'}}>0</Text>{97}</Text>

                <Text style={{fontSize: 15, color: '#e0e1e8', textAlign: 'center'}}>b e a t s p e r m i n u t e</Text>

              </View>
              <ECG height={130} width={Dimensions.get('window').width - 10}/>
            </View>
            <View style={{paddingBottom: 0}}>

              <View style={{
                paddingLeft: 0,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
              }}>
                <View style={{margin: 0}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Feather name={"activity"} size={18} color="#aab8be" style={{paddingLeft: 20}}/>
                    <Text style={{fontSize: 17, color: '#aab8be', textAlign: 'center', paddingLeft: 10}}>Electrocardiograph</Text>
                  </View>
                  <View style={[styles.healthContainer, styles.infoSection, {
                    padding: 0,
                    paddingTop: 15,
                    paddingBottom: 25
                  }]}>
                    <Chart type={"day"} height={160} width={(Dimensions.get('window').width)} config={this.config()}
                           component={"Statistics"}/>
                  </View>
                </View>
                <View style={{margin: 0}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Feather name={"heart"} size={18} color="#aab8be" style={{paddingLeft: 20}}/>
                    <Text style={{fontSize: 17, color: '#aab8be', textAlign: 'center', paddingLeft: 10}}>Heart
                      Sound</Text>
                  </View>
                  <View style={[styles.healthContainer, styles.infoSection, {
                    padding: 0,
                    paddingTop: 15,
                    paddingBottom: 25
                  }]}>
                    <Chart type={"day"} height={160} width={(Dimensions.get('window').width)} config={this.config()}
                           component={"Statistics"}/>
                  </View>
                </View>
              </View>

            </View>
          </View>
        ) : (
          <View style={{padding: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginBottom: 20,
                marginRight: 13,
                padding: 10,
                backgroundColor: '#E67D8F',
                borderRadius: 300,
                elevation: 4
              }}
            >
              <Feather name={'x'} size={17} color='white'/>
            </TouchableOpacity>
            <Text style={{fontSize: 30, color: '#aab8be', textAlign: 'center', fontWeight: 'bold'}}>Oh Snap!</Text>
            <View style={{
              marginTop: 10,
              marginBottom: 10,
              width: 20,
              height: 3,
              backgroundColor: 'rgba(188,202,208, 0.15)'
            }}/>
            <Text style={{fontSize: 14, color: '#d2d6d9', textAlign: 'center'}}>
              We're sorry, but something went wrong. Don't worry, it's not your fault. Please import your ECG and try
              again
            </Text>

            <TouchableOpacity style={{
              padding: 15,
              paddingLeft: 65,
              paddingRight: 65,
              elevation: 0.6,
              borderRadius: 5,
              backgroundColor: '#6482e6',
              marginTop: 20
            }}
                              onPress={() => Database.updateECG(uid, this.ECG)}
            ><Feather name={'activity'} size={17} color='white'/>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  };

  $Health = (User, health, type) => {
    const {handleSubmit} = this.props, {uid} = User, {addHealth} = this.state;
    return (
      <View style={[styles.box, {padding: 10, marginBottom: 10}]}>
        {health && type === "Patient" && !addHealth ? (
          <View>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                margin: 20,
                marginRight: 33,
                padding: 10,
                backgroundColor: '#6482e6',
                borderRadius: 300,
                elevation: 4
              }}
              onPress={() => this.toggleBtns("addHealth", !addHealth)}
            >
              <Feather name={'edit-2'} size={17} color='white'/>
            </TouchableOpacity>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>

              <View style={styles.singleHealthContainer}>
                <View style={{padding: 10}}>
                  <Text style={[styles.boxTitle, {fontSize: 55, fontWeight: 'normal', textAlign: 'left'}]}>
                    {health.thermometer || 0}<Text style={{color: '#d0d4db'}}>°</Text>{'\n'}
                    <Text style={[styles.boxTitle, {fontSize: 13, fontWeight: 'normal'}]}>Temperature</Text>
                  </Text>
                </View>
                <Chart type={"day"} height={50} width={130} config={this.temperature} component={"Statistics"}/>
              </View>

              <View style={styles.singleHealthContainer}>
                <View style={{padding: 10}}>
                  <Text style={[styles.boxTitle, {fontSize: 55, fontWeight: 'normal', textAlign: 'left'}]}>
                    {health.calories || 0}<Text style={{color: '#d0d4db', fontSize: 25}}>cal</Text>{'\n'}
                    <Text style={[styles.boxTitle, {fontSize: 13, fontWeight: 'normal'}]}>Calories burned</Text>
                  </Text>
                </View>
                <Chart type={"day"} height={50} width={130} config={this.calroiesBurned} component={"Statistics"}/>
              </View>

              <View style={styles.singleHealthContainer}>
                <View style={{padding: 10}}>
                  <Text style={[styles.boxTitle, {fontSize: 55, fontWeight: 'normal', textAlign: 'left'}]}>
                    {health.fat}<Text style={{color: '#d0d4db', fontSize: 25}}>%</Text>{'\n'}
                    <Text style={[styles.boxTitle, {fontSize: 13, fontWeight: 'normal'}]}>Fat burned</Text>
                  </Text>
                </View>
                <Chart type={"day"} height={50} width={130} config={this.fatBurned} component={"Statistics"}/>
              </View>

              <View style={styles.singleHealthContainer}>
                <View style={{padding: 10}}>
                  <Text style={[styles.boxTitle, {fontSize: 55, fontWeight: 'normal', textAlign: 'left'}]}>
                    {health.bpm}<Text style={{color: '#d0d4db', fontSize: 25}}>bpm</Text>{'\n'}
                    <Text style={[styles.boxTitle, {fontSize: 13, fontWeight: 'normal'}]}>Heart rate</Text>
                  </Text>
                </View>
                <Chart type={"day"} height={50} width={130} config={this.heartRate} component={"Statistics"}/>
              </View>
            </View>
          </View>
        ) : (
          <View>
            {!health && !addHealth ? (
              <View style={{padding: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    marginBottom: 20,
                    marginRight: 25,
                    padding: 10,
                    backgroundColor: '#E67D8F',
                    borderRadius: 300,
                    elevation: 4
                  }}
                >
                  <Feather name={'x'} size={17} color='white'/>
                </TouchableOpacity>
                <Text style={{fontSize: 30, color: '#aab8be', textAlign: 'center', fontWeight: 'bold'}}>Are you
                  healthy?</Text>
                <View style={{
                  marginTop: 10,
                  marginBottom: 10,
                  width: 20,
                  height: 3,
                  backgroundColor: 'rgba(188,202,208, 0.15)'
                }}/>
                <Text style={{fontSize: 14, color: '#d2d6d9', textAlign: 'center'}}>
                  We're sorry, but it seems we do not hold any of your health records. Don't worry, it's not your fault.
                  Please add them and try again
                </Text>

                <TouchableOpacity
                  onPress={() => this.toggleBtns("addHealth", !addHealth)}
                  style={{
                    padding: 15,
                    alignItems: 'center',
                    paddingLeft: 65,
                    paddingRight: 65,
                    elevation: 0.6,
                    borderRadius: 5,
                    backgroundColor: '#6482e6',
                    marginTop: 20
                  }}>
                  <Feather name={'plus'} size={17} color='white'/>
                </TouchableOpacity>
              </View>
            ) : addHealth ? (
              <View style={[styles.box, {alignItems: 'stretch'}]}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
                  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex: 0}}>
                    <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch',}}
                          keyboardShouldPersistTaps={'handled'}>
                      <TouchableOpacity
                        style={{
                          alignSelf: 'flex-end',
                          marginBottom: 1,
                          marginRight: 25,
                          padding: 10,
                          backgroundColor: '#6482e6',
                          borderRadius: 300,
                          elevation: 4
                        }}
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
                        <Field style={styles.input} name="thermometer" placeholder="eg 37.5"
                               component={this.renderInput}/>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>@Calories</Text>
                        <Field style={styles.input} name="calories" placeholder="eg 500" component={this.renderInput}/>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>@Fat</Text>
                        <Field style={styles.input} name="fat" placeholder="eg. 11" component={this.renderInput}/>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>@Age</Text>
                        <Field style={styles.input} name="age" placeholder="eg. 20"
                               component={this.renderInput}/>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>@Beats per minute</Text>
                        <Field style={styles.input} name="bpm" placeholder="eg. between 60-100"
                               component={this.renderInput}/>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>@Body mass index</Text>
                        <Field style={styles.input} name="bmi" placeholder="eg. 22.3" component={this.renderInput}/>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>@Height</Text>
                        <Field style={styles.input} name="height" placeholder="eg. (cm)" component={this.renderInput}/>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>@Weight</Text>
                        <Field style={styles.input} name="weight" placeholder="eg. (kg)" component={this.renderInput}/>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>@Allergies</Text>
                        <Field style={styles.input} name="allergies" placeholder="eg. peanuts"
                               component={this.renderInput}/>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>@Health alert</Text>
                        <Field style={styles.input} name="healthAlert" placeholder="eg. Stable | Average | High"
                               component={this.renderInput}/>
                      </View>
                    </View>
                  </ScrollView>
                </TouchableWithoutFeedback>
              </View>
            ) : null}
          </View>
        )}
      </View>
    )
  };

  render() {
    const {User, ECG, Health} = this.state;
    return (<ScrollView showsVerticalScrollIndicator={false}>
      {User ? this.topContainer(User) : null}
      <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={[styles.middleContainer, {width: this.state.width <= 412 ? '95%' : 550}]}>

          {User ? this.about(User) : null}

          {User ? this.connections(User) : null}

          {User && User.type === "Patient" ? this.$ECG(User, ECG, User.type) : null}

          {User && User.type === "Patient" ? this.$Health(User, Health, User.type) : null}
        </View>
      </View>
    </ScrollView>)
  }
}

export default reduxForm({
  form: 'testdasd'
})(PatientMainScreen)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(188,202,208, 0.1)'
  },
  topContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 0,
    paddingTop: 0
  },
  middleContainer: {
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center'
  },
  messageBtn: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 300,
    padding: 15,
    elevation: 1
  },
  notificationDot: {
    position: 'absolute',
    right: -2,
    top: -4,
    width: 12,
    height: 12,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 100 / 2,
    backgroundColor: '#E67D8F'
  },
  box: {
    position: 'relative',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderRadius: 6,
    padding: 30,
    paddingBottom: 10,
    marginBottom: 15,
    elevation: 0.1,
  },
  innerBox: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(188,202,208, 0.15)',
    paddingBottom: 20,
    marginRight: 5
  },
  boxTitle: {
    color: '#aab8be',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10
  },
  mainText: {
    color: '#d2d6d9',
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'left'
  },
  toggleViewBtn: {
    alignSelf: 'flex-end',
    marginBottom: 1,
    padding: 10,
    backgroundColor: '#6482e6',
    borderRadius: 300,
    elevation: 4,
    marginRight: 5
  },
  type: {
    fontSize: 25,
    color: 'white'
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  imgCircleContainer: {
    position: 'relative',
    borderRadius: 80,
    height: 60,
    width: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 20,
    justifyContent: 'center',
    marginBottom: 10
  },
  userImg: {
    borderRadius: 300,
    height: 60,
    width: 60,
  },
  imgOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(144, 154, 174, 0.8)',
    opacity: 0.5,
    borderRadius: 300,
    height: 60,
    width: 60,
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
    color: 'rgba(243, 243, 243, 1)'
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  connection: {
    margin: 10,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  singleHealthContainer: {
    margin: 20,
  },
  subHead: {
    color: "#aab8be",
    fontSize: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20
  },
  inputTitle: {
    textAlign: 'left',
    color: '#aab8be'
  },
  input: {
    fontSize: 15,
    color: "#aab8be",
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(188,202,208, 0.15)',
    marginTop: 10,
    borderRadius: 5
  }
});
