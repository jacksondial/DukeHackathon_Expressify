
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
    console.log("%cnetflix-subtitles-styler : observer is working... ", "color: red;");
    callback = () => {
    // .player-timedText
    const subtitles = document.querySelector(".player-timedtext");
    // console.log("Subtitles: ", subtitles)
    chrome.storage.local.get('enabled', data => {
        
            if (subtitles) {
                // subtitles.style.bottom = "100px";
                console.log("Enabled so should change");
                // .player-timedtext > .player-timedtext-container [0]
                const firstChildContainer = subtitles.firstChild;
                if (firstChildContainer) {
                // .player-timedtext > .player-timedtext-container [0] > div

                const firstChild = firstChildContainer.firstChild;
                if (firstChild) {
                    // console.log("firstChild", first)

                    async function query(data) {
                        const response = await fetch(
                            "https://api-inference.huggingface.co/models/michellejieli/emotion_text_classifier",
                            {
                                headers: { Authorization: "Bearer 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" },
                                method: "POST",
                                body: JSON.stringify(data),
                            }
                        );
                        const result = await response.json();
                        return result;
                    }

                    query({"inputs": firstChild.textContent}).then((response) => {
                        console.log("response ", response)
                        let color_res = colors[response[0][0]['label']];
                        console.log(color_res)
                        firstChild.style.backgroundColor = color_res;
                    });


                    console.log(firstChild.textContent)


                }

                }
            }
        
        if(!data.enabled){
            observer.disconnect();
        }

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
    
