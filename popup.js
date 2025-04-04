document.getElementById("changeColor").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            alert("No active tab found!");
            return;
        }

        const tab = tabs[0];

        // Try executing a small script to see if modification is allowed
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => true  // A simple test script
        }).then(() => {
            // If the script runs, proceed with background color change
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: changeBackgroundColor
            }).catch(err => console.error("Script execution failed:", err));
        }).catch(() => {
            alert("This action is not allowed on this page.");
        });
    });
});

document.getElementById("translateBtn").addEventListener("click", () => {
    const selectedLanguage = document.getElementById("language").value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            alert("No active tab found!");
            return;
        }

        const tab = tabs[0];

        // Try executing a small script to see if modification is allowed
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => true  // A simple test script
        }).then(() => {
            // If allowed, proceed with translation
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                args: [selectedLanguage],
                func: translatePage
            }).catch(err => console.error("Script execution failed:", err));
        }).catch(() => {
            alert("This page cannot be translated.");
        });
    });
});

function changeBackgroundColor() {
    document.body.style.backgroundColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function translatePage(language) {
    const googleTranslateUrl = `https://translate.google.com/translate?sl=auto&tl=${language}&u=${window.location.href}`;
    window.location.href = googleTranslateUrl;
}
