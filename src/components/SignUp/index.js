

import React, { Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import FacebookLoginButton from './FacebookLoginButton';
import './style.css';

import ApiHandler from '../../core/ApiHandler';


class SignUp extends Component {
  constructor(props){
    super(props);

    this.state={
      visibleRSVP: false,
      user:{
        firstName:'',
        lastName:'',
        email:''
      },
      currentUser:{}
    }

    this.handleSocialLogin= this.handleSocialLogin.bind(this);
    this.onCloseFacebook = this.onCloseFacebook.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onclickRequest = this.onclickRequest.bind(this);
  }

  componentDidMount(){

    //Check if user already has a client uuid if not create a new one
      if(!localStorage.getItem('clientUuid')){
          localStorage.setItem('clientUuid', ApiHandler.guid());
      }

  }

  //Called any time the Props have Changed in the Redux Store
  componentWillReceiveProps(nextProps) {
      //Check if the Props for Services have in fact changed.
      if (this.props.currentUser !== nextProps.currentUser) {
          this.setState({currentUser: nextProps.currentUser });
      }
  }

  onCloseFacebook(res){
    if(res){
      this.setState({visibleRSVP: true});
    }

  }

  handleSocialLogin(response){
    console.log(response);
  }

  onChangeInput(e){
    e.preventDefault();
    let user = this.state.user;
    user[e.target.name] = this.target.value;
    this.setState({user});
  }

  onclickRequest(){
    this.context.router.push('/0424D3CD-7DF1-4EC8-B6FA-CD79C60FB827');
  }

  render() {

    let circleToShow = <div/>;

    if(!this.state.visibleRSVP){
    circleToShow = (
        <div className="main-container">

            <div className="e-container">
              <div className="row">
                <p className="e-title">
                  Union Yoga
                </p>
                <div className="loc-container">
                  <img src={require('../../assets/images/combined-shape@2x.png')} alt="icon" className="loc-icon"/>
                  <p className="e-location">
                    Russian Hill
                  </p>
                </div>

              </div>
              </div>

              <div className="photo-container">
                <img alt="circle" src={require('../../assets/images/dummy.png')} />
              </div>

              <div className="sign-container">
                  <FacebookLoginButton onCloseFacebook={this.onCloseFacebook}/>
              </div>
        </div>
      );
    } else {
      circleToShow =(
        <div className="main-form-container">
            <div className="form-container">
              <p className="form-title">
                Hey Chauntie, Present is invite only, get invited.
              </p>
              <label>
                <input
                  maxLength={5}
                  name="firstName"
                  value={this.state.currentUser.name.first ? this.state.currentUser.name.first : this.state.user.firstName}
                  type="text"
                  onChange={this.onChangeInput}
                  className="input-form" />
                  first name
              </label>

              <label>
                <input
                  name="lastName"
                  value={this.state.currentUser.name.last ? this.state.currentUser.name.last :this.state.user.lastName}
                  type="text"
                  onChange={this.onChangeInput}
                  className="input-form" />
                  last name
              </label>

              <label>
                <input
                  name="email"
                  value={this.state.user.email}
                  type="email"
                  onChange={this.onChangeInput}
                  className="input-form" />
                  email
              </label>

              <div className="text-center">
                <button onClick={this.onclickRequest} className="request-btn">Request an Invite</button>
              </div>
            </div>
        </div>
      )
    }

    return(
      <div>
        <div className="text-center logo-container">
          <img src={require('../../assets/images/present-logo-stacked@2x.png')} alt="" className="logo-present"/>
        </div>
        {circleToShow}
      </div>

    )

  }
}

SignUp.contextTypes = {
 router: PropTypes.object
}

function mapStateToProps(state, ownProps) {

    return {
        currentUser: state.user.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
