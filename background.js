// listen for our browerAction to be clicked
/*chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
	chrome.tabs.executeScript(null, { file: "jquery-1.11.1.min.js" }, function() {
        chrome.tabs.executeScript(null, { file: "inject.js" });
    });
});*/

chrome.tabs.onUpdated.addListener( function( tabId, changeInfo, tab ){
    if( changeInfo.status=='complete' ) {
        if( tab.url != null || tab.url != undefined ) {
            if( tab.url.includes("internshala.com/internships/") ) {
                chrome.tabs.executeScript(tabId, { file: "jquery-1.11.1.min.js" }, function() {
                    chrome.tabs.executeScript(tabId, { file: "inject.js" });
                });
            }
        }
    }
} );