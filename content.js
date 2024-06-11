function toggleMicrophone() {
    // Comprehensive set of possible selectors for the microphone button
    const micButtonSelectors = [
      '[aria-label="Turn off microphone"]',
      '[aria-label="Turn on microphone"]',
      '[aria-label*="microphone"]',
      '[data-is-muted="true"]',
      '[data-is-muted="false"]',
      'button[jsname="BOHaEe"]',
      'button[role="button"]'
    ];
  
    let micButton = null;
    for (const selector of micButtonSelectors) {
      micButton = document.querySelector(selector);
      if (micButton) {
        break;
      }
    }
  
    if (micButton) {
      console.log("Microphone button found, clicking...");
      micButton.click();
    } else {
      console.log("Microphone button not found.");
    }
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleMicrophone") {
      console.log("toggleMicrophone message received");
      toggleMicrophone();
      sendResponse({ status: "done" });
    } else {
      console.log("Unknown message received: ", request);
    }
  });
  


