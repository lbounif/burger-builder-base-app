import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuiler from './containers/BurgerBuilder/BurgerBuilder'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuiler />
        </Layout>
      </div>
    );
  }
}

export default App;
