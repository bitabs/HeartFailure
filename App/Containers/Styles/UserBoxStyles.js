import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  box: {
    marginBottom: 20,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 0,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width
  },
  leftContainer: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  rightContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column'
  },
  generalDetailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  nameAndProfession: {
    flexWrap: 'wrap',
    maxWidth: 130,
    alignItems: 'flex-start'
  },
  address: {
    alignSelf: 'flex-start',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  addressIcon: {
    fontWeight: '900',
    marginRight: 5
  },
  addressTxt: {
    fontSize: 10,
    color: '#909aae',
    flexWrap: 'wrap',
    maxWidth: 100
  },
  ECGView: {
    alignItems: 'center',
    padding: 0
  },
  ECG404: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ECG404Txt: {
    color: 'rgba(144, 154, 174, 0.5)',
    fontSize: 15,
    opacity: 0.7
  },
  userImg: {
    borderRadius: 300,
    height: 80,
    width: 80
  },
  verified: {
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#59D0D0',
    padding: 2,
    width: 20, height: 20,
    borderRadius: 100 / 2,
    left: 5,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: 16,
    color: '#909aae'
  },
  profession: {
    fontSize: 13,
    opacity: 0.5,
    color: 'rgba(144, 154, 174, 0.8)'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  starsRatingValue: {
    fontWeight: 'bold',
    color: '#97a4aa',
    marginRight: 5
  },
  stackedUsersMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  stackedUsersMainInnerContainer: {
    position: 'relative',
    marginBottom: 10,
    height: 20
  },
  stackedUsersMainInnerInnerContainer: {
    flexDirection: 'row',
    position: 'relative'
  },
  stackedUsersImage: {
    borderRadius: 300,
    height: 25,
    width: 25,
  },
  stackedUsersUserIcon: {
    borderRadius: 300,
    height: 25,
    width: 25,
    backgroundColor: '#6482e6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgCircleContainer: {
    borderRadius: 300,
    height: 30,
    width: 30,
    borderColor: 'white',
    backgroundColor: 'white',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 0,
    justifyContent: 'center',
  },
  imgCircleContainerOverride: {
    position: 'absolute',
    left: 56,
    backgroundColor: 'white'
  },
  usersMoreContainer: {
    width: 25,
    height: 25,
    backgroundColor: '#1bb3f3',
    borderRadius: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  plusTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: "white"
  },
  healthTag: {
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  imgRound: {
    position: 'relative',
    borderRadius: 300,
    height: 83,
    width: 83,
    alignItems: 'center',
    paddingLeft: 0,
    overflow: 'hidden',
    elevation: 2,
    justifyContent: 'center',
  },
  imgOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(144, 154, 174, 0.8)',
    opacity: 0.5,
    top: -1,
    left: -1,
    bottom: 0,
    right: 0,
    borderRadius: 700,
    height: 83,
    width: 83,
  },
  messageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  leftHealthInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5
  },
  leftHealthFont: {
    color: 'rgba(144, 154, 174, 0.5)',
    fontSize: 12,
    fontWeight: 'bold'
  },
  leftHealthTitle: {
    color: 'rgba(144, 154, 174, 0.5)',
    fontSize: 10
  },
  allergiesView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  allergiesContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  allergiesTxt: {
    color: 'rgba(144, 154, 174, 0.5)',
    fontSize: 12
  },
  healthSummaryTitle: {
    color: 'rgba(144, 154, 174, 0.5)',
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold'
  },
  healthSummaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between'
  },
  healthSummaryInstance: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  healthSingular: {
    color: 'rgba(144, 154, 174, 0.5)',
    fontSize: 20
  },
  Nine: {
    fontWeight: '900'
  },
  toFollowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  toFollowNestedView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  toFollowBtn: {
    alignSelf: 'flex-end',
    padding: 10,
    paddingRight: 0,
    paddingLeft: 30
  },
  totalViewed: {
    marginLeft: 5,
    fontSize: 10,
    color: 'rgba(144, 154, 174, 0.5)'
  },
  totalViewedTxt: {
    marginLeft: 5,
    fontSize: 10,
    color: 'rgba(144, 154, 174, 0.5)'
  },
  rightMessageIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftAndRightSection: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
})
