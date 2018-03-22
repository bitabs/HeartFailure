import React, {Component} from 'react';

export default class ComponentName extends Component {
  constructor(props) {
    super(props);
    this.state = {...};
  }

  // called before the component is mounted
  componentWillMount() {};

  // called when the component is mounted
  componentDidMount = () => {};

  // called just before the component gets unmounted
  componentWillUnmount = () => {};

  // called when new props come
  componentWillReceiveProps = nextProps => {};

  // checks the props, if any changes, the component is re-rendered
  shouldComponentUpdate = ( nextProps, nextState, nextContext ) => {};

  // called just before it is updated
  componentWillUpdate = ( nextProps, nextState ) => {};

  // called when it is updated
  componentDidUpdate = (prevProps, prevState, prevContext) => {};

  // method that consists of the UI
  render() {
    return (null)
  }
};
