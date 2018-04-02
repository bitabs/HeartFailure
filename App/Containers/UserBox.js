import React, {PureComponent} from 'react'

// predefined react components
import {View, Text, Image, TouchableOpacity} from "react-native"

// chart component to visualise ECG & heart sound
import Chart from "./Chart"

// used to defined strict types for props
import PropTypes from 'prop-types'

// Static images object of the users images
import {Images} from './PreLoadImages'

// Static database class consisting of common DB queries
import Database from '../Components/Database'

// import Feather icons package
import Feather from 'react-native-vector-icons/Feather'

// import Ionicons icons package
import Ionicons from 'react-native-vector-icons/Ionicons'

// svg package supported in React. Mostly used for svg inline
import Svg, {Polygon, Circle, Path} from 'react-native-svg'

// styles of this component
import styles from './Styles/UserBoxStyles'

/**
 * This component is used to display the user's details in
 * summary format in ListOfUsers Component.
 * ==============================================================
 */
export default class UserBox extends PureComponent {

  /**
   * It extends PureComponent instead of component for performance
   * reasons. It ensures that it doesn't always renders. And only
   * renders when the state has been changed.
   * ==============================================================
   * @param props
   */
  constructor(props) {
    super(props);

    // state object of this component that holds information
    this.state = {
      // the user that is passed to the props from ListOfUsers.js
      User        : this.props.User,
      // health object with default values.
      health      : {
        height    : 0, weight      : 0,
        age       : 0, fat         : 0,
        allergies : 0, bpm         : 0,
        calories  : 0, thermometer : 0,
        healthAlert : null
      },
      ECG           : null,
      randomFav     : null,
      randomWatch   : null,
      totalMessages : null,
      Users         : null,
      wait          : true,
      star          : "9,4.958 10.313,7.618 " +
      "13.25,8.048 11.125,10.119 11.627,13.042 " +
      "9,11.66 6.374,13.042 6.875,10.119 " +
      "4.75,8.048 7.688,7.618"
    };
  }

  /**
   * This method is called when the component is about to unmount
   * ==============================================================
   */
  componentWillUnmount() {
    // make sure to falsify this so that this.setState cannot be used
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    // if _isMounted is false, then terminate immediately
    if (!this._isMounted) return;

    // otherwise update the state obj =
    this.setState({
      randomFav: this.getRandomInt(0, 4),
      randomWatch: this.getRandomInt(0, 500)
    });
  }

  /**
   * This method returns an object with the correct format that is
   * then passed to highcharts.js to <chart /> component
   * ==============================================================
   * @return config Obj
   */
  config = () => {
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
          if ($this.props.ECG)
            return $this.props.ECG;
        }()),
        pointStart: Date.now() - 10 * 100,
        pointInterval: 10,
      }]
    }
  };

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  /**
   * This method is called to change the index (i.e. to navigate to
   * navigate to another tab without sliding; and pass this user,
   * which will be used in <UserInfo /> component
   * ==============================================================
   * @param user
   */
  update = user => {
    if (!this._isMounted) return;

    // This method calls setState in <LaunchScreen />, so check if _isMounted
    this.props.updateIndex(this.props.type);
    this.props.userView(user);
  };

  /**
   * This method creates stars object in horizontal format. It
   * depicts the rating mechanism of the user
   * ==============================================================
   * @return {XML}
   */
  stars = () => {
    if (!this._isMounted) return;
    return (
      <View style={{marginTop: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.starsRatingValue}>{this.state.randomFav}.00</Text>
          {[1, 2, 3, 4, 5].map((e, i) => {
            return (
              <Svg height="15" width="15" key={i}>
                <Polygon
                  fill={i < this.state.randomFav ? "#E67D8F" : '#f1f1f1'}
                  stroke={i < this.state.randomFav ? "#E67D8F" : '#f1f1f1'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={this.state.star}
                />
              </Svg>
            )
          })}
        </View>
      </View>
    )
  };

  /**
   * This method will create a stack container containing user's
   * pictures.
   * ==============================================================
   * @param User
   * @return {XML}
   */
  stackedUsers = User => {
    // terminate if the component is unmounted
    if (!this._isMounted) return;

    // pre check to make sure that user is occupied with values
    let user = User && (User.Patients || User.Doctors);

    // fetch the health object from this components props
    const { health } = this.props;

    // loop through the users object and call the image
    const Users = User && user ? Object.keys(user).map((uid, i) => {
      if (i < 3) return (
        <View style={[
          styles.imgCircleContainer, {
          position: 'absolute', left: i * 17
        }]} key={i}>
          {Images[uid] ? (
            <Image
              style={styles.stackedUsersImage}
              source={Images[uid]}
              resizeMode="contain"
            />
          ): (
            <View style={styles.stackedUsersUserIcon}>
              <Feather name={"user"} size={15} color={"white"}/>
            </View>
          )}
        </View>
      )
    }): null;

    const more = Users && Object.keys(Users).length > 3;
    return (
      <View style={styles.stackedUsersMainContainer}>
        {Users ? (<View style={styles.stackedUsersMainInnerContainer}>
          <View style={styles.stackedUsersMainInnerInnerContainer}>
            <View style={{position: 'relative'}}>{Users}</View>
            {more ? (
              <View style={[styles.imgCircleContainer, styles.imgCircleContainerOverride]}>
                <View style={styles.usersMoreContainer}>
                  <Text style={styles.plusTxt}>+{Object.keys(Users).length - 3}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>) : null}
        {User.type === "Patient" && health ? (
          <View>
            <Text style={[styles.healthTag, {
              backgroundColor: this.tagColor(health.healthAlert)
            }]}>{health.healthAlert}</Text>
          </View>
        ) : null}
      </View>
    );
  };

  /**
   * This method creates a container within the box showing the
   * general information about the user like: their image, name,
   * profession and address.
   * ==============================================================
   * @param name
   * @param profession
   * @param address
   * @return {XML}
   * @constructor
   */
  UsersGeneralDetails = (name, profession, address) => {
    // terminate if the component is not mounted
    if (!this._isMounted) return;

    return (
      <View style={styles.generalDetailsView}>
        <View style={styles.nameAndProfession}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.profession}>{profession || "Not Specified"}</Text>
        </View>
        <View style={styles.address}>
          <Feather style={styles.addressIcon} name="map-pin" size={10} color="#909aae"/>
          <Text numberOfLines={1} style={styles.addressTxt}>{address || "Not Specified"}</Text>
        </View>
      </View>
    )
  };

  /**
   * This method will visualise the ECG in line graph. It calls the
   * config object obtained from this.config()
   * ==============================================================
   * @param User
   * @return {*}
   * @constructor
   */
  ECG = User => {
    // terminate if the component is not mounted
    if (!this._isMounted) return;

    // fetch the ECG data points from props
    const {ECG} = this.props;

    // show the ECG data visualisation
    return (
      User.type === "Patient" ? (
        <View style={styles.ECGView}>
          {ECG ? (
            <Chart
              type  ={"day"}  height={100}
              width ={"100%"} config={this.config()}
            />
          ): (
            <View style={styles.ECG404}>
              <Text style={styles.ECG404Txt}>No ECG data found</Text>
            </View>
          )}
        </View>
      ) : null
    )
  };

  /**
   * This method will return the color pallet based on the health
   * alert obtained from database
   * ==============================================================
   * @param healthAlert
   * @return {*}
   */
  tagColor = healthAlert => {
    if (healthAlert === "Stable")
      return "#44C8A6";
    else if (healthAlert === "Average")
      return "#FB8469";
    else if (healthAlert === "High")
      return "#E67D8F";
    else
      return 'white'
  };

  /**
   * This method will show the image of the user and provide
   * general health information of the user on the left side of the
   * box
   * ==============================================================
   * @param User
   * @param uid
   * @return {XML}
   * @constructor
   */
  UserLeftSection = (User, uid) => {

    // fetch the health details from the props and pre-compute the tag color
    const
      { health } = this.props,
      tagColor = this.tagColor(
        User.type === "Patient" && health
          ? health.healthAlert
          : null
      );

    // Create the left side and return it
    return (
      <View style={styles.leftContainer}>

        <View style={{marginBottom: 20}}>

          <View style={[styles.imgRound, {
            backgroundColor: !Images[uid] ? "#E67D8F" : tagColor
          }]}>{Images[uid] ? (
            <View>
              <Image style={styles.userImg} source={Images[uid]} resizeMode="contain"/>
              <View style={styles.imgOverlay}/>
            </View>
          ):<Feather name={"user"} size={40} color={"white"}/>
          }</View>
          <View style={styles.verified}>
            <Feather style={styles.Nine} name="check" size={15} color="white"/>
          </View>
        </View>

        {User && User.type === "Patient" ? (
          <View style={{width: '100%'}}>
            <View style={{alignSelf: 'center'}}>
              <Svg
                width="31.463"
                height="31.463"
                viewBox="0 0 31.463 31.463"
              ><Circle
                fill={"rgba(144, 154, 174, 0.5)"}
                cx="15.698" cy="2.644" r="2.644"
              /><Path
                fill={'rgba(144, 154, 174, 0.5)'}
                d="M21.396,8.791c0,0,0.148-2.953-2.968-2.953h-5.403c-3.005,
                  0-2.983,2.727-2.985,2.953l0.001,8.38c0.049,0.452,0.495,
                  0.967,1.049,0.967c0.551,0,0.956-0.499,1.006-0.952l0.938,
                  13.346c0.069,0.679,0.549,0.932,1.139,0.932c0.589,0,1.068-0.253,
                  1.137-0.932h0.833c0.072,0.679,0.55,0.932,1.137,0.932c0.591,0,
                  1.07-0.253,1.141-0.932l0.966-13.354c0,0.453,0.438,0.963,0.992,
                  0.963c0.552,0,0.993-0.517,1.042-0.969L21.396,8.791z"
              /></Svg>
            </View>
            <View style={{marginTop: 10}}>
              <View
                style={styles.leftHealthInfo}>
                <Text style={styles.leftHealthFont}>{health.height}cm</Text>
                <Text style={styles.leftHealthTitle}>Height</Text>
              </View>
              <View
                style={styles.leftHealthInfo}>
                <Text style={styles.leftHealthFont}>{health.weight}cm</Text>
                <Text style={styles.leftHealthTitle}>Weight</Text>
              </View>
              <View
                style={styles.leftHealthInfo}>
                <Text style={styles.leftHealthFont}>{health.age}</Text>
                <Text style={styles.leftHealthTitle}>Age</Text>
              </View>
              <View
                style={styles.leftHealthInfo}>
                <Text style={styles.leftHealthFont}>{health.fat}%</Text>
                <Text style={styles.leftHealthTitle}>Fat</Text>
              </View>
              <View style={styles.allergiesView}>
                <Text style={styles.allergiesTxt}>Allergies</Text>
                <View style={styles.allergiesContainer}>
                  {health.allergies ? Object.values(health.allergies).map((allergy, i) => {
                    if (i <= 1) return (
                      <Text
                        key={i}
                        style={styles.leftHealthTitle}>
                        {allergy}{i !== 1 ? ', ' : ''}
                      </Text>
                    )
                  }): <Text style={styles.leftHealthTitle}>Not Specified</Text>}
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    )
  };

  /**
   * This method will create the right side of the box, its a main
   * container consisting of nested containers.
   * ==============================================================
   * @param User
   * @return {XML}
   * @constructor
   */
  UserRightSection = User => {
    // fetch the health obj from the props
    const {health} = this.props;

    // merge all sub containers into one and return it
    return (
      <View style={styles.rightContainer}>

        {this.UsersGeneralDetails(User.name, User.profession, User.address)}

        {this.stars()}

        {this.stackedUsers(User)}

        {User.type === "Patient" && health ? (
          <View>
            <Text style={styles.healthSummaryTitle}>Health Summary</Text>
            <View style={styles.healthSummaryContainer}>
              <View style={styles.healthSummaryInstance}>
                <Ionicons
                  style={styles.Nine}
                  name="md-heart"
                  size={17}
                  color="rgba(144, 154, 174, 0.5)"
                />
                <Text style={styles.healthSingular}>{health.bpm}
                  <Text style={{fontSize: 13}}> bpm</Text>
                </Text>
              </View>

              <View style={styles.healthSummaryInstance}>
                <Ionicons
                  style={styles.Nine}
                  name="md-flame"
                  size={17}
                  color="rgba(144, 154, 174, 0.5)"
                />
                <Text
                  style={styles.healthSingular}>{health.calories}
                  <Text style={{fontSize: 13}}>cal</Text>
                </Text>
              </View>

              <View style={styles.healthSummaryInstance}>
                <Ionicons
                  style={styles.Nine}
                  name="md-thermometer"
                  size={17}
                  color="rgba(144, 154, 174, 0.5)"
                /><Text style={styles.healthSingular}>{health.thermometer}°</Text>
              </View>
            </View>
          </View>
        ) : null}

        {this.ECG(User)}
      </View>
    );
  };

  /**
   * This method will the database and follow the user
   * ==============================================================
   * @param authUID, uid, o, User
   */
  follow = (authUID, uid, o, User) => Database.followUser (
    authUID, uid, o, {
      name       : User.name       || "Not Specified",
      profession : User.profession || "Not Specified"
    }
  );

  render() {
    // es6 destructor to return the following attributes from props
    const {uid, authUserUID, User, toFollow, opositeTable} = this.props;

    return (
      <View>
        <View style={[styles.box, {position: 'relative', paddingBottom: toFollow ? 20: 0}]}>

          {toFollow ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.follow(authUserUID, uid, opositeTable, User)}
              style={styles.toFollowBtn}>
              <Feather style={styles.Nine} name="plus-circle" size={15} color="#909aae"/>
            </TouchableOpacity>
          ):(
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.update({uid: this.props.uid, ...User})}
              style={styles.toFollowBtn}>
              <Feather style={styles.Nine} name="more-horizontal" size={15} color="#909aae"/>
            </TouchableOpacity>
          )}

          <View style={styles.leftAndRightSection}>
            {User ? this.UserLeftSection(User, this.props.uid): null}
            {User ? this.UserRightSection(User): null}
          </View>

          {!toFollow ? (
            <View style={styles.toFollowView}>
              <View style={styles.toFollowNestedView}>
                <Feather
                  style={styles.Nine}
                  name="eye"
                  size={15}
                  color="rgba(144, 154, 174, 0.5)"
                />
                <Text
                  style={styles.totalViewed}>{this.state.randomWatch}</Text>
              </View>

              <View style={styles.rightMessageIcon}>
                <Feather
                  style={styles.Nine}
                  name="message-square"
                  size={15}
                  color="rgba(144, 154, 174, 0.5)"
                />
                <Text style={styles.totalViewedTxt}>230</Text>
              </View>
            </View>
          ): null}
        </View>
      </View>
    );
  }
}

UserBox.propTypes = {
  uid: PropTypes.string.isRequired,
  User: PropTypes.object,
  updateIndex: PropTypes.func.isRequired
};
