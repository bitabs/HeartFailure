// need to import React itself
import React from 'react'

// everything fro react native
import 'react-native'

// required for mocking modules
import Enzyme,{ shallow } from 'enzyme'

// needed to pass components to the renderer
import renderer from 'react-test-renderer'

import {Field, reduxForm} from "redux-form"

// adapter is needed for this react version
import Adapter from 'enzyme-adapter-react-16';

// the component that will be tested
import {LoginForm} from "../../App/Containers/LoginForm";

import { createStore } from 'redux';

import { Provider } from 'react-redux';

const store = createStore(() => ({}));

Enzyme.configure({ adapter: new Adapter() });

const Decorated = reduxForm({ form: 'testForm' })(LoginForm);

describe('Testing <LoginForm /> component', () => {
  // create an image of the component, and match it with the snapshot
  const __Decorated = (
    <Provider store={store}>
      <Decorated handleSubmit={jest.fn()}/>
    </Provider>
  );

  it('renders as expected', () => {
    const tree = renderer.create(__Decorated).toJSON();
    expect(tree).toMatchSnapshot()
  });

  it('Should render the input fields', () => {
    const wrapper = shallow(<LoginForm handleSubmit={jest.fn()} />);
    const inst = wrapper.instance().renderInput({input: jest.fn()});
    expect(inst)
  });

  it('Should render the component', () => {
    const wrapper = shallow(<LoginForm handleSubmit={jest.fn()} />);
    const inst = wrapper.instance().render()
    expect(inst)
  });
});

