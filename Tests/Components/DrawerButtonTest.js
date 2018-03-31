import 'react-native'
import React from 'react'
import DrawerButton from '../../App/Components/DrawerButton'
import Enzyme,{ shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
test('AlertMessage component renders correctly', () => {
  const tree = renderer.create(<DrawerButton onPress={() => {}} text='hi' />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('onPress', () => {
  let i = 0
  const onPress = () => i++
  const wrapperPress = shallow(<DrawerButton onPress={onPress} text='hi' />)

  expect(wrapperPress.prop('onPress')).toBe(onPress) // uses the right handler
  expect(i).toBe(0)
  wrapperPress.simulate('press')
  expect(i).toBe(1)
})
