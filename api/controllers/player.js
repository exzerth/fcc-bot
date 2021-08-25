const express = require('express')
const request = require('request')
const User = require('../models/users')
const Table = require('../models/tables')
let automaticQualifiedManagers = [];

    
const PlayerController = {

    //AUTOMATIC QUALIFICATIONS
    makeUser: function(req, res) {

        const managerName = req.body.managerName;
        const teamName = req.body.teamName;
        const fplId = req.body.fplId;
        const points = req.body.points;
        const hits = req.body.hit;
        const totalPoints = req.body.totalPoint;

        User.findOne({fpl_id: fplId}, (err, data) => {
            if(data) {
                return res.json('user already registered')
            }
            let qualifiedUser = new User({
                manager_name: managerName,
                team_name: teamName,
                fpl_id: fplId,
                points: points,
                hit: hits,
                total_point: totalPoints
            })
            automaticQualifiedManagers.push(qualifiedUser);
            qualifiedUser.save((err, result) => {
                //console.log(result);
                res.json({
                    message: "champion saved successfully",
                    result: result
                })
            })
            console.log(automaticQualifiedManagers)
        })
    },


    // READ
    getUser: function(req, res) {
        //get all users
        User.find({}, (err, data) => {
            res.json(data)
        })
    },


        //UPDATE
        updateUser: function(req, res) {
        
            User.find({}, (err, data) => {
                //console.log(data)
                data.forEach(manager => {
                    //console.log(manager.fpl_id)
                    const managerUrl = `https://fantasy.premierleague.com/api/entry/${manager.fpl_id}/history/`;
                    request(managerUrl, (err, resp, body) => {
                        const newBody = JSON.parse(body);
                        const managerHistory = (Object.values(newBody))[0];
                        //console.log(managerHistory)
                        managerHistory.forEach(element => {
                            let filter = {fpl_id: manager.fpl_id};
                            let update = {
                                hit: element.event_transfers_cost,
                                total_point: element.total_points
                            };
                            User.findOneAndUpdate(filter, update, {returnOriginal: false}, (err, doc) => {
                                res.end()
                            })
                            /* console.log(manager.fpl_id)
                            console.log(element.overall_rank) */
                        })
                    });
                });
            });
        },


    // CREATE
    registerUser: function(req, res) {
   
        let playerId = req.body.playerid;

        const fplUrl = `https://fantasy.premierleague.com/api/leagues-classic/723328/standings/`;

        request(fplUrl, (err, resp, body) => {
                const data = JSON.parse(body)
                //filter values of object returned into an array
                const newData = Object.values(data)
                //get last array
                const managersArr = (newData[newData.length - 1]).results;
                //cutout first 30
                const qualifiedManagers = managersArr.slice(0, 32)
                //console.log(qualifiedManagers)

                let matchFound = false;
                for(let i = 0; i < qualifiedManagers.length; i++) {
                    if(+playerId === qualifiedManagers[i].entry) {
                        matchFound = true;
                    User.findOne({fpl_id: playerId}, (err, data) => {
                        if(data) {
                            return res.json('user already registered')
                        }
                        let newUser = new User({
                                manager_name: qualifiedManagers[i].player_name,
                                team_name: qualifiedManagers[i].entry_name,
                                fpl_id: playerId,
                                points: qualifiedManagers[i].event_total,
                                hit: 0,
                                total_point: 0
                            })
                            newUser.save((err, result) => {
                                //console.log(result);
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

        //winners check
    },


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