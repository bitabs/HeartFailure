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
import OpeningLogoLoader from "../../App/Containers/OpeningLogoLoader";

Enzyme.configure({ adapter: new Adapter() });

describe('Testing <OpeningLogoLoader /> component', () => {
  // create an image of the component, and match it with the snapshot
  it('renders as expected', () => {
    const tree = renderer.create(
      <OpeningLogoLoader />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  });

  it('Should mount the component', () => {
    const wrapper = shallow(<OpeningLogoLoader />);
    const inst = wrapper.instance().constructor();
    expect(inst)
  });
});

