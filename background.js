chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.message){
		chrome.tabs.query({currentWindow: true}, function (tabs) {
		    sendResponse({myTabs : tabs});
		});
		return true;
	}
});

