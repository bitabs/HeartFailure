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
  it('renders as expected', () => {
    const tree = renderer.create(
      <UserBox uid={"VoxHFgUEIwRFWg7JTKNXSSoFoMV2"} />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  });
});
