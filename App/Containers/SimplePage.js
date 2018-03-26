import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Statistics from "./Statistics";
import ListOfUsers from "./ListOfUsers";
import UserInfo from "./UserInfo";
import PatientMainScreen from "./PatientMainScreen";

export default class SimplePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.View = this.View.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  View = (navigation, authUserUID, authUserType, index, updateIndex, userView, activeUser, disableSwipe, activeTitle) => {
    if (!this._isMounted) return;
    let toReturn = null;

    if ((authUserType === "Patient" && index === 3) || (authUserType === "Doctor" && index === 2))
      toReturn = <PatientMainScreen authUserUID={authUserUID} authUserType={authUserType} navigation={navigation} />;

    if (authUserType === "Patient" && index === 2) toReturn = <Statistics />;

    if (index === 0) toReturn = (<ListOfUsers updateIndex={updateIndex} activeTitle={activeTitle} userView={userView}/>);

    if ((authUserType === "Patient" && index === 1) || (authUserType === "Doctor" && index === 1)  )
      toReturn = (<UserInfo index={index} User={activeUser} authUserUID={authUserUID} authUserType={authUserType} disableSwipe={disableSwipe} />);

    return toReturn;
  };

  render() {
    return (
      <View style={styles.page}>{
        this.View (
          this.props.navigation,
          this.props.authUserUID,
          this.props.authUserType,
          this.props.index,
          this.props.updateIndex,
          this.props.userView,
          this.props.activeUser,
          this.props.disableSwipe,
          this.props.activeTitle
        )
      }</View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fafafa',
  }
});
