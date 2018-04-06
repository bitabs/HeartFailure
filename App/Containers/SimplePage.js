import React, {Component} from 'react'

// predefined components of react
import { View } from 'react-native'

// the component for history representation
import Statistics from "./Statistics"

// lists the users
import ListOfUsers from "./ListOfUsers"

// for each user listed, we use this component for their info
import UserInfo from "./UserInfo"

// This is the profile component of each user
import PatientMainScreen from "./PatientMainScreen"

// importing styles for this component
import styles from './Styles/SimplePageStyles'

/**
 * This component is a sub container holding the entire
 * application logic. It will determine which component to show
 * based on the index of the tab
 * ==============================================================
 */
export default class SimplePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // This method does the condition to show the component
    this.View = this.View.bind(this);
  }

  /**
   * We need the index of the tab from <LaunchScreen /> to do the
   * condition. So we're going to need the props of this component
   * which was used to pass in the index. This is the child
   * component from <LaunchScreen />
   * ==============================================================
   * @param props
   * @return {*}
   * @constructor
   */
  View = props => {

    // These are the props passed from root component (<LaunchScreen />)
    let {
      navigation  , authUserType, index,
      updateIndex , userView    , activeUser,
      activeTitle
    } = props, toReturn = null;

    // local variable if the current user is patient
    let isPatient = authUserType === "Patient";

    /**
     * Show <PatientMainScreen /> if the user is patient on tab 3,
     * or tab 2 if its a doctor
     */
    if ((isPatient && index === 3) || (!isPatient && index === 2))
      toReturn = (
        <PatientMainScreen navigation = {navigation}/>
      );

    /**
     * If the user is of type patient, then show this component on tab 2
     */
    if (isPatient && index === 2) toReturn = <Statistics />;

    /**
     * Both users will have <ListOfUsers /> as their main component on tab 0
     */
    if (index === 0)
      toReturn = (
        <ListOfUsers
          updateIndex = {updateIndex}
          activeTitle = {activeTitle}
          userView    = {userView}/>
      );

    /**
     * Show <UserInfo /> on tab 1 for both users
     */
    if ((isPatient && index === 1) || (!isPatient && index === 1))
      toReturn = <UserInfo User={activeUser} />;

    return toReturn;
  };

  /**
   * When the component is ready, its time to show it to the user
   * @return {XML}
   */
  render() {
    const {
      navigation  , authUserType, index,
      updateIndex , userView    , activeUser,
      activeTitle
    } = this.props;
    return (
      <View style={styles.page}>{
        this.View ({
          navigation  , authUserType, index,
          updateIndex , userView    , activeUser,
          activeTitle
        })
      }</View>
    );
  }
}
