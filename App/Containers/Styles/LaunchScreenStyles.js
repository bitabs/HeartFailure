import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    backgroundColor : 'white',
    elevation       : 0,
    paddingTop      : 10
  },
  tabBarOverride: {
    paddingBottom   : 2,
    paddingTop      : 2
  },
  dashboardTitle: {
    color           : "#bccad0",
    fontSize        : 22
  },
  notificationDot: {
    backgroundColor : '#E67D8F',
    borderColor     : 'white',
    borderRadius    : 100 / 2,
    borderWidth     : 3,
    height          : 12,
    position        : 'absolute',
    right           : 7,
    top             : 5,
    width           : 12
  },
  indicator: {
    backgroundColor : 'rgba(152, 168, 171, 0)'
  },
  headerContainer: {
    alignItems      : 'center',
    backgroundColor : 'white',
    flexDirection   : 'row',
    height          : 60,
    justifyContent: 'space-between',
    paddingLeft     : 30,
    paddingRight    : 30,
    width           : '100%'
  },
  renderFooterView: {
    backgroundColor : 'white',
    elevation       : 20
  },
  headerText: {
    color           : '#8395ab',
    fontSize        : 20,
    fontWeight      : 'bold'
  },
  button: {
    padding         : 10,
    position        : 'absolute',
    top             : 10
  },
  msgIcon: {
    padding         : 8
  },
  testing: {
    alignItems      : 'center',
    backgroundColor : '#f9f9fa',
    borderColor     : '#fff',
    borderRadius    : 100 / 2,
    justifyContent  : 'center',
    padding         : 8
  },
  renderHeaderOverrideView: {
    backgroundColor : 'white',
    elevation       : 0.3 ,
    justifyContent  : 'space-between'
  }
})
