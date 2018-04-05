import React, {PureComponent} from 'react'

// Predefined components of React
import {View, ScrollView, TouchableOpacity} from "react-native"

// strict data types for component props
import PropTypes from 'prop-types'

// lodash for algorithm efficiency
import _ from 'lodash'

// fireabse database package
import firebase from 'react-native-firebase'

// Icons package
import Feather from "react-native-vector-icons/Feather"

// To display each user and their corresponding info
import UserBox from "./UserBox"

// Component with common DB query operations
import Database from '../Components/Database'

// TO acquire authenticated user info like UID of the current user
import User from '../Components/User'

// importing styles for this component
import styles from './Styles/ListOfUsersStyles'

/**
 * This component will filter the users object and pass the data
 * to <UserBox /> for visualisation
 * ==============================================================
 */
export default class ListOfUsers extends PureComponent {
  constructor(props) {
    super(props);


    this.state = {
      Users         : null, authUserUID : null,
      authUserType  : null, switchViews : false,
      filteredUsers : null, health      : null,
      ECG: null, iWantThisUsers: this.props.authUserType  === "Doctor"
        ? "Patient"
        : "Doctor",
      defaultHealth: {
        height    : 0, weight      : 0,
        age       : 0, fat         : 0,
        allergies : 0, bpm         : 0,
        calories  : 0, thermometer : 0,
        healthAlert : null
      }
    };

    // Users table from firebase
    this.userRef = firebase.app().database().ref(`/Users/`);

    // health table from firebase
    this.healthRef  = firebase.app().database().ref(`/Health/`);

    // ECG table from firebase
    this.ecgRef     = firebase.app().database().ref(`/ECG/`);

    // the method will fetch the data from above tables
    this.fetchAsyncData = this.fetchAsyncData.bind(this);

    // the method that will pass the first data set to <UserInfo />
    this.setDefaultUser = this.setDefaultUser.bind(this);

    // Get list of users that have no link with the current user
    this.fetchUsersFromNetwork = this.fetchUsersFromNetwork.bind(this);

    // set the uid and type of the user in state obj
    this.setCurrentUserUidAndType = this.setCurrentUserUidAndType.bind(this);

    // add the user to the database
    this.addUser = this.addUser.bind(this);

    // once added, update the dashboard
    this.updateDashBoard = this.updateDashBoard.bind(this);
  }

  /**
   * Let other methods know that the component has mounted,
   * so that they can use this.setState({})
   * ==============================================================
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Once the component has mounted, invoke all the methods
   * ==============================================================
   */
  componentDidMount() {
    // first terminate if the component has not been mounted
    this._isMounted = true;

    // initiate the fetching of the data
    this.fetchAsyncData(this.healthRef, this.ecgRef);

    // first let us wait for the data of authenticated user to return
    User().then(authUser => {

      // then add a listener for user table
      this.userRef.on('value', snap => {
        if (snap.val() && this._isMounted) {

          // the component requires the current user's uid and its type
          this.setCurrentUserUidAndType(snap.val(), authUser);

          let { authUserUID, authUserType } = this.state;

          // add a listener that will listen to any new users being added
          this.userRef.endAt().limitToLast().child(`${authUserUID}/Patients`)
            .on('child_added', childSnap => {

              // first check if the component is still mounted before adding
              if (this._isMounted) this.addUser(snap.val(), childSnap);

              // Once the user has been added, update the database now
              authUserType === "Doctor"
                ? this.updateDashBoard (
                  authUserUID, childSnap.key, snap.val()[childSnap.key]
                ): null
            });

          // add a listener that will listen to any new users being added
          this.userRef.endAt().limitToLast().child(`${authUserUID}/Doctors` )
            .on('child_added', childSnap => {

              // first check if the component is still mounted before adding
              if (this._isMounted) this.addUser(snap.val(), childSnap);

              // Once the user has been added, update the database now
              authUserType === "Patient"
                ? this.updateDashBoard (
                  childSnap.key, authUserUID, snap.val()[authUserUID]
                ): null;
            });

          const isDoctor = authUserType === "Doctor";

          // The second parameter will filter users based on their type
          if (isDoctor)
            this.fetchUsersFromNetwork(snap.val(), "Patient");
          else
            this.fetchUsersFromNetwork(snap.val(), "Doctor");
        }
      })
    });
  }

  /**
   * When a user is followed, we need to push that user into the
   * current user's object. By following users form UI side, we
   * also need to update the database.
   * ==============================================================
   * @param keyFrom
   * @param keyTo
   * @param data
   */
  updateDashBoard = (keyFrom, keyTo, data) => Database.updateDashBoard (
    keyFrom, keyTo, data
  );

  /**
   * To add a user, we need to push it into our state obj, so that
   * it hides from not followed page to following page.
   * ==============================================================
   * @param snapVal
   * @param childSnap
   */
  addUser = (snapVal, childSnap) => this.setState(prevState => ({
    Users: {
      ...prevState.Users, [childSnap.key]: {
        ...snapVal[childSnap.key]
      }
    }
  }), () => this.setDefaultUser());

  /**
   * Get the current user's uid and type
   * ==============================================================
   * @param snaVal
   * @param authUser
   */
  setCurrentUserUidAndType = (snaVal, authUser) => this.setState({
    authUserUID  : authUser.uid,
    authUserType : snaVal[authUser.uid]
      ? snaVal[authUser.uid].type
      : null
  });

  /**
   * Will add listener and wait for the value from the firebase
   * reference to return. These values are the actual content
   * from the database
   * ==============================================================
   * @param healthRef
   * @param ecgRef
   */
  fetchAsyncData = (healthRef, ecgRef) => {

    // listener attached to listen to any new data for health
    healthRef.on('value', snap => {
      if (snap.val() && this._isMounted) this.setState({
        health: snap.val()
      })
    });

    // listener attached to listen to any new data for ecg
    ecgRef.on('value', snap => {
      if (snap.val() && this._isMounted) this.setState({
        ECG: snap.val()
      });
    })
  };

  /**
   * When data has been received, we need to first immediately
   * pass the first data to <UsersInfo /> for viewing
   * ==============================================================
   */
  setDefaultUser = () => {
    // get Users Obj, and the function from <LaunchScreen />
    const { Users } = this.state, { userView } = this.props;
    if (Users && this._isMounted) userView({
      uid: Object.keys(Users)[0],
      ...Object.values(Users)[0]
    })
  };

  /**
   * Look for users in the userTable that does not exists in the
   * ("Patients" || "Doctors") of the current user's object
   * ==============================================================
   * @param data
   * @param attribute
   */
  fetchUsersFromNetwork = (data, attribute) => {
    const attributes = `${attribute}s`;

    // first make sure the component is mounted
    if (this._isMounted) {

      // get the uid of the current user
      let { authUserUID } = this.state;

      /**
       * First serialise the object for performance.
       * Once serialised, loop through the users object, and check their
       * type. If their type matches with the "attribute" parameter, and
       * the current user has ("Patients" || "Doctors") obj. Then, during
       * the iteration, if the user does not exist in the user's obj, get
       * that!
       */
      this.setState({filteredUsers:
        JSON.parse(JSON.stringify(data), (k, v) => !v.type || (
          v.type === attribute && (_.has(data[authUserUID], attributes)
              ? !_.has(data[authUserUID][attributes], k)
              : true
          )
        )
          ? v
          : void 0)
      });
    }
  };

  /**
   * This is used to change the page from viewing following users
   * to users that have not been followed
   * ==============================================================
   * @param value
   */
  switchToggle = value => this._isMounted
    ? this.setState({switchViews: value})
    : null;

  users = (Users = null, toFollow, opositeTable) => Object.keys(Users).map(uid => {
    const
      {authUserType, authUserUID, ECG, health, defaultHealth} = this.state,
      {updateIndex, userView} = this.props,
      user = Users[uid]
    ;
    return (
      <UserBox
        uid           = {uid}
        authUserUID   = {authUserUID}
        opositeTable  = {opositeTable}
        type          = {authUserType}
        User          = {user}
        toFollow      = {toFollow}
        updateIndex   = {updateIndex}
        userView      = {userView}
        health        = {toFollow ? defaultHealth : (health[uid] || defaultHealth) }
        ECG           = {toFollow ? null : (ECG[uid] || {}) }
        key           = {uid}
      />
    )
  });

  /**
   * Once the component has been mounted, proceed with rendering
   * of the ui for the user
   * ==============================================================
   * @return {XML}
   */
  render() {
    const
      {Users = null, switchViews, filteredUsers, authUserType, health, ECG} = this.state,
      isDoctor = authUserType === "Doctor";

    const headerTitle = isDoctor
      ? "Patients"
      : "Doctors";

    return (
      <View style={styles.page}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
        >
          {Users && health && ECG && !switchViews ? (
            <View>
              {this.users(Users, false, headerTitle)}
            </View>
          ): switchViews ? (
              <View>
                {this.users(filteredUsers, true, headerTitle)}
              </View>
            ): !Users ? (
            <View style={[styles.page, styles.overridePage]}>
              <Feather name="activity" size={33} color="#8F9CAE"/>
            </View>
          ) : null}
        </ScrollView>

        <TouchableOpacity style={[styles.stickyBtn, {
          backgroundColor: !switchViews
            ? "#6482e6"
            : "#E67D8F"
        }]} activeOpacity={1} onPress={() => {
          this.switchToggle(!switchViews);
          this.props.activeTitle(isDoctor
            ? (!switchViews
              ? "Patients"
              : "My Patients"
            )
            : switchViews
              ? "My Doctors"
              : "Doctors"
          )
        }}>
          <Feather
            name={!switchViews
              ? "users"
              : "arrow-left"
            }
            size={20}
            color={"white"}/>
        </TouchableOpacity>
      </View>
    );
  }
}

ListOfUsers.propTypes = {
  updateIndex: PropTypes.func.isRequired
};
