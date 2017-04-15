InboxSDK.load('2', 'sdk_inboxsdk-hlwrld_4616f707cc').then(function(sdk){
	/*
	sdk.Compose.registerComposeViewHandler(function(composeView){
		// a compose view has come into existence, do something with it!
		composeView.addButton({
			title: "My Nifty Button!",
			iconUrl: 'https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365',
			onClick: function(event) {
				event.composeView.insertTextIntoBodyAtCursor('Hello World!');
			},
		});
	});
	*/

	// user clicked on a thread of messages
	sdk.Conversations.registerThreadViewHandler(function(conversationsView){
		/*
		conversationsView.on('contactHover', function(evt) {
			var email = evt.contact.emailAddress;
			console.log('hover', email);
			document.querySelectorAll('div[email=]')
		});
		*/
		document.querySelectorAll('div[email]').forEach(function(div){
			div.onclick = function() {
				window.open('https://contacts.google.com/search/' + div.getAttribute('email'));
			};
		});
		conversationsView.on('destroy', function(evt) {
			console.log('destroy', conversationsView); // never happens, for some reason...
		});
	});

});
