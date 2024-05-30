chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "moveMeetTab") {
    moveMeetTabToHiddenWindow();
    sendResponse({ status: "done" });
  }
});

function moveMeetTabToHiddenWindow() {
  chrome.tabs.query({ url: "*://meet.google.com/*" }, (tabs) => {
    if (tabs.length > 0) {
      const meetTab = tabs[0];
      // First, create a hidden window
      chrome.windows.create({ state: 'minimized' }, (newWindow) => {
        // Move the Meet tab to the hidden window
        chrome.tabs.move(meetTab.id, { windowId: newWindow.id, index: -1 }, () => {
          // Optionally minimize the new window again to ensure it stays hidden
          chrome.windows.update(newWindow.id, { state: 'minimized' });
        });
      });
    } else {
      console.log("No Google Meet tab found.");
    }
  });
}
