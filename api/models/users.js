const mongoose = require('mongoose');

//Schema for user
const userSchema = new mongoose.Schema({
    manager_name: String,
    team_name: String,
    fpl_id: 'number',
}),

//Define the model for user
 User = mongoose.model('User', userSchema);

module.exports = User;