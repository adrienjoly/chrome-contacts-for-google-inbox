/*
// load jquery
var script = document.createElement('script');
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(script);
*/
var token;

/*
var background = chrome.runtime.getBackgroundPage(function(background) {
	console.log('token from back:', background.token);
	token = background.token;
}); // background page
*/
/*
chrome.storage.onChanged.addListener(function(changes, namespace) {
	console.log('token changed:', changes.token);
	token = changes.token;
});
chrome.storage.sync.get('token', (value) => {
	console.log('token from back:', value);
	token = value;
})
*/
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.token);
	token = response.token;
});

function fetchUserId(email, callback) {
	console.log('fetchUserId token', token);
	/*
	return $.ajax({
		url: 'https://www.google.com/m8/feeds/contacts/default/full?alt=json&v=3.0&q=' + email,
		data: token,
	}).done(callback).fail(console.error);
	*/
	/*
	gapi.client.request({
		path:'/m8/feeds/contacts/default/full',
		params: {
			alt:'json',
			q: email,
		},
	}).then(console.log)
	*/
	fetch('https://www.google.com/m8/feeds/contacts/default/full?alt=json&v=3.0&q=' + email + '&access_token=' + token)
		.then((res) => res.json())
		.then((json) => callback(null, json.feed.entry[0].id.$t))
		.catch((error) => callback(error))
}

function attachLinks() {
	document.querySelectorAll('div[aria-expanded] [email]').forEach(function(div){
		div.onclick = function(evt) {
			evt.preventDefault();
			console.log('email:', div.getAttribute('email'))
			//window.open('https://contacts.google.com/search/' + div.getAttribute('email'));
			fetchUserId(div.getAttribute('email'), function(err, id) {
				const contactId = (id || '').split('/').pop();
				console.log('=>', err || contactId);
				window.open('https://contacts.google.com/' + contactId);
				//window.open('https://www.google.com/contacts/?cplus=1#contact/' + contactId); //OLD
			})
		};
	});
}

InboxSDK.load('2', 'sdk_inboxsdk-hlwrld_4616f707cc').then(function(sdk){
	sdk.Conversations.registerMessageViewHandler(attachLinks);
});
