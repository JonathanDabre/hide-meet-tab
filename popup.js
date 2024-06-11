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

document.getElementById('toggleMic').addEventListener('click', () => {

  document.getElementById('toggleMic').style.backgroundColor = '#FF5733'; // Example red color
  
  // After 10 seconds, revert the color back to its original state
  setTimeout(() => {
    document.getElementById('toggleMic').style.backgroundColor = ''; // Revert to original color
  }, 2000); // 10 seconds in milliseconds

  chrome.tabs.query({ url: "*://meet.google.com/*" }, (tabs) => {
    if (tabs.length > 0) {
      console.log("Google Meet tab found, injecting script...");
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ['content.js']
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error("Script injection failed: ", chrome.runtime.lastError.message);
          } else {
            console.log("Script injected, sending toggleMicrophone message...");
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggleMicrophone" }, (response) => {
              if (response && response.status === "done") {
                console.log("Microphone toggled successfully");
              } else {
                console.error("Failed to toggle microphone.");
              }
            });
          }
        }
      );
    } else {
      console.log("No Google Meet tab found.");
    }
  });
});



