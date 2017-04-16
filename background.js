// associated to freelance-directory-client account, but specific id for chrome app client:
// (https://console.developers.google.com/apis/credentials?project=open-1365)
var CLIENT_ID = '847367303310-3836c14jv14a6b7n78c5uc6o8na8nvfc.apps.googleusercontent.com';
// or 847367303310-2r5s2224ool0ancuqqv3ga12srl8ho4j.apps.googleusercontent.com locally
var token;

chrome.identity.getAuthToken({ 'interactive': false }, function(_token) {
  console.log('TOKEN - ', _token);
  //chrome.storage.sync.set({ token: token }, () => {})
  token = _token;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('received message from content script:', sender.tab.url);
  //if (request.greeting == "hello")
  sendResponse({ token: token });
});

/*
window.gapi_onload = function(){
  console.log('gapi loaded.', gapi.auth, gapi.client);
  console.log('href', window.location.href);

  var config = {
    'immediate': true,
    'client_id': CLIENT_ID,
    'scope': 'https://www.google.com/m8/feeds'
  };

  // TODO: this relies on my cookie? (login popup needed?)
  gapi.auth.authorize(config, function(res) {
    console.log('gapi.auth.authorize =>', res);
    if (res.error) {
      alert('Contacts for Google Inbox, error: ' + res.error);
    } else {
      token = gapi.auth.getToken();
    }
  });
}
*/

// TODO: remove gapi-client.js and its mentions
