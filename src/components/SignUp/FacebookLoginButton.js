

import React, {Component, PropTypes} from 'react';
import loaders from './social-loaders';
import Spinner from 'halogen/ClipLoader';
import './style.css';
import Api from '../../core/Api';
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

    loginUser(userData) {
        debugger
        let ping = ApiHandler.customApiHeader(userData);

          Api.post('/UserService/logInWithFacebook', ping).then(apiResponse => {
                console.log(apiResponse.data.result.userProfile);
                  this.setState({userProfile: apiResponse.data.result.userProfile});

                    setTimeout(() => {
                       this.props.onCloseFacebook(true, this.state.userProfile);
                   }, 2000);


          }).catch(error => {

              const errorMessage = ApiHandler.getErrorMessage(error);
              alert(errorMessage);
          });


      console.log(userData);

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


export default FacebookLoginButton;
