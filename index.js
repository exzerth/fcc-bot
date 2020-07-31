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



const managerId = document.getElementById("manager-id");
const getManager = document.getElementById("get-manager");


getManager.addEventListener("click", c)

function c() {
    fetch(`https://fantasy.premierleague.com/api/entry/${managerId.value}/`)
    .then(res => res.json())
    .then(data => {
        //console.log(data)

        let dataArr = Object.values(data)
        let myData = ({
            "Id": dataArr[0],
            "TeamName": dataArr[16],
            "ManagerName": `${dataArr[4]} ${dataArr[5]}`
        })

        let managers = []
        managers.push(myData.TeamName)
        console.log(managers)

        let items

        if (localStorage.getItem('items')) {
            items = JSON.parse(localStorage.getItem('items'))
        } else {
            items = []
        }

        localStorage.setItem('items', JSON.stringify(managers))
        //const data = JSON.parse(localStorage.getItem('items'))

    })
}


//c()

/* var repeat, studentArr = [], markArr = [];
while (repeat !== 'n' && repeat !== 'N'){
    studentArr.push(prompt("Enter Student Name: "));
    markArr.push(prompt("Enter Student Mark: "));
    repeat = prompt ("Do you want to enter another student: y/n");
}
console.log('studentArr, markArr',studentArr, markArr); */


























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