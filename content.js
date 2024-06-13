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
  
  function toggleCamera() {
    // Comprehensive set of possible selectors for the camera button
    const cameraButtonSelectors = [
        '[aria-label="Turn off camera"]',
        '[aria-label="Turn on camera"]',
        '[aria-label*="camera"]',
        '[data-is-muted="true"]',
        '[data-is-muted="false"]',
        'button[jsname="BOHaEe"]',
        'button[role="button"]'
    ];

    let cameraButton = null;
    for (const selector of cameraButtonSelectors) {
        cameraButton = document.querySelector(selector);
        if (cameraButton) {
            break;
        }
    }

    if (cameraButton) {
        console.log("Camera button found, clicking...");
        cameraButton.click();
    } else {
        console.log("Camera button not found.");
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleMicrophone") {
        console.log("toggleMicrophone message received");
        toggleMicrophone();
        sendResponse({ status: "done" });
    } else if (request.action === "toggleCamera") {
        console.log("toggleCamera message received");
        toggleCamera();
        sendResponse({ status: "done" });
    } else {
        console.log("Unknown message received: ", request);
    }
});



