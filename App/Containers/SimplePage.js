import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ECG from "./ECG";
import HeartBeat from "../Components/HeartBeat";
import Statistics from "./Statistics";
import ListOfUsers from "./ListOfUsers";
import UserInfo from "./UserInfo";


export default class SimplePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.View = this.View.bind(this);
  }

  componentDidMount() {
    this.View();
  }

  View = () => {

  };

  Patient = () => {
    let toReturn = null;
    let index = this.props.state.index;

    if (this.props.type === "Patient") {
      if (index === 0) {
        toReturn = (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <HeartBeat/>
            <ECG height={230} width={380}/>
          </View>
        );
      } else if (index === 1) {
        toReturn = (<Statistics/>);
      } else if (index === 2) {
        toReturn = (<ListOfUsers updateIndex={this.props.updateIndex} userView={this.props.userView} type={this.props.type}/>)

      } else if (index === 3) {
        toReturn = (<UserInfo User={this.props.activeUser}/>)
      }
    }

    return toReturn;
  };

  Doctor = () => {
    let toReturn = null;
    let index = this.props.state.index;
    if (this.props.type === "Doctor") {
      if (index === 0) {
        toReturn = (
          <ListOfUsers
            updateIndex = {this.props.updateIndex}
            userView    = {this.props.userView}
            type        = {this.props.type}
          />
        );
      } else if (index === 1) {
        toReturn = (
          <UserInfo
            User={this.props.activeUser}
          />
        );
      }
    }

    return toReturn;
    //
    //
    //
    // switch (this.props.state.index) {
    //   case 0:
    //     return (
    //       <ListOfUsers
    //         updateIndex = {this.props.updateIndex}
    //         userView    = {this.props.userView}
    //       />
    //     );
    //
    //   case 1:
    //     return (
    //       <UserInfo
    //         User={this.props.activeUser}
    //       />
    //     );
    //
    //   default: return(null);
    // }
  };

  render() {
    return (
      <View style={styles.page}>
        {
          this.props.type === "Patient" ? this.Patient() : this.Doctor()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  }
});
