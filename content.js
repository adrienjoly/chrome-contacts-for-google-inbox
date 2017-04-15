function attachLinks() {
	document.querySelectorAll('div[aria-expanded] [email]').forEach(function(div){
		div.onclick = function(evt) {
			evt.preventDefault();
			window.open('https://contacts.google.com/search/' + div.getAttribute('email'));
		};
	});
}

InboxSDK.load('2', 'sdk_inboxsdk-hlwrld_4616f707cc').then(function(sdk){
	sdk.Conversations.registerMessageViewHandler(attachLinks);
});
