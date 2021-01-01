const express = require('express')
//const fs = require('fs');
const request = require('request')
const User = require('../models/users')

//const dataPath = './api/data/managers.json';

    // helper methods
    /* const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
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
    }; */


    

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
                                points: 0,
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
            console.log(users)
           for(let i = 0; i < users.length; i++) {
            request(`https://fantasy.premierleague.com/api/entry/${users[i].fpl_id}/history/`, (err, resp, body) => {
                let data = JSON.parse(body)
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
                console.log(imp)
            //updating the user points and total points
            
            
            })
        }
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
*/


// let newUser = new User({
//     manager_name: needed[i].player_name,
//     team_name: needed[i].entry_name,
//     fpl_id: playerId,
//     points: imp[imp.length - 1].tp,
//     hit: imp[imp.length - 1].hit,
//     total_point: imp[imp.length - 1].tp - imp[imp.length - 1].hit
// })
// newUser.save((err, result) => {
//     console.log(result);
//     res.json({
//         message: "Registration successful",
//         result: result
//          })
// })
// })
// }) 
// break;
// }
// }