// content.js

// Function to change the background color of the page
function changeBackgroundColor() {
    document.body.style.backgroundColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// Function to translate the page using a selected language
function translatePage(language) {
    // Example: Simple approach to change the page language or open translation options
    const googleTranslateUrl = `https://translate.google.com/translate?sl=auto&tl=${language}&u=${window.location.href}`;
    window.location.href = googleTranslateUrl;  // Redirecting for translation
}

// Add event listeners if needed
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'changeColor') {
        changeBackgroundColor();
    } else if (message.action === 'translatePage') {
        translatePage(message.language);
    }
});
