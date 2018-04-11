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
import MessageComponent from "../../App/Components/MessageComponent";

Enzyme.configure({ adapter: new Adapter() });

describe('Testing <MessageComponent /> component', () => {
  // create an image of the component, and match it with the snapshot

  const messageComponent = (
    <MessageComponent
      name        = {"Naseebullah"}
      uid         = {"Vjdialsidhskjahdkajhklsjdalkdj"}
      healthAlert = {"Stable"}
      comment     = {"Hi there"}
      timeStamp   = {"2015-06-21T06:24:44.124Z"}
      type        = {"Patient"}
      key         = {0}
    />
  )
  it('renders as expected', () => {
    const tree = renderer.create(messageComponent).toJSON();
    expect(tree).toMatchSnapshot()
  });

  it('Should generate random numbers', () => {
    const wrapper = shallow(messageComponent);
    const inst = wrapper.instance().getRandomInt(0, 10);
    expect(inst)
  });

  it('Should generate random Icon from random number', () => {
    const wrapper = shallow(messageComponent);
    const inst = wrapper.instance().randomIcon();
    expect(inst)
  });

  it('Should check if a string has white spaces', () => {
    const wrapper = shallow(messageComponent);
    const inst = wrapper.instance().hasWhiteSpace("N A");
    expect(inst).toBe(true)
  });

  it('Should format the string and capitalise it', () => {
    const wrapper = shallow(messageComponent);
    const inst = wrapper.instance().formatText("naseeb");
    expect(inst).toBe("N A S E E B")
  });

  it('Should generate dynamic tag color', () => {
    const wrapper = shallow(messageComponent);
    const inst = wrapper.instance().dynamicTagColor("High");
    expect(inst).toBe("#E67D8F")
  });
});

