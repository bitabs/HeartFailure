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
import Counter from "../../App/Containers/Counter";

Enzyme.configure({ adapter: new Adapter() });

describe('Testing <Counter /> component', () => {
  // create an image of the component, and match it with the snapshot
  it('renders as expected', () => {
    const tree = renderer.create(
      <Counter />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  });

  it('should start the recording', () => {
    const wrapper = shallow(<Counter />);
    const inst = wrapper.instance().startRecording(30);
    expect(inst)
  });

});

