
const googleSDKLoader = (d, cid, appId, successFn, errorFn) => {

  const js = d.createElement('script');

  js.src = 'https://apis.google.com/js/platform.js';
  js.id = 'gapi-client';

  js.onload = () => {
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({
          client_id: appId,
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          scope: 'https://www.googleapis.com/auth/contacts.readonly'
        });
      }

      window.gapi.auth2.getAuthInstance().attachClickHandler(cid, {}, successFn, errorFn);
    })
  }

  if (document.getElementsByTagName('script').length === 0) {
    d.appendChild(js);
  } else {
    document.getElementsByTagName('script')[0].parentNode.appendChild(js);
  }
}

export default googleSDKLoader