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

// the component that will be tested
import UserInfo from "../../App/Containers/UserInfo";

Enzyme.configure({ adapter: new Adapter() });

describe('Testing <UserInfo /> component', () => {
  global.fetch = jest.fn(() => new Promise(resolve => resolve()));
  // create an image of the component, and match it with the snapshot
  it('renders as expected', () => {
    const tree = renderer.create(
      <UserInfo />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  });

  it('Should fetch API data when mounted', () => {
    const wrapper = shallow(<UserInfo />);
    const inst = wrapper.instance().componentDidMount();
    expect(inst)
  });

  it('Should fetch data from github URL', () => {
    const wrapper = shallow(<UserInfo />);
    const inst = wrapper.instance().fetchDummyData();
    expect(inst)
  });

  it('Should create the ECG chart for the user', () => {
    const wrapper = shallow(<UserInfo />);
    const inst = wrapper.instance().config();
    expect(inst)
  });

  it('Should create the chart for heart sound', () => {
    const wrapper = shallow(<UserInfo />);
    const inst = wrapper.instance().soundConfig();
    expect(inst)
  });

  it('Should filter the messages', () => {
    const wrapper = shallow(<UserInfo User={{
      uid: '',
      Address: ''
    }}/>);
    const inst = wrapper.instance().filterMsg({});
    expect(inst)
  });

  it('Should generate random numbers', () => {
    const wrapper = shallow(<UserInfo />);
    const inst = wrapper.instance().getRandomInt(0,10);
    expect(inst)
  });

  it('Should create the rating system', () => {
    const wrapper = shallow(<UserInfo />);
    const inst = wrapper.instance().favorite();
    expect(inst)
  });

  it('Should create messages container', () => {
    const wrapper = shallow(<UserInfo />);
    const inst = wrapper.instance().messages({});
    expect(inst)
  });

  it('Should create the top container', () => {
    const wrapper = shallow(<UserInfo />);
    const inst = wrapper.instance().topContainer({});
    expect(inst)
  });

  it('Should create a container holding bpm and calories', () => {
    const wrapper = shallow(<UserInfo />);
    const inst = wrapper.instance().bpmAndCalories();
    expect(inst)
  });

  it('Should create a container holding ECG and Heart sound', () => {
    const wrapper = shallow(<UserInfo />);
    const inst = wrapper.instance().ecgAndSound();
    expect(inst)
  });

  it('Should create a container holding the entire comments section', () => {
    const wrapper = shallow(<UserInfo />);
    const inst = wrapper.instance().commentsContainer({}, 0, {});
    expect(inst)
  });
});

