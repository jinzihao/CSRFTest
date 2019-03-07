function saveTokens(tokens) {
    chrome.storage.sync.set({'csrfTokens': tokens});
}

tokens = "";

document.querySelectorAll('*').forEach(function(node) {
    if (node.name !== undefined && node.name.toUpperCase().indexOf("CSRF") !== -1) {
        if (node.tagName.toUpperCase() === "INPUT") {
            tokens += node.value + "\n";
        } else if (node.tagName.toUpperCase() === "META") {
            tokens += node.getAttribute('content') + "\n";
        }
    }
});

saveTokens(tokens);
if (tokens.length > 0) {
    alert("CSRF Tokens found: \n" + tokens);
    if (window.location.href.toLowerCase().startsWith("https://theproject.zone/cloud-forum/topic/")) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/cloud-forum/comment/" + window.location.href.split("/")[5]  + "/publish/", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("csrfmiddlewaretoken=" + tokens.split("\n")[0] + "&comment=Test+reply&comment_hash=");
        srcdoc = '<body onload=\'document.forms[0].submit()\'><form id=\'postForm\' method=\'POST\' action=\'' +
            "/cloud-forum/comment/" + window.location.href.split("/")[5]  + "/publish/" +
            '\'><input name=\'csrfmiddlewaretoken\' value=\'' + tokens.split("\n")[0] +
            '\'><input name=\'comment\' value=\'Test reply\'><input name=\'comment_hash\' value=\'\'>' +
            '</form></body>';
        document.body.innerHTML += '<iframe style="visibility: hidden" id="postFrame" srcdoc="' +
            srcdoc +'"></iframe>';
    }
}

