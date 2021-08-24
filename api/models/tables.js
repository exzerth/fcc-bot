const mongoose = require('mongoose');

//Schema for tables
const tableSchema = new mongoose.Schema({
    tp: 'number',
    hit: 'number'
}),

//Define the model for user
Table = mongoose.model('Table', tableSchema);

module.exports = Table;