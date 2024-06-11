let originalWindowId; // Variable to store the original window ID

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "moveMeetTab") {
    moveMeetTabToHiddenWindow();
    sendResponse({ status: "done" });
  } else if (request.action === "bringBackMeetTab") {
    bringBackMeetTab();
    sendResponse({ status: "done" });
  }
});

function moveMeetTabToHiddenWindow() {
  chrome.tabs.query({ url: "*://meet.google.com/*" }, (tabs) => {
    if (tabs.length > 0) {
      const meetTab = tabs[0];
      originalWindowId = meetTab.windowId; // Store the original window ID
      chrome.storage.local.set({ originalWindowId: originalWindowId }); // Save to storage
      chrome.windows.create({ state: 'minimized' }, (newWindow) => {
        chrome.tabs.move(meetTab.id, { windowId: newWindow.id, index: -1 }, () => {
          chrome.windows.update(newWindow.id, { state: 'minimized' });
        });
      });
    } else {
      console.log("No Google Meet tab found.");
    }
  });
}

function bringBackMeetTab() {
  chrome.storage.local.get('originalWindowId', (result) => {
    originalWindowId = result.originalWindowId;
    chrome.tabs.query({ url: "*://meet.google.com/*" }, (tabs) => {
      if (tabs.length > 0) {
        const meetTab = tabs[0];
        if (originalWindowId !== undefined) { // Check if originalWindowId is valid
          chrome.tabs.move(meetTab.id, { windowId: originalWindowId, index: -1 }, () => {
            chrome.storage.local.remove('originalWindowId'); // Clear storage after moving back
          });
        } else {
          console.log("Original window ID is not available.");
        }
      } else {
        console.log("No Google Meet tab found.");
      }
    });
  });
}
