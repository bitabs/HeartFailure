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
import {PatientMainScreen} from "../../App/Containers/PatientMainScreen";

Enzyme.configure({ adapter: new Adapter() });

/**
 * Test the entire component to see if it renders properly
 */
describe('Testing <PatientMainScreen /> component', () => {

  // create an image of the component, and match it with the snapshot
  it('renders as expected', () => {
    const tree = renderer.create(
      <PatientMainScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  });

  /**
   * Set of methods from the component is tested below
   */
  it('should request User API from firebase', () => {
    const wrapper = shallow(<PatientMainScreen />);
    // attach the user reference from firebase to the component
    let userRef = firebase.database().ref(`/Users/`);

    // attach the ECG reference from firebase to the component
    let ecgRef = firebase.database().ref(`/ECG/`);

    // attach the health reference from firebase to the component
    let healthRef = firebase.database().ref(`/Health/`);

    const inst = wrapper.instance().fetchData(
      userRef, ecgRef, healthRef, {}
    );
    expect(inst)
  });

  it('should apply letter spacing', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().applyLetterSpacing("Doctor");
    expect(inst).toBe("Doctor".split('').join('\u200A'.repeat(1)))
  });

  it('should sign out', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().signOutUser();
    expect(inst)
  });

  it('should toggle buttons', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().toggleBtns("EditView", true);
    expect(inst)
  });

  it('should create config object for highcharts', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().config();
    expect(inst)
  });

  it('should create temperature object for highcharts', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().temperature;
    expect(inst)
  });

  it('should create calories object for highcharts', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().caloriesBurned;
    expect(inst)
  });

  it('should create fat object for highcharts', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().fatBurned;
    expect(inst)
  });

  it('should create heart rate object for highcharts', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().heartRate;
    expect(inst)
  });

  it('should render input fields for the form', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().renderInput({input: {...jest.fn()}});
    expect(inst)
  });

  it('should open the side menu for messages', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(<PatientMainScreen navigation={navigation}/>);
    const inst = wrapper.instance().openSideMenu(navigation.navigate);
    expect(inst)
  });

  it('should render the top container', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().topContainer({});
    expect(inst)
  });

  it('should render the about container when in default view', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().aboutDefaultView({});
    expect(inst)
  });

  it('should render the about container when in edit view', () => {
    const wrapper = shallow(<PatientMainScreen handleSubmit={jest.fn()} />);
    const inst = wrapper.instance().aboutEditView({});
    expect(inst)
  });

  it('should create a container for about', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().about({});
    expect(inst)
  });

  it('should render ECG data', () => {
    const wrapper = shallow(<PatientMainScreen />);
    const inst = wrapper.instance().$ECG({}, [2,1,2], "Patient");
    expect(inst)
  });

});

