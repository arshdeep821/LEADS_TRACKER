// to deploy go to chrome://extensions


let myLeads = [];
const inputEl = document.getElementById("input-el"); // const means you can not reassign the variable
const inputBtn = document.getElementById("input-btn");
let ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

/* falsy values in JS
- false
- 0
- ""
- null       -> how you as a developer signalizes emptiness
- undefined  -> how JavaScript signalizes emptiness
- NaN (Not a Number)
*/
// const tabs = [{url: "www.google.com"}]; this is how a tab object looks like when using the chome api
// it is an array of objects, each object contains one key value pair

tabBtn.addEventListener("click", function() {
    // grab url on the current chrome tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();  // clear local storage
    myLeads = [];         // set array to be emtpy
    render(myLeads);        // render out the empty array of leads
});

// keeps the html file cleaner as all event listeners are dealt in JavaScriptl 
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    // put new item of array into local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // changes array to a string when putting it 
    // into local storage

    render(myLeads);
});


function render(leads) {// render now takes a parameter
    let listItems = "";
    for(let i = 0; i<leads.length; i++) {
        // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"      //"innerHTML" converts this text into HTML tags 
        // create element
        // set text content
        // appen to ul
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "#'>" + myLeads[i] + "</a></li>"; // use the <a> tag to get the link
        // of the link you just inputted into the list 
        // this method uses alot of quotes and stuff there is a better way to do it

        listItems += `  <li>
                            <a target='_blank' href='${leads[i]}'> ${leads[i]} </a>
                        </li>`;

        //another way of adding an element to a list (more lines of code though)
        // const li = document.createElement("li");
        // li.textContent = myLeads[i];
        // ulEl.append(li);
    }
ulEl.innerHTML = listItems;

}

/* Recap of what we learned
- const
- addEventListener
- innerHTML
- input.value
- function parameters
- template strings ``
- localStorage
- The JSON Object
- Objects in array's
*/