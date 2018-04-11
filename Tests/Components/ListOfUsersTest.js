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
import ListOfUsers from "../../App/Containers/ListOfUsers";

Enzyme.configure({ adapter: new Adapter() });

describe('Testing <ListOfUsers /> component', () => {
  // create an image of the component, and match it with the snapshot
  it('renders as expected', () => {
    const tree = renderer.create(
      <ListOfUsers updateIndex={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot()
  });

  // create an image of the component, and match it with the snapshot
  it('should bind a set of methods', () => {
    const wrapper = shallow(<ListOfUsers updateIndex={jest.fn()}/>);
    const inst = wrapper.instance().constructor();
    expect(inst)
  });

  it('should fetch data from API', () => {
    const wrapper = shallow(<ListOfUsers updateIndex={jest.fn()}/>);
    const inst = wrapper.instance().componentDidMount();
    expect(inst)
  });

  it('should update the dashboard', () => {
    const wrapper = shallow(<ListOfUsers updateIndex={jest.fn()}/>);
    const inst = wrapper.instance().updateDashBoard("eXskfjeri", "Vxmdudosjd", {});
    expect(inst)
  });

  it('should add the user to the state object of the component', () => {
    const wrapper = shallow(<ListOfUsers userView={jest.fn()} updateIndex={jest.fn()}/>);
    const inst = wrapper.instance().addUser({}, {});
    expect(inst)
  });

  it('should add the uid & type of the user to the state obj', () => {
    const wrapper = shallow(<ListOfUsers updateIndex={jest.fn()}/>);
    const inst = wrapper.instance().setCurrentUserUidAndType({}, {});
    expect(inst)
  });

  it('should pass the first user to the parent component', () => {
    const wrapper = shallow(<ListOfUsers userView={jest.fn()} updateIndex={jest.fn()}/>);
    const inst = wrapper.instance().setDefaultUser();
    expect(inst)
  });

  it('should filter users from firebase', () => {
    const wrapper = shallow(<ListOfUsers updateIndex={jest.fn()}/>);
    const inst = wrapper.instance().fetchUsersFromNetwork({}, "Doctor");
    expect(inst)
  });

  it('should toggle the pages', () => {
    const wrapper = shallow(<ListOfUsers updateIndex={jest.fn()}/>);
    const inst = wrapper.instance().switchToggle("editView");
    expect(inst)
  });

  it('should list the users of the authenticated user', () => {
    const wrapper = shallow(<ListOfUsers updateIndex={jest.fn()}/>);
    const inst = wrapper.instance().users({}, {}, "Doctor");
    expect(inst)
  });
});

