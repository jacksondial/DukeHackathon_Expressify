// const form = document.getElementById("popup-form");
// const inputElements = ["vPos", "fSize", "fColor"];

// chrome.storage.local.get(inputElements, data => {
//   inputElements.forEach(el => {
//     document.getElementById(el).value = data[el];
//   });
// });

var enabled = false; //disabled by default
var checkbox = document.querySelector("input[name=checkbox]");

chrome.storage.local.get('enabled', data => {
    console.log(data.enabled)
    enabled = data.enabled;
    if(enabled){
        checkbox.checked = true;
    }
});


// myButton.onclick = () => {
//     enabled = !enabled;
//     chrome.storage.local.set({enabled:enabled});
// };

// form.addEventListener("submit", event => {
//   event.preventDefault();
//   const [vPos, fSize, fColor] = [...inputElements.map(el => event.target[el].value)];

//   chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//     chrome.storage.local.set({ vPos, fSize, fColor });
//     chrome.scripting.executeScript(
//       {
//         target: {tabId: tabs[0].id},
//         files: ["script.js"]
//       },
//       () => {
//         const error = chrome.runtime.lastError;
//         if (error) "Error. Tab ID: " + tab.id + ": " + JSON.stringify(error);

//         chrome.tabs.sendMessage(tabs[0].id, { vPos, fSize, fColor });
//       }
//     );
//   });
// });

checkbox.addEventListener('change', function() {

    

  if (this.checked) {
    console.log("Checkbox is checked..");

    chrome.storage.local.set({enabled: true});
    enabled = true;
    console.log("Check box changed: ", enabled)
    

    chrome.action.setBadgeText({
        text: "ON",
    });

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.scripting.executeScript(
            {
            target: {tabId: tabs[0].id},
            files: ["script.js"]
            },
            () => {
            const error = chrome.runtime.lastError;
            if (error) "Error. Tab ID: " + tabs.id + ": " + JSON.stringify(error);
    
            // chrome.tabs.sendMessage(tabs[0].id);
            }
            );
        });

  } else {
    console.log("Checkbox is not checked..");

    chrome.storage.local.set({enabled: false});
    enabled = false;
    console.log("Check box changed: ", enabled)

    chrome.action.setBadgeText({
        text: "OFF",
    });

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.scripting.executeScript(
            {
            target: {tabId: tabs[0].id},
            files: ["disablescript.js"]
            },
            () => {
            const error = chrome.runtime.lastError;
            if (error) "Error. Tab ID: " + tabs.id + ": " + JSON.stringify(error);
    
            // chrome.tabs.sendMessage(tabs[0].id);
            }
            );
    });
  }
});