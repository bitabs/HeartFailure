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
import SimplePage from "../../App/Containers/SimplePage";

Enzyme.configure({ adapter: new Adapter() });

describe('Testing <SimplePage /> component', () => {

  // create an image of the component, and match it with the snapshot
  it('renders as expected', () => {
    const tree = renderer.create(
      <SimplePage />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  });

  it('Should bind the View function from the constructor', () => {
    const wrapper = shallow(<SimplePage />);
    const inst = wrapper.instance().constructor();
    expect(inst)
  });

  it('Should render the View function', () => {
    const wrapper = shallow(<SimplePage />);
    const inst = wrapper.instance().View({});
    expect(inst)
  });
});
