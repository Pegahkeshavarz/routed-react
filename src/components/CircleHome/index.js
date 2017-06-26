import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './style.css';


// import Api from '../../core/Api';
// import ApiHandler from '../../core/ApiHandler';

class CircleHome extends Component {

  constructor(props){
    super(props);

    let dummyChat = [
        {
          id:0,
          name: "Alicia L",
          text:"Does anyone know if the new mats are in?"
        },
        {
          id:1,
          name: "Janete P",
          text:"In fact they are! If you want to stop by and pick yours up before class , we’re available anytime after 3:30 PM"
        },
        {
          id:2,
          name: "Alicia L",
          text:"Thanks for letting us know! I’ll be a bit late today but save me a mat, and a spot next to the buddha! "
        }
      ];

    this.state={
      inLeaveMsg: false,
      copied: false,
      joined:false,
      chats: dummyChat,
      newChat:{
        name: '',
        text:'',
        id:''
      },
      profileOption:false
    }


    this.onChangechatValue = this.onChangechatValue.bind(this);
    this.onClickSend = this.onClickSend.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.onClickSetting = this.onClickSetting.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.onClickJoinCircle = this.onClickJoinCircle.bind(this);
    this.onClickSignOut = this.onClickSignOut.bind(this);

  }

  componentDidMount(){
    this.scrollToBottom();
    // let ping = {
    //   header: {
    //     clientUuid: "112561BB-42CE-4C6C-BBBF-84F894A88A53",
    //     requestUuid: "00000000-0000-0000-0000-000000000000",
    //     authorizationKey: "not implemented",
    //     platform: "WEB",
    //     apiVersion: "0"
    //   },
    //   argument: {
    //     value: 42
    //   }
    // };
    //
    // Api.post('/PingService/ping', ping).then(apiResponse => {
    //
    //   const response = apiResponse.data;
    //   console.log(response);
    //
    // }).catch(error => {
    //     const errorMessage = ApiHandler.getErrorMessage(error);
    //     console.log(errorMessage);
    // });

  }

  copyToClipboard(){
    this.state.copied ? this.setState({copied: false}) : this.setState({copied: true});
  }

  onClickJoinCircle(){
    this.setState({joined: true});
  }

  onClickSignOut(){
    this.context.router.push('/');
  }


  onChangechatValue(e){

    e.preventDefault();

    let newChat={};
    newChat.name = 'Janete P';
    newChat.text = e.target.value;
    newChat.id = this.state.chats.length+1;

    this.setState({newChat});

  }

  onClickSetting(){

    this.state.inLeaveMsg ?  this.setState({inLeaveMsg:false}) : this.setState({inLeaveMsg:true});

  }

  onClickSend(){
    debugger
    if(this.state.newChat.text !== ''){
      let chats = this.state.chats,
          newChat = this.state.newChat;

      chats.push(newChat);

      newChat = {name:'', text:'', id:''};
      this.setState({chats, newChat});

    }

  }

  _handleKeyPress(e){
    if(this.state.newChat.text !== ''){
      if (e.key === 'Enter') {
        let chats = this.state.chats,
            newChat = this.state.newChat;

        chats.push(newChat);

        newChat = {name:'', text:'', id:''};
        this.setState({chats, newChat});
      }
    }
  }

  scrollToBottom()  {
      const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  componentDidUpdate(){
      this.scrollToBottom();
  }

  render() {

    let showLeaveMsg = <div/>,
        showCopied = <span/>,
        showJoin = <div/>;


      if(this.state.inLeaveMsg){
        showLeaveMsg=(
          <div className="leave-cir-container">
            <img alt="" src={require('../../assets/images/leave-circle@2x.png')} />
          </div>
        )
      }


      if(this.state.copied){
        showCopied = (
          <span className="copied-text">Link Copied!</span>
        )
      };

      if(!this.state.joined){
        showJoin = (
          <button  onClick={this.onClickJoinCircle} className="join-btn">Join</button>
        )
      }

      let showMessage= this.state.chats.map((chat)=>{
        return (
          <div className="msg-container" key={chat.id}>
            <div className="user">
              <img src={require('../../assets/images/dum-pro.png')} alt="your" className="user-photo"/>
              <span className="username">{chat.name}</span>
            </div>

            <div className="msg">
              <p >{chat.text}</p>
            </div>
          </div>
        )
      });






    return (

      <div >
        <nav className="tab-bar">
          <section className="middle tab-bar-section">
            <img className="nav-logo" src={require('../../assets/images/lockup@3x.png')} alt=""/>
          </section>

          <section className="right tab-bar-section">
            {
              !this.state.profileOption ?
              <button className="profile-btn" onClick={() => this.setState({profileOption:true})}>
                Chauntie T
              </button> :
              <button className="profile-btn-sign" onClick={() => this.setState({profileOption:false})}>
                Chauntie T
                <div className="divider"></div>
                <a onClick={this.onClickSignOut}>Sign out</a>
              </button>

            }

          </section>

        </nav>
        <div >

          <div className="large-3 columns">
            <p className="ur-circle">My Circles</p>
            <div className="cir-names">
              <p className="circle-name">Union Yoga</p>
              <p className="circle-name">Aussie Puppy Moms</p>
            </div>

          </div>
          <div className="large-7  end columns">
            <div className="circle-container">
              <div className="border-bottom-1">
                <div className="row cir-nav">
                  <div className="medium-3 large-3 columns">
                    <button className="circle-pro-img">
                      <img alt="" src={require('../../assets/images/dummy.png')} className="cir-nav-img"/>
                    </button>


                  </div>

                    <div className="medium-5 large-5 end columns">
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
                    <div className="medium-4 large-4 columns">
                      <div className="upper-nav">
                        <div>
                          <p className="who-is">Alicia Lew</p>
                          <p className="with">with <a>50 others</a></p>
                        </div>
                        <img alt="" src={require('../../assets/images/dum-pro.png')} className="top-img"/>
                      </div>


                      <div className="lower-nav">
                          {showCopied}
                          <button className="sett-btn sett-share-btn" onClick={this.copyToClipboard} >
                            <img alt="" src={require('../../assets/images/share@2x.png')} />
                          </button>



                        <button className="sett-btn" onClick={this.onClickSetting}>
                          <img alt="" src={require('../../assets/images/gear@2x.png')} />
                        </button>
                        {showLeaveMsg}
                        {showJoin}
                      </div>
                    </div>

                </div>
              </div>
              <div ref={(el) => { this.messagesContainer = el; }}  className="chat-container">
                {showMessage}
              </div>

              <div className="send-container">
                <label for="file-upload" className="custom-file-upload">
                      <img src={require('../../assets/images/group-2@2x.png')} alt=""/>
                     <input id="file-upload" type="file"/>
              </label>

                <input
                  name="chat"
                  value={this.state.newChat.text}
                  placeholder="Say Something"
                  className="input-chat"
                  onChange={this.onChangechatValue}
                  onKeyPress={this._handleKeyPress}
                  />
                <button className="send-btn" onClick={this.onClickSend}>Send</button>


              </div>

            </div>
          </div>


        </div>



      </div>
    );
  }
}

CircleHome.contextTypes = {
 router: PropTypes.object
}

export default CircleHome;
