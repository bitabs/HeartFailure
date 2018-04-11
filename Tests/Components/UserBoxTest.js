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
import UserBox from "../../App/Containers/UserBox";

Enzyme.configure({ adapter: new Adapter() });

describe('Testing <UserBox /> component', () => {
  // create an image of the component, and match it with the snapshot
  const $UserBox = <UserBox
      uid={"VoxHFgUEIwRFWg7JTKNXSSoFoMV2"}
      updateIndex={jest.fn()}
      userView={jest.fn()}
  />;
  it('renders as expected', () => {
    const tree = renderer.create($UserBox).toJSON();
    expect(tree).toMatchSnapshot()
  });

  it('Should create the ECG chart', () => {
    const wrapper = shallow($UserBox);
    const inst = wrapper.instance().config()
    expect(inst)
  });

  it('Should generate random integer between 0 and 10', () => {
    const wrapper = shallow($UserBox);
    const inst = wrapper.instance().getRandomInt(0,10)
    expect(inst)
  });

  it('Should update the user object', () => {
    const wrapper = shallow($UserBox);
    const inst = wrapper.instance().update({})
    expect(inst)
  });

  it('Should create a rating system', () => {
    const wrapper = shallow($UserBox);
    const inst = wrapper.instance().stars()
    expect(inst)
  });

  it('Should create stacked users with their images', () => {
    const wrapper = shallow($UserBox);
    const inst = wrapper.instance().stackedUsers({})
    expect(inst)
  });

  it('Should create a container holding Users general info', () => {
    const wrapper = shallow($UserBox);
    const inst = wrapper.instance().UsersGeneralDetails(
      "Nas", "FullStack", "122 Atherstone"
    );
    expect(inst)
  });

  it('Should create ECG container', () => {
    const wrapper = shallow($UserBox);
    const inst = wrapper.instance().ECG({})
    expect(inst)
  });

  it('Should create tag color for each tag', () => {
    const wrapper = shallow($UserBox);
    const inst = wrapper.instance().tagColor("High")
    expect(inst)
  });

  it('Should create users image and health container', () => {
    const wrapper = shallow($UserBox);
    const inst = wrapper.instance().UserLeftSection({}, "Vfxskfjfndjdushs")
    expect(inst)
  });

  it('Should create a container holding the rest info in the box', () => {
    const wrapper = shallow($UserBox);
    const inst = wrapper.instance().UserRightSection({})
    expect(inst)
  });

  it('Should follow a user when clicked', () => {
    const wrapper = shallow($UserBox);
    const inst = wrapper.instance().follow(
      "VhdhsoxjxiXkjdjs", "RTkxjsiRcksG", "Doctor", {}
    )
    expect(inst)
  });
});
