import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TouchableHighlight, Image, Dimensions, ScrollView} from "react-native";
import Ionicons from "react-native-vector-icons/Feather";
import Svg, { Line, G, Path } from 'react-native-svg';
import _ from 'lodash';
import firebase from 'react-native-firebase';
import Database from '../Components/Database'
import User from '../Components/User';

export default class Cardiologists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User    : null,
      doctors : null
    };

    this.usersRef = firebase.app().database().ref('/Users');
    this.fetchDoctors = this.fetchDoctors.bind(this);
  }

  componentDidMount() {
    this.fetchDoctors(this.usersRef);
  }

  fetchDoctors = (userRef) => {
    User().then(user => {
      userRef.on('value', (snap) => {
        if (snap.val()) this.setState({
          type        : snap.val()[user.uid].type,
          name        : snap.val()[user.uid].name,
          healthAlert : _.has(snap.val()[user.uid], "healthAlrt") ? snap.val()[user.uid].healthAlert : "",
          doctors : JSON.parse(JSON.stringify(snap.val()), (k, v) => !v.type || (
            v.type === 'Doctor' && (_.has(snap.val()[user.uid], "Doctors") ? !_.has(snap.val()[user.uid].Doctors, k) : true )
          ) ? v : void 0)
        }, () => {})
      })
    });
  };

  doctors = () => {
    return this.state.doctors ? (
      Object.keys(this.state.doctors).map((uid, i) => {
        return (
          <View style={styles.doctorContainer} key={uid}>
            <View style={styles.imgCircleContainer}>
              <View>
                <Image style={styles.userImg} source={require('../Images/Naseebullah.jpg')} resizeMode="contain"/>
                <View style={styles.imgOverlay} />
              </View>
            </View>

            <View>
              <Text style={{textAlign: 'center', fontSize: 15, color: '#bccad0'}}>{this.state.doctors[uid].name}</Text>
              <Text style={{textAlign: 'center', fontSize: 12, color: 'rgba(188, 202, 208, 0.7)'}}>{this.state.doctors[uid].profession}</Text>
            </View>

            <TouchableOpacity style={styles.folllowBtn} onPress={() => Database.followDoctor(
              this.state.doctors[uid].name, this.state.doctors[uid].profession, uid,
              this.state.type, this.state.healthAlert
            )}>
              <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>Follow</Text>
            </TouchableOpacity>

          </View>
        )
      })
    ): null;
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topSection}>
          <View style={styles.navigationBar}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('DrawerOpen')} activeOpacity={1.0} underlayColor="rgba(253,138,94,0)">
              <Svg height="24" width="24">
                <Line fill="none" stroke="#dfe0e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="3" y1="12" x2="21" y2="12"/>
                <Line fill="none" stroke="#dfe0e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="10.208" y1="6" x2="21" y2="6"/>
                <Line fill="none" stroke="#dfe0e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="3" y1="18" x2="13.791" y2="18"/>
              </Svg>
            </TouchableHighlight>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f8f9'}}>

            {this.doctors()}

          </View>
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f7f8f9',
    justifyContent: 'flex-start',
  },
  topSection: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding:10,
    position: 'relative',
    elevation: 0.2
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 10,
  },
  doctorContainer: {
    padding: 10,
    paddingTop: 40,
    paddingBottom: 20,
    width: 300,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgCircleContainer: {
    position: 'relative',
    borderRadius: 80,
    height: 70,
    width: 70,
    borderColor: 'white',
    backgroundColor: 'white',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 10,
    justifyContent: 'center',
    marginBottom: 10
  },
  userImg: {
    borderRadius: 300,
    height: 70,
    width: 70,
  },
  imgOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(247, 248, 249, 0.7)',
    opacity: 0.5,
    borderRadius: 300,
    height: 70,
    width: 70,
  },
  folllowBtn: {
    marginTop: 10,
    backgroundColor: '#2fcc71',
    width: 100,
    padding: 5,
    borderRadius: 5,
    elevation: 3,
  }
});
