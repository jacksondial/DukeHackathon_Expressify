        
        // chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
        //     console.log("Got message")
        //     chrome.storage.local.get('enabled', data => {
        //         if (data.enabled) {
        //             changeSubtitlesStyle();
        //         }
        // });

        var colors = {
            "disgust": "#EA5AF1",
            "neutral": "#FFCABD",
            "sadness": "#FE7DFF",
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
            console.log("Subtitles: ", subtitles)
            if (subtitles) {
                // subtitles.style.bottom = "100px";
                console.log("Enabled so should change");
                // .player-timedtext > .player-timedtext-container [0]
                const firstChildContainer = subtitles.firstChild;
                if (firstChildContainer) {
                // .player-timedtext > .player-timedtext-container [0] > div

                const firstChild = firstChildContainer.firstChild;
                if (firstChild) {

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
                        let color_res = colors[response[0][0]['label']];
                        firstChild.style.backgroundColor = color_res;
                    });


                    // console.log("Enabled: ", data.enabled)
                    console.log(firstChild.textContent)

                    // for (const span of firstChild.childNodes) {
                    //     // .player-timedtext > .player-timedtext-container [1] > span
                    //     console.log(span.textContent)
                    //   }
                }
        
                //   // .player-timedtext > .player-timedtext-container [1]
                //   const secondChildContainer = firstChildContainer.nextSibling;
                //   if (secondChildContainer) {
                //     for (const span of secondChildContainer.childNodes) {
                //       // .player-timedtext > .player-timedtext-container [1] > span
                //       span.style.fontSize = fSize + "px";
                //       span.style.fontWeight = "normal";
                //       span.style.color = fColor;
                //       console.log(span)
                //     }
                //     secondChildContainer.style.left = "0";
                //     secondChildContainer.style.right = "0";
                //   }
                }
            }
            };
        
            const observer = new MutationObserver(callback);
            observer.observe(document.body, {
            subtree: true,
            attributes: false,
            childList: true
            });
        };

        chrome.storage.local.get('enabled', data => {
            if (data.enabled) {
                changeSubtitlesStyle();
            }});
        // console.log("Got message")
        // console.log("Enabled: ", data.enabled)

    // } else {
    //     //it is disabled
    // }
// });