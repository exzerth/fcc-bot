
const fs = require('fs');
const fetch = require('node-fetch');

const dataPath = './api/data/managers.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    exports.getUser = (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    };

    // CREATE
    exports.register = (req, res) => {

        /* //### API TEST (json-placeholder works, looks like problem is with fpl api)

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(json => {
                console.log("First user in the array:");
                console.log(json[0]);
                console.log("Name of the first user in the array:");
                console.log(json[0].name);
        }) 
        
        */

        
        const playerId = req.body.playerid;

        fetch(`https://fantasy.premierleague.com/api/entry/${playerId}/history/`)
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

                console.log(imp);


                //perform hits subtraction from points
                let lastArr = imp.length - 1;

                if (Number(imp[lastArr].hit < 0)) {
                    console.log(Number(imp[lastArr].tp) - Number(imp[lastArr].hit))
                } else {
                    console.log("No hits")
                }
                
            }).catch( err => {
                console.log(err);
            })


        /* readFile(data => {
            const newUserId = Object.keys(data).length + 1;

            // add the new user
            data[newUserId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.send("<h1>Successful, We'll be in touch with you</h1>")
            });
        },
            true); */
    };

   












//MANAGER**

/* const managerId = document.getElementById("manager-id");
const getManager = document.getElementById("get-manager");


getManager.addEventListener("click", c)

function c() {
    let managers = []

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

        managers.push(myData.TeamName)
        console.log(managers)

    })
} */


//c()




























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