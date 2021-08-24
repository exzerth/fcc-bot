const express = require('express')
const request = require('request')
const User = require('../models/users')
const Table = require('../models/tables')

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
                //delete first two arrays
                newData.splice(0, 2)
                let d = (newData[0].results)
                //cutout first 30
                const needed = d.slice(0, 30)
                // console.log(needed)

                let matchFound = false;
                for(let i = 0; i < needed.length; i++) {
                    if(playerId == needed[i].entry) {
                        matchFound = true;
                    User.findOne({fpl_id: playerId}, (err, data) => {
                        if(data) {
                            res.json('user already registered')
                        }
                        let newUser = new User({
                                manager_name: needed[i].player_name,
                                team_name: needed[i].entry_name,
                                fpl_id: playerId,
                                points: needed[i],
                                hit: 0,
                                total_point: 0
                            })
                            newUser.save((err, result) => {
                                console.log(result);
                                res.json({
                                    message: "Registration successful",
                                    result: result
                                     })
                            })
                    })
                    break;
            }
        }
             if(matchFound == false) {
                    res.json('user didnt qualify')
                }  
        })
    },
 
                //Create new user and adding the details to the database
                //check if user already exists using fpl id
                // User.findOne({fpl_id: playerId}, (err, data) => {
                //     if(data) {
                //         res.send('user already registered!')
                //     } else {

                //         if(userIdArr.includes(Number(playerId)) === true){

                //             request(`https://fantasy.premierleague.com/api/entry/${playerId}/`, (err, resp, body) => {
                //                 let managerData = JSON.parse(body);
                //                 let managerDataArr = Object.values(managerData)

                //                 //create new user and register it
                //                 let newUser = new User({
                //                     manager_name: `${managerDataArr[4]} ${managerDataArr[5]}`,
                //                     team_name: managerDataArr[16],
                //                     fpl_id: playerId,
                //                 });
                //                 newUser.save((err, result) => {
                //                     console.log(result)
                //                     res.send({
                //                         message: "Registration successful",
                //                         result: result
                //                     })
                //                 })
                //             })  
                            
                //         } else {
                //             return res.send({
                //                 message: "You do not qualify",
                //                 reason: playerId
                //             })
                //         }
                         
                //     }
                // })


    showTables: function(req, res) {
        User.find({}, (err, users) => {
            if(err) throw err;
            //console.log(users)
            for(let i = 0; i < users.length; i++) {
                request(`https://fantasy.premierleague.com/api/entry/${users[i].fpl_id}/history/`, (err, resp, body) => {
                    let data = JSON.parse(body)
                    let newData = Object.values(data);
                
                    //delete last two arrays
                    newData.splice(1, 2)
                    //console.log(newData[0])
                    let playerArr = newData[0];
                    let requiredPlayerArr = playerArr.splice(-1);

                    /* let requiredPlayerArr = playerArr.splice(-1);
                    let n = 0;
                    let points;
                    while (n < playerArr.length){
                        points = [requiredPlayerArr.concat(requiredPlayerArr)];
                        n++; 
                    }
                    //let points = requiredPlayerArr.map(player => player.points)
                    
                    console.log(points) */

                
                    //console.log("working array", newData[0][lastNewData]);
                    let points = [];
                    let newTable = new Table ({
                        tp: requiredPlayerArr[0].points,
                        hit: requiredPlayerArr[0].event_transfers_cost
                    })
                    newTable.save((err, result) => {
                        console.log(result);
                        /* let points = Object.values(result)
                        console.log(points) */
                        
                    })

                    /* var imp = []
                    //filter out required data and push to an array
                    imp.push(impObj) */

                    //console.log("first", impObj)
                
                    

                    //perform hits subtraction from points
                    /* let lastArr = imp.length - 1;
        
                    if (Number(imp[lastArr].hit < 0)) {
                        console.log(Number(imp[lastArr].tp) - Number(imp[lastArr].hit))
                    } else {
                        console.log("No hits")
                    } */
                    //res.send(imp)
                //updating the user points and total points
                
                
                })
            }
        })

    }
}

   
module.exports = PlayerController;