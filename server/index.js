const express = require('express')
const mongoose = require('mongoose')
const expenseSchema = require("./Models/expense")
const bodyParser = require('body-parser')

// const expenseModel = mongoose.model('Expense', expenseSchema)

const app = express()

app.use(bodyParser.urlencoded({extended: false}))

const mongoDbAccess = "mongodb+srv://kosponifya:admin@cluster0.e9u3mie.mongodb.net/"

mongoose.connect(mongoDbAccess, {useNewUrlparser: true}).then(()=>console.log("connected to the database")).catch((e)=>console.log(e))

const port = 3000

app.listen(port, () => {
    console.log("Hello you are listening to port" +port)
})

app.get('/', (req, res) => console.log(res.send("welcome to our webserver")))
app.get('/', (req, res) => console.log(res.send("Welcome to our web server")))

// a. GET /expenses to retrieve all data from the db

app.get('/expenses', async (req, res) => {
    let data = await expenseModel.find()
    res.send(data)
})

// b. POST /expenses to post an expense

app.post('/expenses', async (req, res) => {
    const newExpense = new expenseModel({
        name: "Transport fee",
        amount: 1000,
        date: "April 1st",
        invoice: "Transport Payment"
    }
    )

    const data = await newExpense.save()
    res.send(data) 
})

// c PUT /expenses/:id to update an id

app.put('/expenses/:id', async (req, res) => {
    const id = req.params.id

    const newExpense = new expenseModel({
        name: "Updated Transport",
        amount: 1000,
        date: "April 1st",
        invoice: "Transport Payment"
    }
    )

    let data = await expenseModel.findByIdAndUpdate(id, {$set: newExpense}, {new:true})

    res.send(data)
})


// d DELETE /expenses/:id to delete an id

app.delete('/expenses/:id', async (req, res) => {
    const id = req.params.id

   

    let data = await expenseModel.findByIdAndDelete(id)

    res.send(data)
})

// d Get /expenses/:id to get an id

app.get('/expenses/:id', async (req, res) => {
    const id = req.params.id

   

    let data = await expenseModel.findById(id)

    res.send(data)
})
