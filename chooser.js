var currentRoster = JSON.parse(localStorage.getItem("currentRoster"))

var nameArray = currentRoster[Object.keys(currentRoster)[0]]

const randoSelect = document.getElementById("singleRandom")
randoSelect.addEventListener("click", (event) => {
    var rando = Math.floor(Math.random()* nameArray.length);
    var nameDisplay = document.getElementById("nameDisplay")
    nameDisplay.innerHTML = nameArray[rando]
})

const randoList = document.getElementById("randomList")
randoList.addEventListener("click", (event) => {

    event.preventDefault()
    var nameDisplay = document.getElementById("nameDisplay")
    nameDisplay.innerHTML = ""
    var dupliArray = nameArray.slice();
    var randoArray = [];
    while (dupliArray.length > 0) {
    var rando = Math.floor(Math.random()* dupliArray.length);
        randoArray.push(dupliArray[rando])
        dupliArray.splice(rando,1)
    }
    for (let i = 0; i < randoArray.length; i++)
    {
        var nameDiv = document.createElement("h3")
        nameDiv.id = "nameDiv" + (i + 1)
        nameDiv.innerHTML = (i + 1)+". " + randoArray[i]
        nameDisplay.appendChild(nameDiv)
    }
})


const eliminator = document.getElementById("eliminator")
eliminator.addEventListener("click", (event) => {
    event.preventDefault()
    var randoArray = [];
    var dupliArray = nameArray.slice();
    while (dupliArray.length > 0) {
    var rando = Math.floor(Math.random()* dupliArray.length);
        randoArray.push(dupliArray[rando])
        dupliArray.splice(rando,1)
    }
    nameDisplay.innerHTML = randoArray[0]
    if (document.getElementById("eliminatorNext")) {
        eliminatorNext.style.display = "inline"
    } else {
        var choosersButtons = document.getElementById("choosers")
        var newButton = document.createElement("button")
        newButton.id = "eliminatorNext"
        newButton.innerHTML = "Get Next Name!"
        choosersButtons.appendChild(newButton)
    }
    eliminator.style.display = "none"
    const eliminatorNext = document.getElementById("eliminatorNext")
    var i = 1;
    eliminatorNext.addEventListener("click", (event) => {
        event.preventDefault()

        if (i < randoArray.length) {
            nameDisplay.innerHTML = randoArray[i] 
            i++;
            detailDisplay.innerHTML = "Remaining Names: " + (randoArray.length - i);
        } else {
            nameDisplay.innerHTML = "No more names left!"
            detailDisplay.innerHTML = ""
            eliminatorNext.style.display = "none"
            eliminator.style.display = "inline"
            eliminator.removeEventListener("click", nextNameHandler);
            eliminator.addEventListener("click", nextNameHandler);
        }
    })
    function nextNameHandler(event) {
        event.preventDefault();
            i = 1;
        randoArray = [];
        dupliArray = nameArray.slice();
    
        while (dupliArray.length > 0) {
          var rando = Math.floor(Math.random() * dupliArray.length);
          randoArray.push(dupliArray[rando]);
          dupliArray.splice(rando, 1);
        }
    
        nameDisplay.innerHTML = randoArray[0];
        detailDisplay.innerHTML = "Remaining Names: " + (randoArray.length - i);
        eliminatorNext.style.display = "inline";
        eliminator.style.display = "none";
    }
})

