        
console.log("Disabled")

disableSubtitlesStyle = () => {
    console.log("%cnetflix-subtitles-styler : observer is working... ", "color: green;");
    callback = () => {
    // .player-timedText
    const subtitles = document.querySelector(".player-timedtext");
    // console.log("Subtitles: ", subtitles)
    if (subtitles) {
        // subtitles.style.bottom = "100px";
        // console.log("Enabled so should change");
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
};


disableSubtitlesStyle();
