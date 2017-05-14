import React, { Component } from 'react';
import './style.css';
import classNames from 'classnames';

class NotFound extends Component {
  render() {

     const {className, ...props} = this.props;

    return (
      <div className={classNames('About', className)}>
        404 <small>Not Found :()</small>
      </div>
    );
  }
}

export default NotFound;
