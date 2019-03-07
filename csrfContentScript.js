function saveTokens(tokens) {
    chrome.storage.sync.set({'csrfTokens': tokens});
}

tokens = "";

document.querySelectorAll('*').forEach(function(node) {
    if (node.name !== undefined && node.name.toUpperCase().indexOf("CSRF") !== -1) {
        if (node.tagName.toUpperCase() === "INPUT") {
            tokens += node.value;
        } else if (node.tagName.toUpperCase() === "META") {
            tokens += node.getAttribute('content');
        }
    }
});

saveTokens(tokens);
if (tokens.length > 0) {
    alert("CSRF Tokens found: \n" + tokens);
}