import React, { Component } from 'react';
import './style.css';
import classNames from 'classnames';

class About extends Component {
  render() {

     const {className, ...props} = this.props;

    return (
      <div className={classNames('About', className)}>
        <h1>About</h1>
      </div>
    );
  }
}

export default About;
