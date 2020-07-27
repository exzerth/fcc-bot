const playerId = document.getElementById("player-id");
const getScore = document.getElementById("get-score");


getScore.addEventListener("click", a)

function a() {
    fetch(`https://fantasy.premierleague.com/api/entry/${playerId.value}/history/`)
    .then(res => res.json())
    .then(data => {
        //filter values of object returned into an array
        let newData = Object.values(data)
        //delete las two arrays
        newData.splice(1, 2)
        //console log values of the new array
        console.log(newData[0])

        let imp = []
        //filter out required data and push to an array
        newData[0].forEach(current => {
            imp.push({
                "tp": current.points,
                "hit": current.event_transfers_cost
            })
        });
        //perform hits subtraction from points
        console.log(Number(imp[2].tp) - Number(imp[2].hit))
    })
}

//a()





/* function a() {
    fetch("https://fantasy.premierleague.com/api/entry/3413/history/")
    .then(res => res.json())
    .then(data => {
        //filter values of object returned into an array
        let newData = Object.values(data)
        //delete las two arrays
        newData.splice(1, 2)
        //console log values of the new array
        console.log(newData[0])

        let imp = []
        //filter out required data and push to an array
        newData[0].forEach(current => {
            imp.push({
                "tp": current.points,
                "hit": current.event_transfers_cost
            })
        });
        //perform hits subtraction from points
        console.log(Number(imp[2].tp) - Number(imp[2].hit))
    })
}

a() */


/* function c() {
    fetch("https://fantasy.premierleague.com/api/bootstrap-static/")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let newData = Object.values(data)
        newData.splice(1, 2)
        console.log(newData[0])

        newData[0].forEach(current => {
            console.log({
                "hit": current.event_transfers_cost
            })
        });
    })
}c()*/