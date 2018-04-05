import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: '#fafafa'
  },
  overridePage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  pageTitle: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 30,
    color: '#909aae',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  stickyBtn: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 25,
    padding: 20,
    borderRadius: 300,
    elevation: 3,
  }
})
