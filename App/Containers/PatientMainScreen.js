import React, {Component} from 'react';
import {Text, View,
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


class PatientMainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User        : null,
      ECG         : null,
      Health      : null,
      width       : null,
      height      : null,
      bpm         : 0,
      viewMoreBtn : true,
      editView    : false
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    User().then(user => {
      this.userRef    = firebase.app().database().ref(`/Users/${user.uid}`);
      this.ecgRef     = firebase.app().database().ref(`/ECG/${user.uid}`);
      this.healthRef  = firebase.app().database().ref(`/Health/${user.uid}`);
      this.fetchData(this.userRef, this.ecgRef, this.healthRef, user);
    });
  }

  fetchData = (userRef, ecgRef, healthRef, authUser) => {
    userRef.on('value', snap => this._isMounted ? this.setState({User: {...snap.val(), uid: authUser.uid}}) : null);
    ecgRef.on('value', snap => this._isMounted ? this.setState({ECG: snap.val()}) : null);
    healthRef.once('value', snap => this._isMounted ? this.setState({Health: snap.val()}) : null);
  };

  applyLetterSpacing = (string, count = 1) => string.split('').join('\u200A'.repeat(count));

  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  save = success => this.setState({editView: success});

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
          data = $this.state.ECG;
          return data;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  };

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
        type: 'spline',
        name: 'Random data',
        data: (function() {
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
        type: 'spline',
        name: 'Random data',
        data: (function() {
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
        type: 'spline',
        name: 'Random data',
        data: (function() {
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
        type: 'spline',
        name: 'Random data',
        data: (function() {
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

  about = User => {
    const notSpecified = "Not specified";
    const { handleSubmit } = this.props, {
      uid,
      name          = notSpecified,
      bio           = notSpecified,
      profession    = notSpecified,
      age           = notSpecified,
      DOB           = notSpecified,
      address       = notSpecified,
      contactNumber = notSpecified
    } = User, { editView } = this.state;

    return (
      <View style={[styles.box, {minHeight: 250}]}>
        {!editView ? (
          <View>
            <View style={{borderBottomWidth: 1, borderBottomColor: 'rgba(188,202,208, 0.15)', paddingBottom: 20, marginRight: 5}}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', marginBottom: 1, padding: 10, backgroundColor: '#6482e6', borderRadius: 300,
                  elevation: 4, marginRight: 5
                }}
                onPress={() => this.save(true)}
              >
                <Feather name={'edit-2'} size={17} color='white' />
              </TouchableOpacity>
              <Text style={styles.boxTitle}>{this.applyLetterSpacing(`About ${name.split(" ")[0]}`).toUpperCase()}</Text>
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
                    <Text numberOfLines={1} style={[styles.mainText, {flexWrap: 'wrap', maxWidth: 190}]}>{address}</Text>
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
              <View style={styles.connection}><Feather name={"facebook"} size={18} color="rgba(188,202,208, 1)" /></View>
              <View style={styles.connection}><Feather name={"twitter"} size={18} color="rgba(188,202,208, 1)" /></View>
              <View style={styles.connection}><Feather name={"instagram"} size={18} color="rgba(188,202,208, 1)" /></View>
            </View>
          </View>
        ): (
          <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex:0}}>
                <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch',}}>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end', marginBottom: 1, padding: 10, backgroundColor: '#6482e6', borderRadius: 300,
                      elevation: 4
                    }}
                    onPress={handleSubmit(saveEdit => {
                      Database.updateUserTable(uid, saveEdit);
                      this.save(false);
                    })}
                  >
                    <Feather name={'check'} size={17} color='white' />
                  </TouchableOpacity>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Name</Text>
                    <Field style={styles.input} name="name" placeholder="eg. Naseebullah Ahmadi" component={this.renderInput}/>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Bio</Text>
                    <Field style={[styles.input, {height: 100, textAlignVertical: "top"}]} multiline={true} name="bio" placeholder="your Text" component={this.renderInput}/>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Address</Text>
                    <Field style={styles.input} name="address" placeholder="eg. 123 Wallstreet" component={this.renderInput}/>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Profession</Text>
                    <Field style={styles.input} name="profession" placeholder="eg. Frontend Developer" component={this.renderInput}/>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>@Contact Number</Text>
                    <Field style={styles.input} name="contactNumber" placeholder="eg. 07473693312" component={this.renderInput}/>
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
                    <Field style={styles.input} name="gender" placeholder="eg. male/female" component={this.renderInput}/>
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
    const {Doctors = null, Patients = null} = User;
    const user = (Doctors || Patients) ? Object.keys(Doctors || Patients) : null;
    return (
      <View style={styles.box}>
        <View>
          <Text style={styles.boxTitle}>
            {user ? user.length : 0} {this.applyLetterSpacing("Connections").toUpperCase()}</Text>
        </View>
        <View style={[styles.socialIcons, {flexWrap: 'wrap'}]}>
          {
            user ? user.map((uid, i) => {
              if (i <= 3) {
                const $user = (Doctors && Doctors[uid]) || (Patients && Patients[uid]);
                return (
                  <View style={styles.connection} key={i}>
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
              } else if (!this.state.viewMoreBtn) {
                const $user = (Doctors && Doctors[uid]) || (Patients && Patients[uid]);
                return (
                  <View style={styles.connection} key={i}>
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
            }): <Text>No Connections</Text>
          }
        </View>
        {
          user && user.length >= 3 ? (
            <View>
              <TouchableOpacity
                style={{alignSelf: 'center', margin: 10, padding: 10, backgroundColor: '#6482e6', borderRadius: 300, elevation: 2}}
                onPress={() => this.setState({viewMoreBtn: !this.state.viewMoreBtn})}
              >
                <Feather name={this.state.viewMoreBtn ? "plus" : "minus"} size={15} color={"white"} />
              </TouchableOpacity>

            </View>
          ): null
        }
      </View>
    )
  };

  $ECG = (ecg, type) => {
    return (
      <View style={[styles.box, {padding: 0, marginBottom: 10}]}>
        {ecg && type === "Patient"  ? (
          <View>
            <View>
              <View style={{padding: 30, paddingBottom: 0}}>
                <Text style={styles.boxTitle}>{this.applyLetterSpacing("Electrocardiograph").toUpperCase()}</Text>
              </View>

              <View>
                <Text style={{fontSize: 50, color: '#7D8292', textAlign: 'center'}}><Text style={{color: '#d0d4db'}}>0</Text>59
                </Text>
                <Text style={{fontSize: 15, color: '#e0e1e8', textAlign: 'center'}}>b e a t s   p e r   m i n u t e</Text>

              </View>
              <ECG height={130} width={Dimensions.get('window').width - 10}/>
            </View>
            <View style={{paddingBottom: 0}}>

              <View style={{paddingLeft: 0, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                <View style={{margin: 0}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Feather name={"activity"} size={18} color="#aab8be" style={{paddingLeft: 20}} />
                    <Text style={{fontSize: 17, color: '#aab8be', textAlign: 'center', paddingLeft: 10}}>Electrocardiograph</Text>
                  </View>
                  <View style={[styles.healthContainer, styles.infoSection, {padding: 0, paddingTop: 15, paddingBottom: 25}]}>
                    <Chart type={"day"} height={160} width={(Dimensions.get('window').width)} config={this.config()} component={"Statistics"}/>
                  </View>
                </View>
                <View style={{margin: 0}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Feather name={"heart"} size={18} color="#aab8be" style={{paddingLeft: 20}} />
                    <Text style={{fontSize: 17, color: '#aab8be', textAlign: 'center', paddingLeft: 10}}>Heart Sound</Text>
                  </View>
                  <View style={[styles.healthContainer, styles.infoSection, {padding: 0, paddingTop: 15, paddingBottom: 25}]}>
                    <Chart type={"day"} height={160} width={(Dimensions.get('window').width)} config={this.config()} component={"Statistics"}/>
                  </View>
                </View>
              </View>

            </View>
          </View>
        ): <Text>No ECG yet</Text>}
      </View>
    )
  };

  $Health = (health, type) => {
    return (
      <View style={[styles.box, {padding: 10, marginBottom: 10}]}>
        {health && type === "Patient" ? (
          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>

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
        ): <Text>No Health</Text>}
      </View>
    )
  };

  render() {
    const
      { User, ECG, Health } = this.state;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {User ? (
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingBottom: 0, paddingTop: 0}}>
            <View>
              <View style={styles.imageContainer}>
                <View style={[styles.imgCircleContainer, !Images[User.uid] ? {elevation: 1}: null ]}>
                  {Images[User.uid] ? (
                    <Image style={styles.userImg} source={Images[User.uid]} resizeMode="contain"/>
                  ): <Feather name={"user"} size={20} color={"#bccad0"} />}
                  <View style={[styles.imgOverlay, !Images[User.uid] ? { backgroundColor: 'white', opacity: 0  } : null ]} />
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <TouchableOpacity
                  onPress={() => {this.props.navigation.navigate('FooDrawerOpen')}}
                  style={{position: 'relative', backgroundColor: 'white', borderRadius: 300, padding: 15, elevation: 1}}>
                  <View style={{position: 'relative'}}>
                    <Feather name={"message-square"} size={17} color="#bccad0"/>
                    <View style={styles.notificationDot} />
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={{marginLeft: 25}} onPress={() => this.signOutUser()}>
                <Text style={{color: '#a1a2a7', fontWeight: 'bold', fontSize: 10}}>L O G O U T</Text>
              </TouchableOpacity>
            </View>
          </View>
        ): null}
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
          <View style={[styles.middleContainer, {width: this.state.width <= 412 ? '95%' : 550}]}>

            {User ? this.about(User) : null}

            {User ? this.connections(User) : null}

            {User && User.type === "Patient" ? this.$ECG(ECG, User.type) : null}

            {User && User.type === "Patient" ? this.$Health(Health, User.type) : null}
          </View>
        </View>
      </ScrollView>
    )
    // {User ? this.topContainer(User) : null}
    // return (
    //   <View style={styles.container}>
    //     <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingBottom: 0, paddingTop: 0, marginBottom: 10}}>
    //       <View>
    //         <View style={styles.imageContainer}>
    //           <View style={styles.imgCircleContainer}>
    //             <Image style={styles.userImg} source={Images[User ? User.uid: ""]} resizeMode="contain"/>
    //             <View style={styles.imgOverlay} />
    //           </View>
    //         </View>
    //       </View>
    //
    //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //         <View>
    //           <TouchableOpacity
    //             onPress={() => {this.props.navigation.navigate('FooDrawerOpen')}}
    //             style={{position: 'relative', backgroundColor: 'white', borderRadius: 300, padding: 15, elevation: 1}}>
    //             <View style={{position: 'relative'}}>
    //               <Feather name={"message-square"} size={17} color="#bccad0"/>
    //               <View style={styles.notificationDot} />
    //             </View>
    //           </TouchableOpacity>
    //         </View>
    //
    //         <TouchableOpacity style={{marginLeft: 25}} onPress={() => this.signOutUser()}>
    //           <Text style={{color: '#a1a2a7', fontWeight: 'bold', fontSize: 10}}>L O G O U T</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //
    //     <ScrollView showsVerticalScrollIndicator={false}>
    //       <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
    //         <View style={[styles.middleContainer, {width: this.state.width <= 412 ? '95%' : 550}]}>
    //
    //           {User ? this.about(User) : null}
    //
    //         </View>
    //       </View>
    //     </ScrollView>
    //   </View>
    // );
  }
}

/*
            {loggedInUser ? this.connections(loggedInUser) : null}

            {loggedInUser && ECG ? this.$ECG(ECG) : null}

            {loggedInUser && Health ? this.$Health(Health) : null}
 */

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
  middleContainer: {
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center'
  },
  notificationDot: {
    position: 'absolute',
    right: -2,
    top: -4,
    width: 12,
    height: 12,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 100/2,
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
    // borderColor: 'white',
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
    // marginBottom: 20,
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
    // alignSelf: 'stretch',
    // width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(188,202,208, 0.15)',
    marginTop: 10,
    borderRadius: 5
  }
});
