var colors = {
    "disgust": "#EA5AF1",
    "neutral": "#FFCABD",
    "sadness": "#5E7DFF",
    "anger": "#FA5959",
    "fear": "#039953",
    "surprise": "#59CCFA",
    "joy": "#F9E458",
};

changeSubtitlesStyle = () => {
    // console.log("%cnetflix-subtitles-styler : observer is working... ", "color: red;");
    callback = () => {
    // .player-timedText
    let subtitles = "";
    
    chrome.storage.local.get('enabled', enable => {
    
    chrome.storage.local.get('currentTab', data => {
        tab = data.currentTab;
        if (tab == 'youtube') {
            subtitles = document.querySelector(".captions-text");
            for (const span of subtitles.childNodes) {

                async function query(data) {
                    const response = await fetch(
                        "https://api-inference.huggingface.co/models/michellejieli/emotion_text_classifier",
                        {
                            headers: { Authorization: "Bearer XXXXXXX" },
                            method: "POST",
                            body: JSON.stringify(data),
                        }
                    );
                    const result = await response.json();
                    return result;
                }

                query({"inputs": span.childNodes[0].textContent}).then((response) => {
                    console.log("response ", response)
                    let color_res = colors[response[0][0]['label']];
                    // console.log(color_res)
                    span.childNodes[0].style.background = color_res;
                });

              }
        } else if (tab == 'netflix') {
            subtitles = document.querySelector(".player-timedtext");
        }

    if (subtitles) {
        // .player-timedtext > .player-timedtext-container [0]
        const firstChildContainer = subtitles.firstChild;

            if (firstChildContainer) {
                if (tab == "netflix") {
                    let firstChild = firstChildContainer.firstChild;
                    // console.log("firstchild", firstChild)
                    async function query(data) {
                        const response = await fetch(
                            "https://api-inference.huggingface.co/models/michellejieli/emotion_text_classifier",
                            {
                                headers: { Authorization: "Bearer XXXXXXX" },
                                method: "POST",
                                body: JSON.stringify(data),
                            }
                        );
                        const result = await response.json();
                        return result;
                    }

                    query({"inputs": firstChild.textContent}).then((response) => {
                        // console.log("response ", response)
                        let color_res = colors[response[0][0]['label']];
                        // console.log(color_res)
                        firstChild.style.backgroundColor = color_res;
                    });


                    // console.log(firstChild.textContent)


                }

                }
            }
        
        if(!enable.enabled){
            observer.disconnect();
        }
    });
    

    });
    };

    const observer = new MutationObserver(callback);
    observer.observe(document.body, {
    subtree: true,
    attributes: false,
    childList: true,
    characterData: true,
    characterDataOldValue: true
    });
};


changeSubtitlesStyle();
    
