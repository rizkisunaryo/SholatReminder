import React, {Component} from 'react';
import { Provider } from 'react-redux';

import Index from './navigator/Index';
import {store} from './redux/Store';

console.disableYellowBox = true;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

export default App;
