import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Statistics from "./Statistics";
import ListOfUsers from "./ListOfUsers";
import UserInfo from "./UserInfo";
import PatientMainScreen from "./PatientMainScreen";
import slayer from 'slayer';

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

  View = (navigation, authUserUID, authUserType, index, updateIndex, userView, activeUser, disableSwipe) => {
    if (!this._isMounted) return;
    let toReturn = null;

    if ((authUserType === "Patient" && index === 3) || (authUserType === "Doctor" && index === 2))
      toReturn = <PatientMainScreen authUserUID={authUserUID} authUserType={authUserType} navigation={navigation} />;

    if (authUserType === "Patient" && index === 2) toReturn = <Statistics />;

    if (index === 0) toReturn = (<ListOfUsers authUserType={authUserType} authUserUID={authUserUID} updateIndex={updateIndex} userView={userView}/>);

    if ((authUserType === "Patient" && index === 1) || (authUserType === "Doctor" && index === 1)  )
      toReturn = (<UserInfo index={index} User={activeUser} authUserUID={authUserUID} authUserType={authUserType} disableSwipe={disableSwipe} />);

    return toReturn;
  };

  render() {
    const {
      navigation, authUserUID, authUserType,
      index, updateIndex, userView, activeUser, disableSwipe
    } = this.props;
    return (
      <View style={styles.page}>{
        this.View (
          navigation,
          authUserUID,
          authUserType,
          index,
          updateIndex,
          userView,
          activeUser,
          disableSwipe
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
