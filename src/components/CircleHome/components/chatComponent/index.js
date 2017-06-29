import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../redux/actions/userActions';
import * as groupActions from '../../redux/actions/groupActions';
import * as groupsActions from '../../redux/actions/groupsActions';
import * as commentActions from '../../redux/actions/commentActions';
import ApiHandler from '../../core/ApiHandler';
import './style.css';
import _ from 'lodash';
import moment from 'moment';
import Modal from 'react-modal';


class ChatComponent extends Component {

  constructor(props){
    super(props);

    this.state={
      currentUser:props.currentUser ? props.currentUser : {},
      currentGroup: props.currentGroup ? props.currentGroup : {},
      savedGroups: props.savedGroups ? props.savedGroups : {},
      comments: props.comments ? props.comments : {},
      inLeaveMsg: false,
      copied: false,
      joined:false,
      newChat:{
        comment:''
      },
      profileOption:false,
      msgOptions:{},
      onHover:{},
      showModalPhoto: false,
      groupId:props.groupId,
    }


    this.onChangechatValue = this.onChangechatValue.bind(this);
    this.onClickSend = this.onClickSend.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.onClickSetting = this.onClickSetting.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.onClickJoinCircle = this.onClickJoinCircle.bind(this);
    this.onClickSignOut = this.onClickSignOut.bind(this);
    this.onClickDeleteBtn = this.onClickDeleteBtn.bind(this);
    this.onClickShareBtn = this.onClickShareBtn.bind(this);
    this.onClickCopyBtn = this.onClickCopyBtn.bind(this);
    this.onclickMsgOptions = this.onclickMsgOptions.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClickLeaveCirlce = this.onClickLeaveCirlce.bind(this);
    this.onClickGoToGroup = this.onClickGoToGroup.bind(this);

    this.loadUserProfileFromBackend();
    this.loadRequestedGroupFromBackend();
    this.loadUserSavedGroups();
    this.loadGroupComments();

  }

  //Called any time the Props have Changed in the Redux Store
componentWillReceiveProps(nextProps) {

    //Check if the Props for user have in fact changed.
    if (this.props.currentUser !== nextProps.currentUser) {
        this.setState({currentUser: nextProps.currentUser });
    }

    //Check if the Props for group have in fact changed.
    if (this.props.currentGroup !== nextProps.currentGroup) {
        this.setState({currentGroup: nextProps.currentGroup });
    }

    //Check if the Props for group have in fact changed.
    if (this.props.savedGroups !== nextProps.savedGroups) {
        this.setState({savedGroups: nextProps.savedGroups });
    }

    //Check if the Props for group comments have in fact changed.
    if (this.props.comments !== nextProps.comments) {
        this.setState({comments: nextProps.comments });
    }
}

  componentDidMount(){

    this.scrollToBottom();

  }


  onClickLeaveCirlce(groupId){

    let id = '';
    if(groupId){
      id= groupId;
    } else{
      id = this.props.groupId;
    }

    let ping = ApiHandler.customApiHeader({groupId:id});
    this.props.actions.leaveGroupRequest({ping}).then(response => {

      this.setState({joined:false});
    }).catch(error => {

      const errorMessage = ApiHandler.getErrorMessage(error);
          console.log(errorMessage);
    });


  }

  onClickGoToGroup(group){

    let groupId = group.uuid;
    this.setState({currentGroup:group, groupId});
    this.loadRequestedGroupFromBackend(group.uuid);
    this.loadGroupComments(group.uuid);

    // this.render();
  }

  loadUserProfileFromBackend(){

    let ping = ApiHandler.customApiHeader({});

    this.props.actions.loadCurrentUser(ping).then( response => {
      this.setState({currentUser:response});
    }).catch(error => {
      const errorMessage = ApiHandler.getErrorMessage(error);
          console.log(errorMessage);
    });



  };

  loadUserSavedGroups(){
    let pingTest = ApiHandler.customApiHeader({location:{accuracy:0,latitude:37.785834,longitude:-122.406417}});

    this.props.actions.getSavedGroups(pingTest).then( response => {

      this.setState({savedGroups: response});
    }).catch(error => {
      const errorMessage = ApiHandler.getErrorMessage(error);
          console.log(errorMessage);
    });
  }

  loadRequestedGroupFromBackend(groupId){
    let id = '';
    if(groupId){
      id= groupId;
    } else{
      id = this.props.groupId;
    }

    let ping = ApiHandler.customApiHeader({groupId:id});
    debugger
    this.props.actions.loadRequestedGroup(ping).then( response => {
      this.setState({currentGroup: response});
      console.log(response);
    }).catch(error => {

      const errorMessage = ApiHandler.getErrorMessage(error);
      console.log(errorMessage);
    });

  }

  loadGroupComments(groupId){

    let id = '';
    if(groupId){
      id= groupId;
    } else{
      id = this.props.groupId
    }

    let ping = ApiHandler.customApiHeader({groupId:id});
    this.props.actions.loadRequestedGroupChats(ping).then( response => {
      if(response){
        this.setState({comments: response});
      }
      console.log(response);
    }).catch(error => {
      debugger
      const errorMessage = ApiHandler.getErrorMessage(error);
      console.log(errorMessage);
    });
  }


  //check if user has the group or not, if not add the join button
  userJoinedGroup(groupId){
    let id = '';
    if(groupId){
      id= groupId;
    } else{
      id = this.props.groupId;
    }


    let checkTrue = [];
    let savedGroups = this.state.savedGroups.groups;
    for (var group in savedGroups) {
      for(var key in savedGroups[group]){
        if(key === 'uuid' &&  savedGroups[group]['uuid'] === id){
          checkTrue.push(true);
        } else {
          checkTrue.push(false);
        }
      }

    }

    if(checkTrue.includes(true)){
      return true;
    } else {
      return false;
    }
  }

  copyToClipboard(){
    this.state.copied ? this.setState({copied: false}) : this.setState({copied: true});
  }

  onMouseOver(chatId){
    let onHover = this.state.onHover;
    onHover[chatId] = true;
    this.setState({onHover});
  }

  onMouseOut(chatId){

    let onHover = this.state.onHover;
    onHover[chatId] = false;
    this.setState({onHover});
  }



  onClickJoinCircle(){

    let ping = ApiHandler.customApiHeader({groupId:this.state.groupId})
    this.props.actions.saveGroupRequest(ping).then(response => {
      this.setState({joined: true});
    }).catch(error => {
      const errorMessage = ApiHandler.getErrorMessage(error);
          console.log(errorMessage);
    });

  }

  onClickSignOut(){
    this.props.actions.logout();
    this.context.router.push('/');
  }

  onClickDeleteBtn(chat){
    let ping = ApiHandler.customApiHeader({commentId: chat.uuid});
    debugger
    this.props.actions.deleteComment(ping, this.state.groupId).then(response => {
      this.loadGroupComments(this.state.groupId);
    }).catch(error => {
      const errorMessage = ApiHandler.getErrorMessage(error);
          console.log(errorMessage);
    });

  }

  onClickShareBtn(){

  }

  onClickCopyBtn(){

  }

  onclickMsgOptions(chatId){
    let msgOptions = this.state.msgOptions;

    if(msgOptions[chatId] ){
      msgOptions[chatId] = false;

    } else {
        msgOptions[chatId] = true;
    }
   this.setState({msgOptions});
  }


  onChangechatValue(e){

    e.preventDefault();

    let newChat={};
    newChat.comment = e.target.value;
    newChat.uuid = ApiHandler.guid();
    newChat.groupId = this.state.currentGroup.uuid;
    newChat.location = this.state.currentGroup.location;

    this.setState({newChat});

  }

  onClickSetting(){
    this.state.inLeaveMsg ?  this.setState({inLeaveMsg:false}) : this.setState({inLeaveMsg:true});
  }

  onClickSend(){

    let newChat = this.state.newChat;
    let ping = ApiHandler.customApiHeader(newChat);
    if(this.state.newChat.comment !== ''){
      debugger
          this.props.actions.createNewComment(ping, newChat).then( response => {
            debugger
            newChat.comment = "";
            this.setState({newChat});
            this.loadGroupComments(newChat.groupId);
          }).catch(error => {

            const errorMessage = ApiHandler.getErrorMessage(error);
                console.log(errorMessage);
          });

    }

  }

  _handleKeyPress(e){
    if(this.state.newChat.text !== ''){
      if (e.key === 'Enter') {
        let newChat = this.state.newChat;
        let ping = ApiHandler.customApiHeader(newChat);
        if(this.state.newChat.comment !== ''){

              this.props.actions.createNewComment(ping).then( response => {

                newChat.comment = "";
                this.setState({newChat});
                this.loadGroupComments(newChat.groupId);
              }).catch(error => {

                const errorMessage = ApiHandler.getErrorMessage(error);
                    console.log(errorMessage);
              });
        }
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
        showMessage = <div/>,
        showJoin = <div/>,
        photoModal=<div/>,
        showSavedGroups=<div/>,
        userName="",
        photo="",
        userId="",
        groupName="",
        groupLocation="",
        groupPhoto="",
        groupOwner="",
        ownerPhoto="",
        favotireCount="";

        if(!_.isEmpty(this.state.currentUser)){
          userName= `${this.state.currentUser.name.first} ${this.state.currentUser.name.last}`;
          photo=this.state.currentUser.photo;
          userId= this.state.currentUser.id;
        }

        if(!_.isEmpty(this.state.currentGroup)){
          groupName= this.state.currentGroup.title;
          groupLocation=this.state.currentGroup.locationName;
          groupPhoto=this.state.currentGroup.coverContent.content;
          groupOwner=this.state.currentGroup.owner.name;
          ownerPhoto = this.state.currentGroup.owner.photo;
          favotireCount = this.state.currentGroup.favoriteCount;
        }

        const customStyles = {

          overlay : {
            position          : 'fixed',
            top               : 0,
            left              : 0,
            right             : 0,
            bottom            : 0,
            backgroundColor   : 'rgba(0, 0, 0, 0.38)',

          },
          content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            padding           : '20px 20px 0px'
          }
        };

        photoModal = (
          <Modal
          isOpen={this.state.showModalPhoto}
          onRequestClose={() => this.setState({showModalPhoto: false})}
          style={customStyles}
          contentLabel="Example Modal">
          <img style={{width: '799px',
	                     height: '532px'}} src={groupPhoto} alt=""/>
          <div className="text-center ">
            <button className="close-btn" onClick={() => this.setState({showModalPhoto:false})}>Close</button>
          </div>

        </Modal>
        )


      if(this.state.inLeaveMsg){
        showLeaveMsg=(
          <div className="leave-cir-container" onClick={this.onClickLeaveCirlce.bind(this,this.state.currentGroup.uuid)}>
            <img alt="" src={require('../../assets/images/leave-circle@2x.png')} />
          </div>
        )
      }

      if(!_.isEmpty(this.state.savedGroups)){
        showSavedGroups = this.state.savedGroups.groups.map((group) => {
          return(
            <Link {...this.props} to={`/${group.uuid}`} onClick={() => this.onClickGoToGroup(group)} key={group.uuid}>
              <p className="title">{group.title}</p>
            </Link>
          )
        })
      }


      if(this.state.copied){
        showCopied = (
          <span className="copied-text">Link Copied!</span>
        )
      };

      if(!this.state.joined && !this.userJoinedGroup(this.state.currentGroup.uuid)){
        showJoin = (
          <button  onClick={this.onClickJoinCircle} className="join-btn">Join</button>
        )
      }

      if(!_.isEmpty(this.state.comments)){
        showMessage = this.state.comments.map((chat)=>{


          if(chat.author.id !== userId){
            return (

              <div className="msg-container"
                   key={chat.uuid}>

                <div className="user">
                  <img src={chat.author.photo} alt="your" className="user-photo"/>
                  <span className="username">{chat.author.name}</span>
                </div>

                <div className="msg" ref={`hover${chat.uuid}`} >
                  <p onMouseOut={this.onMouseOut.bind(this,chat.uuid)} onMouseOver={this.onMouseOver.bind(this,chat.uuid)}>{chat.comment}</p>
                </div>
                { this.state.onHover[chat.uuid] ?
                  <div className="hover-time-container">
                    <div>
                      <div className="arrow-up"></div>
                      <p>{moment.unix(chat.creationTime/1000).fromNow()} @{moment.unix(chat.creationTime/1000).format("h:mm a")}</p>
                    </div>
                  </div>
                : <div/>
            }

              </div>
            )
          } else {
            return(
              <div className="row">
                <div key={chat.uuid} className="main-cur-container medium-12 large-12 columns ">
                  <div className="cur-msg-container">
                    <div className="cur-msg" onClick={this.onclickMsgOptions.bind(this,chat.uuid)} >
                      <p >{chat.comment}</p>
                    </div>
                    <div className="cur-user">
                      <img src={chat.author.photo} alt="your" className="cur-user-photo"/>
                      <span className="cur-username">{chat.author.name}</span>
                    </div>

                  </div>
                  {this.state.msgOptions[chat.uuid] ?
                    <div className="msgOptions-container">
                      <button className="dl-btn" onClick={this.onClickDeleteBtn.bind(this,chat)}>
                        <img src={require('../../assets/images/ic-delete-black-24-px@2x.png')} alt="" />
                      </button>

                      <button className="dl-btn" onClick={this.onClickShareBtn.bind(this,chat.uuid)}>
                        <img src={require('../../assets/images/ic-share-black-24-px@2x.png')} alt="" />
                      </button>

                      <button className="dl-btn" onClick={this.onClickCopyBtn.bind(this,chat.uuid)}>
                        <img src={require('../../assets/images/ic-content-copy-black-24-px@2x.png')} alt="" />
                      </button>
                    </div> :
                  <div/>}
                </div>
              </div>


            )
          }
        });


      }

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
                <img src={photo} className="profile-img" alt=""/>
                { userName}
              </button> :
              <button className="profile-btn-sign" onClick={() => this.setState({profileOption:false})}>
                <img src={photo} className="profile-img" alt=""/>
                {userName }
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
              {showSavedGroups}
            </div>

          </div>
          <div className="large-7 end columns">
            <div className="circle-container">
              <div className="border-bottom-1">
                <div className="row cir-nav">
                  <div className="medium-2 large-2 columns">
                    <button className="circle-pro-img" onClick={() => this.setState({showModalPhoto:true})}>
                      <img alt="" src={groupPhoto} className="cir-nav-img"/>
                    </button>
                    {photoModal}
                  </div>

                    <div className="medium-5 large-5 end columns">
                      <p className="e-title">
                        {groupName}
                      </p>
                      <div className="loc-container">
                        <img src={require('../../assets/images/combined-shape@2x.png')} alt="icon" className="loc-icon"/>
                        <p className="e-location">
                          {groupLocation}
                        </p>
                      </div>
                    </div>
                    <div className="medium-5 large-5 columns">
                      <div className="medium-12 large-12 columns">
                        <div className="upper-nav">
                          <div >
                            <p className="who-is">{groupOwner}</p>
                            <p className="with">with <a>{favotireCount} others</a></p>
                          </div>
                          <img alt="" src={ownerPhoto} className="top-img"/>
                        </div>
                      </div>
                      <div className="medium-12 large-12 columns ">
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
              </div>
              <div ref={(el) => { this.messagesContainer = el; }}  className="chat-container">
                {showMessage}
              </div>

              <div className="send-container">
                <div className="main-send-container">
                  <label for="file-upload" className="custom-file-upload">
                        <img src={require('../../assets/images/group-2@2x.png')} alt=""/>
                       <input id="file-upload" type="file"/>
                 </label>
                  <input
                    name="comment"
                    value={this.state.newChat.comment}
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
      </div>
    );
  }
}

ChatComponent.contextTypes = {
 router: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  let groupId= ownProps.params.groupId;
    return {
        groupId: groupId,
        currentUser: state.user.currentUser,
        comments: state.comments.comments,
        savedGroups: state.groups.savedGroups,
        currentGroup: state.group.currentGroup
    }
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({...userActions,...groupActions, ...commentActions,...groupsActions}, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);
