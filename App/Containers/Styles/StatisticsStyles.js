import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'column',
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  calendarBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  overrideCalculation: {
    marginTop: 10,
    fontSize: 29,
    color: '#d0d4db'
  },
  touchableCalendarBtn: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
    maxWidth: 100
  },
  activeTouchableCalendarBtn: {
    backgroundColor: '#E67D8F',
    elevation: 5,
    borderRadius: 100 / 2
  },
  calendarBtn: {
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold'
  },
  activeCalendarBtn: {
    color: 'white'
  },
  chartContainer: {
    // flex: 20
  },
  calculationContainer: {
    flexDirection: 'column',
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
  },
  calculation: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#909aae',
    fontSize: 19
  }
})
