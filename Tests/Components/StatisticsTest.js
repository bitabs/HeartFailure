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
import Statistics from "../../App/Containers/Statistics";

Enzyme.configure({ adapter: new Adapter() });

describe('Testing <Statistics /> component', () => {
  // create an image of the component, and match it with the snapshot
  it('renders as expected', () => {
    const tree = renderer.create(
      <Statistics />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  });

  it('Should create a chart for the day', () => {
    const wrapper = shallow(<Statistics handleSubmit={jest.fn()} />);
    const inst = wrapper.instance().DayConfig()
    expect(inst)
  });

  it('Should create a chart for the month', () => {
    const wrapper = shallow(<Statistics handleSubmit={jest.fn()} />);
    const inst = wrapper.instance().MonthConfig()
    expect(inst)
  });

  it('Should create a chart for the year', () => {
    const wrapper = shallow(<Statistics handleSubmit={jest.fn()} />);
    const inst = wrapper.instance().YearConfig()
    expect(inst)
  });

  it('Should render the component from render() hook', () => {
    const wrapper = shallow(<Statistics handleSubmit={jest.fn()} />);
    const inst = wrapper.instance().render();
    expect(inst)
  });
});

