// need to import React itself
import React from 'react'

// everything fro react native
import 'react-native'

// required for mocking modules
import Enzyme,{ shallow } from 'enzyme'

// needed to pass components to the renderer
import renderer from 'react-test-renderer'

// adapter is needed for this react version
import Adapter from 'enzyme-adapter-react-16';

// we cant use firebase in jest, so we have mocked it
import firebase from '../../firebase'

// the component that will be tested
import LaunchScreen from "../../App/Containers/LaunchScreen";

// instantiate an adapter
Enzyme.configure({ adapter: new Adapter() });

/**
 * Test the entire component to see if it renders properly
 */
describe('Testing <LaunchScreen /> component', () => {

  // create an image of the component, and match it with the snapshot
  it('renders as expected', () => {
    const tree = renderer.create(
      <LaunchScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  });

  /**
   * Set of methods from the component is tested below
   */
  it('retrieveInfo() renders accordingly', () => {
    const wrapper = shallow(<LaunchScreen />);
    const inst = wrapper.instance().retrieveInfo(firebase.database().ref(`/Users/`));
    expect(inst)
  });

  it('_handleIndexChange() renders accordingly', () => {
    const wrapper = shallow(<LaunchScreen />);
    const inst = wrapper.instance()._handleIndexChange(1);
    expect(inst)
  });

  it('updateIndex() renders accordingly', () => {
    const wrapper = shallow(<LaunchScreen />);
    const inst = wrapper.instance().updateIndex("Doctor");
    expect(inst)
  });

  it('toggleTitle() renders accordingly', () => {
    const wrapper = shallow(<LaunchScreen />);
    const inst = wrapper.instance().toggleTitle("My Patients");
    expect(inst)
  });

  it('updateUserView() renders accordingly', () => {
    const wrapper = shallow(<LaunchScreen />);
    const inst = wrapper.instance().updateUserView({});
    expect(inst)
  });

  it('_openRightSideMenu() renders accordingly', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(<LaunchScreen navigation={navigation} />);
    const inst = wrapper.instance()._openRightSideMenu();
    expect(inst)
  });

  it('_renderHeader() renders accordingly', () => {
    const wrapper = shallow(<LaunchScreen />);
    const inst = wrapper.instance()._renderHeader();
    expect(inst)
  });

});
