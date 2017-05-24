var token;

// wake up background.js to get the token for google apis
chrome.runtime.sendMessage({ getToken: "true" }, function(response) {
  console.log('got token:', response.token);
	token = response.token;
});

function fetchUserId(email, callback) {
	console.log('fetchUserId', email, 'with token:', token);
	fetch('https://www.google.com/m8/feeds/contacts/default/full?alt=json&v=3.0&q=' + email + '&access_token=' + token)
		.then((res) => res.json())
		.then((json) => callback(null, json.feed.entry[0].id.$t))
		.catch((error) => callback(error))
}

function attachLinks() {
	document.querySelectorAll('[data-msg-id] [email]').forEach(function(div){
		div.onclick = function(evt) {
			evt.preventDefault();
			var email = div.getAttribute('email');
			fetchUserId(email, function(err, id) {
				console.log('=>', err || id);
				if (err) {
					window.open('https://contacts.google.com/search/' + email);
				} else {
					window.open('https://contacts.google.com/' + (id || '').split('/').pop());
					/*window.open('https://www.google.com/contacts/?cplus=1#contact/' + contactId);*/ //OLD
				}
			})
		};
	});
}

InboxSDK.load('2', 'sdk_inboxsdk-hlwrld_4616f707cc').then(function(sdk){
	sdk.Conversations.registerMessageViewHandler(attachLinks);
});
