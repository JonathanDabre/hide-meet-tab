document.getElementById('moveTab').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: "moveMeetTab" }, (response) => {
    if (response && response.status === "done") {
      console.log("Tab moved successfully");
    }
  });
});
