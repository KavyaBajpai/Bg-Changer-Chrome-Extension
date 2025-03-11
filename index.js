async function sayHello() {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => {
            document.body.style.backgroundColor = "#edc5f0";
            document.body.style.setProperty("color", "#000", "important");
            alert('Hello from my extension!');
        }
});
}

document.getElementById("myButton").addEventListener("click", sayHello);
