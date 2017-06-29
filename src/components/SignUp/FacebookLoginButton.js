

import React, {Component, PropTypes} from 'react';
import loaders from './social-loaders';
import * as userActions from '../../redux/actions/userActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Spinner from 'halogen/ClipLoader';
import './style.css';
import ApiHandler from '../../core/ApiHandler';


/*global FB*/
class FacebookLoginButton extends Component {

    constructor(props){

      super(props);

      this.state={
          visibleSpinner: false,
          userProfile:{}
      }

      this.onPressSocialBtn = this.onPressSocialBtn.bind(this);
      this.handleSocialLoginSuccess = this.handleSocialLoginSuccess.bind(this);
      this.handleSocialLoginFailure = this.handleSocialLoginFailure.bind(this);
    }

    // Load Appropriate Provider
    componentDidMount() {

      const d = document;

      const appId = 656395011206413;
      loaders.facebook(d, appId, this.handleSocialLoginSuccess, this.handleSocialLoginFailure);


    }

    handleSocialLoginSuccess (response) {

      let userData = {
        accessToken: null
      };

      userData.accessToken = response.authResponse.accessToken;

      this.loginUser(userData);
    }

    handleSocialLoginFailure (err) {
      console.log(err);
    }

    loginUser(fbUserData) {

        let ping = ApiHandler.customApiHeader(fbUserData);

        this.props.actions.login(ping).then( response => {
            console.log(response);
              setTimeout(() => {
                 this.props.onCloseFacebook(true);
             }, 1000);
      }).catch(error => {
        const errorMessage = ApiHandler.getErrorMessage(error);
        console.log(errorMessage);
     });


    }

    onPressSocialBtn(){

      let that = this;

      FB.login( response => {                               //eslint-disable-line no-undef
          console.log(response);
        if (response.status === 'connected') {
          this.setState({visibleSpinner: true});
          that.handleSocialLoginSuccess(response);
        }

      }, {scope: 'public_profile,email'});

    }
    render() {

        //spinner
        let showSpinner = <div />,
            showFBButton = (
                <div>
                    <span className="sign-in-to-see-this">Sign in to see this circle</span>
                    <button className="fb-login-btn" onClick={this.onPressSocialBtn}>
                      <img src={require('../../assets/images/fb-button@2x.png')} alt="fb" />
                     </button>
                </div>

            );


        if(this.state.visibleSpinner){
            showSpinner = (
                <div className="margin-top-1">
                    <Spinner color="#8136ec" size="70px" margin="4px"/>
                </div>
            );

            showFBButton = <div />;
        }

      return (

        <div>
          {showFBButton}
          {showSpinner}
        </div>
      )
    }
}

FacebookLoginButton.contextTypes = {
 router: PropTypes.object
}

function mapStateToProps(state, ownProps) {

  return {
      currentUser: state.user.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(userActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FacebookLoginButton);
