document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("currentRoster")) {
    var currentRoster = JSON.parse(localStorage.getItem("currentRoster"))
    var rosterTitle = Object.keys(currentRoster)[0]
    var rosterNames = currentRoster[rosterTitle]
    document.getElementById("rosterName").value = rosterTitle;

    var userDiv = document.getElementById("inputContainer"); 

    for (var i = 0; i < rosterNames.length; i++) {
    var newUserId = "name" + i;
    
    var newInput = document.createElement("input");
    newInput.type = "text";
    newInput.id = newUserId;
    newInput.value = rosterNames[i]
    var lineBreak = document.createElement("br");
    userDiv.appendChild(newInput);
    userDiv.appendChild(lineBreak)
    }
}
})


document.addEventListener("DOMContentLoaded", () => {
const userListAdd = document.getElementById("addAnother")
userListAdd.addEventListener("click", (event) => {
    event.preventDefault();

    var userDiv = document.getElementById("inputContainer"); 

    var rosterLength = userDiv.getElementsByTagName("input").length;
    var newUserId = "name" + (rosterLength+1);
    
    var newInput = document.createElement("input");
    newInput.type = "text";
    newInput.id = newUserId;
    var lineBreak = document.createElement("br");

    userDiv.appendChild(newInput);
    userDiv.appendChild(lineBreak)
    });
})

const rosterSubmit = document.getElementById("rosterSubmit")
rosterSubmit.addEventListener("click", (event) => {
    const userCollection = [];
    var userDiv = document.getElementById("inputContainer");
    var inputs = userDiv.getElementsByTagName("input")
    
    for (var i = 0; i < inputs.length; i++) {
        var value = inputs[i].value.trim();
        if (value !==""){
        userCollection.push(inputs[i].value);
        }
    }
    if (!localStorage.getItem("savedRosters")) {
        var emptyObj = {};
        localStorage.setItem("savedRosters", JSON.stringify(emptyObj))
    }

    var rosterName = document.getElementById("rosterName").value;
    var tempCollection = {}
    tempCollection[rosterName] = userCollection
    localStorage.setItem("currentRoster", JSON.stringify(tempCollection))

    var rosterObj = JSON.parse(localStorage.getItem("savedRosters"))  
    rosterObj[rosterName] = userCollection;
    localStorage.setItem("savedRosters", JSON.stringify(rosterObj))
})


document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("savedRosters")) {

    var rosterObj = JSON.parse(localStorage.getItem("savedRosters"))
    var savedRosters = document.getElementById("savedRosters")

    for (var i = 0; i < Object.keys(rosterObj).length ; i++){
        var newText = document.createElement("button");
        newText.type = "button";
        newText.className = "rosterSelect"
        newText.AutoComplete = "off"
        newText.addEventListener("click", createClickHandler(i, rosterObj));
        var breakEr = document.createElement("br")
        newText.innerHTML = Object.keys(rosterObj)[i];
        savedRosters.appendChild(newText);
        savedRosters.appendChild(breakEr)
        }
    }
}); 

function createClickHandler() {
    return function(event) {
        var currentRosterObj = {}
        var savedRosters = JSON.parse(localStorage.getItem("savedRosters"))
        var buttonName = event.target.innerHTML;
        currentRosterObj[buttonName] = savedRosters[buttonName];
        localStorage.setItem("currentRoster", JSON.stringify(currentRosterObj));
        location.reload()
    };
}

var startNew = document.getElementById("startNewRoster")
startNew.addEventListener("click", (event) => {
    localStorage.removeItem("currentRoster")
    location.reload()
})

if (localStorage.getItem("currentRoster")){
const deleteRoster = document.getElementById("delete")
var currentRoster = JSON.parse(localStorage.getItem("currentRoster"))
var currentName = Object.keys(currentRoster)
var rosterList = JSON.parse(localStorage.getItem("savedRosters"))
deleteRoster.addEventListener("click", (event) => {
    if (window.confirm("Do you want to permanently delete " + currentName + "?")) {
        delete rosterList[currentName]
        localStorage.setItem("savedRosters",JSON.stringify(rosterList))
        localStorage.setItem("currentRoster", "")
        window.reload()
    }
})
}