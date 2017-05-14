import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import classNames from 'classnames';

class App extends Component {
  render() {

     const {className, ...props} = this.props
    return (
      <div className={classNames('App', className)}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;