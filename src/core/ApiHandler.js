let ApiHandler = (function () {

  let getErrorMessage = function (serverResponse, defaultErrorMessage) {

        defaultErrorMessage = defaultErrorMessage ? defaultErrorMessage : "Oops! Something went wrong!";

        if (serverResponse.response && serverResponse.response.status === 400 && serverResponse.response.data && serverResponse.response.data.errorMsg) {
            return serverResponse.response.data.errorMsg;    //Get custom error message if any
        } else {
            return defaultErrorMessage;
        }
  };


  let randomUUID = function(){
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  //function to create uuid 
  let guid = function() {
    return randomUUID() + randomUUID() + '-' + randomUUID() + '-' + randomUUID() + '-' +
      randomUUID() + '-' + randomUUID() + randomUUID() + randomUUID();
  }

  let customApiHeader = function(data){

    let ping = {
      header: {
        clientUuid: localStorage.getItem('clientUuid'),
        requestUuid: "00000000-0000-0000-0000-000000000000",
        authorizationKey: "not implemented",
        platform: "WEB",
        apiVersion: "0"
      },
      argument: data
    };

    return ping;

  }

  return {
    getErrorMessage,
    customApiHeader,
    guid
  }

}());

export default ApiHandler;
