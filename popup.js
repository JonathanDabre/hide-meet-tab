document.getElementById('moveTab').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: "moveMeetTab" }, (response) => {
    if (response && response.status === "done") {
      console.log("Tab moved successfully");
    }
  });
});

document.getElementById('bringBackTab').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: "bringBackMeetTab" }, (response) => {
    if (response && response.status === "done") {
      console.log("Tab brought back successfully");
    }
  });
});
