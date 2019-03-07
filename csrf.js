function getCSRFTokens() {
    chrome.storage.sync.get(['csrfTokens'], function(result) {
        document.getElementById("csrfTokens").innerHTML = result.csrfTokens;
    });
}

getCSRFTokens();