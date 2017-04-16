// associated to freelance-directory-client account, but specific id for chrome app client:
// (https://console.developers.google.com/apis/credentials?project=open-1365)
var CLIENT_ID = '847367303310-3836c14jv14a6b7n78c5uc6o8na8nvfc.apps.googleusercontent.com';
// or 847367303310-2r5s2224ool0ancuqqv3ga12srl8ho4j.apps.googleusercontent.com locally
// or 847367303310-nsjhti994vdpck048d3lbov85s0vi7gm.apps.googleusercontent.com for test release on chrome store
var token;

chrome.identity.getAuthToken({ 'interactive': true }, function(_token) {
  console.log('chrome.identity.getAuthToken =>', _token);
  token = _token;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('received message from content script:', sender.tab.url);
  console.log('=> sending token back:', token);
  //if (request.greeting == "hello")
  sendResponse({ token: token });
});
