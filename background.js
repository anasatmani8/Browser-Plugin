// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log("Page Tools Extension Installed");
  
    // Example of setting a default language preference when the extension is installed
    chrome.storage.local.set({ preferredLanguage: 'en' }, () => {
      console.log("Default language set to English");
    });
  });
  
  // Listen for changes in language preference and save it to storage
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'setLanguage') {
      const language = message.language;
      chrome.storage.local.set({ preferredLanguage: language }, () => {
        console.log(`Language preference updated to: ${language}`);
      });
    }
  });
  
  // Optional: Listen for tab changes or new tab creation
  chrome.tabs.onCreated.addListener((tab) => {
    console.log("A new tab was created:", tab);
  });
  
  // Store settings or handle other long-running tasks if necessary
  chrome.runtime.onConnect.addListener((port) => {
    console.log("Connected to the background script");
    port.onMessage.addListener((msg) => {
      console.log("Message received in background:", msg);
    });
  });
  