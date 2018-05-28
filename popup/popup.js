chrome.runtime.sendMessage({ message: "getAllTabs"},function(response){
	var i = 0;
	var parent = document.getElementsByClassName('bm-wrapper');
	response.myTabs.forEach(function(tab) {
		var searching = chrome.bookmarks.search(tab.url,function(bookmarkItems) {
			if (bookmarkItems.length) {
			    console.log("active tab is bookmarked"); 
			} else {
			    console.log("active tab is not bookmarked");
			    var label = document.createElement('label');
		        label.setAttribute('class','container');
		        label.appendChild(document.createTextNode(tab.title));

		        var checkbox = document.createElement("input");
		        checkbox.setAttribute('type','checkbox');
		        checkbox.setAttribute('id',tab.id);
		        checkbox.setAttribute('name','tabs');
		        checkbox.setAttribute('value',tab.url);

		        var span = document.createElement('span')
		        span.setAttribute('class','checkmark')

		        label.appendChild(checkbox); 
		        label.appendChild(span);
		        parent[0].appendChild(label);
		        i = i + 1;
			}
		});

       
    });
    var inputs = document.getElementsByName('tabs');

    var bookmark = document.getElementById('bookmark');

    bookmark.addEventListener('click', function() {
		inputs.forEach(function(checkbox) {
			if(checkbox.checked){
			      chrome.bookmarks.create({
                           'title': checkbox.parentNode.textContent,
                           'url': checkbox.value});
			}
		});
		alert('bookmarked successfully..!')
		window.close();
    });


});

window.addEventListener('DOMContentLoaded', function() {

	// console.log('all tabs',tabs.length);

  	var select_all = document.getElementById('select-all');

	select_all.addEventListener( 'change', function() {
	    if(this.checked) {
	        checkboxes = document.getElementsByName('tabs');
	        checkboxes.forEach(function(checkbox) {
	        	checkbox.checked = true;
	        });
	        
	    } else {

	        checkboxes = document.getElementsByName('tabs');
	        checkboxes.forEach(function(checkbox) {
	        	checkbox.checked = false;
	        });
	    }
	}); 
}, true);
