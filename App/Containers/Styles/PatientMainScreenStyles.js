import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(188,202,208, 0.1)'
  },
  paddingBottomZero: {
    paddingBottom: 0
  },
  ECGError: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  ECGErrorBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 13,
    padding: 10,
    backgroundColor: '#E67D8F',
    borderRadius: 300,
    elevation: 4
  },
  ohSnapContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: 20,
    height: 3,
    backgroundColor: 'rgba(188,202,208, 0.15)'
  },
  ohSnap: {
    fontSize: 30,
    color: '#aab8be',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  ohSnapTxt: {
    fontSize: 14,
    color: '#d2d6d9',
    textAlign: 'center'
  },
  updateECGBtn: {
    padding: 15,
    paddingLeft: 65,
    paddingRight: 65,
    elevation: 0.6,
    borderRadius: 5,
    backgroundColor: '#6482e6',
    marginTop: 20
  },
  topContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30
  },
  plusMinus: {
    alignSelf: 'center',
    margin: 10,
    marginRight: 0,
    padding: 10,
    backgroundColor: '#6482e6',
    borderRadius: 300,
    elevation: 2
  },
  healthAlternative: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  addHealthBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 25,
    padding: 10,
    backgroundColor: '#E67D8F',
    borderRadius: 300,
    elevation: 4
  },
  addHealthBtnTwo: {
    padding: 15,
    alignItems: 'center',
    paddingLeft: 65,
    paddingRight: 65,
    elevation: 0.6,
    borderRadius: 5,
    backgroundColor: '#6482e6',
    marginTop: 20
  },
  healthCheckIconContainer: {
    alignSelf: 'flex-end',
    marginBottom: 1,
    marginRight: 25,
    padding: 10,
    backgroundColor: '#6482e6',
    borderRadius: 300,
    elevation: 4
  },
  areYouHealthy: {
    fontSize: 30,
    color: '#aab8be',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  errorHealthContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: 20,
    height: 3,
    backgroundColor: 'rgba(188,202,208, 0.15)'
  },
  errorHealthTxt: {
    fontSize: 14,
    color: '#d2d6d9',
    textAlign: 'center'
  },
  topContainerSubView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 0,
    paddingTop: 0
  },
  aboutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
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
  positionRelative: {
    position: 'relative'
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
  ecgBoxOverride: {
    padding: 0,
    marginBottom: 10
  },
  ecgSubView: {
    padding: 30,
    paddingBottom: 0
  },
  ecgTitle: {
    fontSize: 50,
    color: '#7D8292',
    textAlign: 'center'
  },
  ecgCaption: {
    fontSize: 15,
    color: '#e0e1e8',
    textAlign: 'center'
  },
  ECG$HeartSound: {
    paddingLeft: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  ECG$HeartSoundTxt: {
    fontSize: 17,
    color: '#aab8be',
    textAlign: 'center',
    paddingLeft: 10
  },
  ECG$HeartSoundContainer: {
    padding: 0,
    paddingTop: 15,
    paddingBottom: 25
  },
  marginZero: {
    margin: 0
  },
  ecgInnerSubView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  alignItemsStretch: {
    alignItems: 'stretch'
  },
  healthSubSubView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  boxOverride: {
    minHeight: 250
  },
  healthBoxOverride: {
    padding: 10,
    marginBottom: 10
  },
  editBtn: {
    alignSelf: 'flex-end',
    margin: 20,
    marginRight: 33,
    padding: 10,
    backgroundColor: '#6482e6',
    borderRadius: 300,
    elevation: 4
  },
  healthSubView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  temperatureOverride: {
    fontSize: 13,
    fontWeight: 'normal'
  },
  boxTitleOverride: {
    fontSize: 55,
    fontWeight: 'normal',
    textAlign: 'left'
  },
  healthTitle: {
    color: '#d0d4db',
    fontSize: 25
  },
  mainText: {
    color: '#d2d6d9',
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'left'
  },
  aboutEditView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  mainTextOverride: {
    flexWrap: 'wrap',
    maxWidth: 190
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
  userImgOverride: {
    borderRadius: 300,
    height: 50,
    width: 50
  },
  userImgOverrideSub: {
    borderRadius: 300,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E67D8F"
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
  socialIconsOverride: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  connection: {
    margin: 10,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  connectionError: {
    padding: 30,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  XIcon: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 13,
    padding: 10,
    backgroundColor: '#E67D8F',
    borderRadius: 300,
    elevation: 4
  },
  yourNotSafeContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: 20,
    height: 3,
    backgroundColor: 'rgba(188,202,208, 0.15)'
  },
  yourNotSafe: {
    fontSize: 30,
    color: '#aab8be',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  yourNotSafeTxt: {
    fontSize: 14,
    color: '#d2d6d9',
    textAlign: 'center'
  },
  userIcon: {
    padding: 15,
    paddingLeft: 65,
    paddingRight: 65,
    elevation: 0.6,
    borderRadius: 5,
    backgroundColor: '#6482e6',
    marginTop: 20,
    marginBottom: 20
  },
  connectionOverride: {
    position: 'relative',
    marginBottom: 10
  },
  singleHealthContainer: {
    margin: 20,
  },
  healthSubContainer: {
    padding: 10
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
  },
  overrideInput: {
    height: 100,
    textAlignVertical: "top"
  },
  marginTwenty: {
    marginBottom: 20
  },
  marginTen: {
    marginBottom: 10
  },
  marginTwentyFive: {
    marginLeft: 25
  },
  logOutTxt: {
    color: '#a1a2a7',
    fontWeight: 'bold',
    fontSize: 10
  },
  checkIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -4,
    right: -8,
    padding: 3,
    backgroundColor: 'white',
    borderRadius: 300
  },
  checkIcon: {
    backgroundColor: '#65C178',
    borderRadius: 300,
    padding: 2
  },
  txtNotSpecified: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#a1a2a7'
  }
})
