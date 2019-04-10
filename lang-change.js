const url = chrome.runtime.getURL('lettersDictionary.json');
let doctionary;

fetch(url)
    .then((response) => response.json())
    .then((json) => doctionary = json);

chrome.runtime.onMessage.addListener(
    function(request, sender) {
      if (request.changeInputLanguage)
      changeInputLanguage();
    }
);

function changeInputLanguage() {
    const selectedInput = document.activeElement;
    // alert(selectedInput.value)
    const inputValue = selectedInput.value;
    if(inputValue) {
        const valurArr = inputValue.split('');
        const transtlateArr = valurArr.map(letter => doctionary[letter] ? doctionary[letter] : letter)
        selectedInput.value = transtlateArr.join('');
        return;
    }
    const elementText = selectedInput.innerText;
    // for whatsapp web
    if(elementText && (" " + selectedInput.className + " ").replace(/[\n\t]/g, " ").indexOf(" selectable-text ") > -1) {
        const valurArr = elementText.split('');
        const transtlateArr = valurArr.map(letter => doctionary[letter] ? doctionary[letter] : letter)
        selectedInput.innerText = transtlateArr.join('');
        return;
    } 
    
}