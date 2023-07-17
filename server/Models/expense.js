const mongoose = require('mongoose')
//here we just created the class mongoose
const expenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    date: String,
    invoice: String
})
module.exports = expenseSchema
// here we permit our class expenseSchema to accessible every where 
