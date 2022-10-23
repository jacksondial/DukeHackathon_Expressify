chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ vPos: 300, fSize: 24, fColor: "#F3333F" });
  
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { hostSuffix: "netflix.com" }
            })
          ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
        }
      ]);
    });

    chrome.storage.local.set({enabled: false});

    chrome.action.setBadgeText({
        text: "off",
      });
  });
  
//   chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === "complete" && tab.active) {
//       chrome.storage.local.get(["vPos", "fSize", "fColor"], data => {
//         chrome.scripting.executeScript(
//           {
//             target: {tabId},
//             files: ["script.js"]
//           },
//           () => {
//             const error = chrome.runtime.lastError;
//             if (error) "Error. Tab ID: " + tab.id + ": " + JSON.stringify(error);
  
//             chrome.tabs.sendMessage(tabId, {
//               vPos: data.vPos,
//               fSize: data.fSize,
//               fColor: data.fColor
//             });
//           }
//         );
//       });
//     }
//   });