chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    fetch('http://localhost:3000/traffic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    });
    return {};
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);