const express = require('express')
const fs = require('fs');
const request = require('request')
const User = require('../models/users')

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

    const PlayerController = {

    getUser: function(req, res) {
        //get all users
        User.find({}, (err, data) => {
            res.json(data)
        })
    },





    
    // CREATE
    registerUser: function(req, res) {
   
        let playerId = req.body.playerid;

        const fplUrl = `https://fantasy.premierleague.com/api/leagues-classic/484467/standings/`;

        request(fplUrl, (err, resp, body) => {
                let data = JSON.parse(body)
                //filter values of object returned into an array
                let newData = Object.values(data)
                //console.log(newData)
                //delete first two arrays
                newData.splice(0, 2)
                let d = (newData[0].results)
                //cutout first 30
                const needed = d.slice(0, 30)
                //console.log(needed)

                let userIdArr = []
                for(let i = 0; i < needed.length; i++) {
                    const c = needed[i]
                    userIdArr = userIdArr.concat(c.entry)
                }
                //console.log(userIdArr)
            
                //Create new user and adding the details to the database
                //check if user already exists using fpl id
                User.findOne({fpl_id: playerId}, (err, data) => {
                    if(data) {
                        res.send('user already registered!')
                    } else {

                        console.log("playerid", playerId)

                        if(userIdArr.includes(Number(playerId)) === true){
                            res.send({
                                message: "Registration successful",
                                reason: playerId
                            })
                             //create new user and register it
                            /* let newUser = new User({
                                manager_name: needed.player_name,
                                team_name: needed.entry_name,
                                fpl_id: playerId,
                            });
                            newUser.save((err, result) => {
                                console.log(result)
                                res.send(result)
                            }) */ 
                            
                        } else {
                            return res.send({
                                message: "You do not qualify",
                                reason: playerId
                            })
                        }
                         
                    }
                })
    
        })

            
    
}
    }

   
module.exports = PlayerController;



/* //filter values of object returned into an array
                let newData = Object.values(data)
                //delete las two arrays
                newData.splice(1, 2)
                //console log values of the new array
                // console.log(newData[0])

                var imp = []
                //filter out required data and push to an array
                newData[0].forEach(current => {
                    imp.push({
                        "tp": current.points,
                        "hit": current.event_transfers_cost
                    })
                });

                //perform hits subtraction from points
                let lastArr = imp.length - 1;

                if (Number(imp[lastArr].hit < 0)) {
                    console.log(Number(imp[lastArr].tp) - Number(imp[lastArr].hit))
                } else {
                    console.log("No hits")
                }






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