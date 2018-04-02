import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    padding: 30,
    position: 'relative'
  },
  profileTopContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  topContainerView: {
    alignSelf: 'center'
  },
  topContainerInnerView: {
    alignItems: 'flex-end',
    flexDirection:'column',
    justifyContent: 'space-between'
  },
  getToKnowMe: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#bccad0'
  },
  address: {
    color: '#bccad0',
    flexWrap: 'wrap',
    maxWidth: 100,
    textAlign: 'right'
  },
  ratingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  ratingView: {
    flexDirection: 'row'
  },
  ratingTxt: {
    fontWeight: 'bold',
    color: '#bccad0'
  },
  verifiedIcon: {
    flexDirection: 'row'
  },
  userImg: {
    borderRadius: 5,
    height: 170,
    width: 170,
    marginRight: 30
  },
  HR: {
    flexDirection: 'row',
    maxWidth: 310,
    height: 2,
    backgroundColor: '#bccad0',
    opacity: 0.1,
    marginTop: 20,
    marginBottom: 20
  },
  userImgOverride: {
    backgroundColor: '#E67D8F',
    alignItems: 'center',
    justifyContent: 'center'
  },
  commentsContainer: {
    backgroundColor: 'white',
    alignItems: 'stretch',
    padding: 0,
    paddingTop: 0,
    flexDirection: 'column',
  },
  comment: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  commentsTitle: {
    fontSize: 17,
    color: '#bccad0',
    textAlign: 'center'
  },
  profPic: {
    borderRadius: 300,
    height: 50,
    width: 50,
    marginRight: 10,
  },
  profPicIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E67D8F'
  },
  msgText: {
    flex: 1,
    flexDirection: 'column'
  },
  $top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  name: {
    fontWeight: 'bold',
    color: "#6d777d"
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeStampTxt: {
    fontSize: 13,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  msgTxtColor: {
    color: '#bccad0'
  },
  searchInput: {
    fontSize: 13,
    color: "#aab8be",
    textAlignVertical: "top",
    height: 70,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 70,
    backgroundColor: 'rgba(188,202,208, 0.1)',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  nameAndProfession: {
    alignItems: 'flex-start'
  },
  $name: {
    fontSize: 23,
    color: '#bccad0',
    textAlign: 'left'
  },
  $profession: {
    color: '#cedde3'
  },
  online: {
    color: '#3cecc8',
    fontWeight: 'bold',
    marginTop: 5
  },
  bpmAndCaloriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  bpmContainer: {
    alignItems: 'center',
    marginLeft: 20
  },
  caloriesContainer: {
    alignItems: 'center',
    marginLeft: 20
  },
  bpmTxt: {
    fontSize: 30,
    color: '#bccad0'
  },
  statistics: {
    fontSize: 18,
    color: '#bccad0'
  },
  ecgAndSoundContainer: {
    alignItems: 'flex-start',
    marginBottom: 10
  },
  ecgAndSoundContainerTxt: {
    fontSize: 17,
    color: '#bccad0'
  },
  chartView: {
    alignItems: 'center',
    padding: 0,
    marginBottom: 30
  },
  positionRelative: {
    position: 'relative'
  },
  sendBtn: {
    position: 'absolute',
    right: 20,
    top: 30,
    padding: 4,
    borderRadius: 300,
    backgroundColor: '#E67D8F',
    elevation: 3
  },
  noComments: {
    fontSize: 12,
    color: '#bccad0',
    textAlign: 'center'
  }
})
