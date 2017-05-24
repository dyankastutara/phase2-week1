const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(3000, ()=>{
	console.log("Connected to port 3000")
})