import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
    marginTop: 10,
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
  overrideInput: {
    marginBottom: 40
  },
  inputContainer: {
    position: 'relative'
  },
  signUpTxt: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2
  }
})
