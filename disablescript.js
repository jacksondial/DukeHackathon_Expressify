        
        
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
            firstChild.style.backgroundColor = "transparent";

            // console.log("Enabled: ", data.enabled)
            // console.log(firstChild.textContent)
        }
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


changeSubtitlesStyle();
