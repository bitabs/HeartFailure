import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Used to set Text Component Vertically Center
    alignItems: 'center', // Used to set Text Component Horizontally Center
  },
  positionRelative: {
    position: 'relative'
  },
  ioniconsStyle: {
    position: 'absolute',
    right: 15,
    top: 21
  },
  centerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  checkBoxContainerSub: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  topContainerTxt: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 17,
    color: '#bccad0'
  },
  middleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom:10
  },
  input: {
    fontSize: 15,
    color: "#aab8be",
    height: 40,
    width: 280,
    paddingLeft: 15,
    backgroundColor: 'rgba(188,202,208, 0.15)',
    marginTop: 10,
    borderRadius: 5
  },
  bottomContainer: {
    flexDirection: 'column',
    marginTop: 30,
    alignItems: 'center'
  },
  loginBtn: {
    backgroundColor: '#E67D8F',
    alignSelf: 'stretch',
    borderRadius: 5,
    padding: 12,
    width: 280,
    height: 50,
    elevation: 2,
    marginBottom: 20
  },
  logoutTxt: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2
  },
  dontHaveAnAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dontHaveAccountTxt: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#bccad0',
    marginRight: 10
  },
  signUpTxt: {
    fontSize: 14,
    color: '#E67D8F',
    fontWeight: 'bold'
  }
})
