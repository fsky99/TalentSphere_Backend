var express = require("express")
var app = express()
var cors = require("cors")
var mysql = require("mysql")
app.use(cors({ origin: "http://localhost:3306" }))
var bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// default route
app.get("/", function (req, res) {
  return res.send({ error: true, message: "hello" })
})

var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "talent",
})

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})
app.get("/users", function (req, res) {
  dbConn.query("SELECT * FROM users", function (error, results, fields) {
    if (error) throw error
    return res.send({ error: false, data: results, message: "users list." })
  })
})
app.get("/employee", function (req, res) {
  dbConn.query("SELECT * FROM employee", function (error, results, fields) {
    if (error) throw error
    return res.send({ error: false, data: results, message: "users list." })
  })
})
app.get("/DirectMessages", function (req, res) {
  dbConn.query(
    "SELECT * FROM DirectMessages",
    function (error, results, fields) {
      if (error) throw error
      return res.send({ error: false, data: results, message: "users list." })
    }
  )
})
app.get("/anonymousMessages", function (req, res) {
  dbConn.query(
    "SELECT * FROM anonymousMessages",
    function (error, results, fields) {
      if (error) throw error
      return res.send({ error: false, data: results, message: "users list." })
    }
  )
})

app.get("/empleave", function (req, res) {
  dbConn.query("SELECT * FROM empleave", function (error, results, fields) {
    if (error) throw error
    return res.send({ error: false, data: results, message: "users list." })
  })
})
app.get("/employeejobinfo", function (req, res) {
  dbConn.query(
    "SELECT * FROM employeejobinfo",
    function (error, results, fields) {
      if (error) throw error
      return res.send({ error: false, data: results, message: "users list." })
    }
  )
})
app.get("/timeSheet", function (req, res) {
  dbConn.query("SELECT * FROM timeSheet", function (error, results, fields) {
    if (error) throw error
    return res.send({ error: false, data: results, message: "users list." })
  })
})

app.get("/bonus", function (req, res) {
  dbConn.query("SELECT * FROM bonus", function (error, results, fields) {
    if (error) throw error
    return res.send({ error: false, data: results, message: "users list." })
  })
})

app.get("/salary", function (req, res) {
  dbConn.query("SELECT * FROM salary", function (error, results, fields) {
    if (error) throw error
    return res.send({ error: false, data: results, message: "users list." })
  })
})
app.get("/eventss", function (req, res) {
      dbConn.query("SELECT * FROM eventss", function (error, results, fields) {
        if (error) throw error
        return res.send({ error: false, data: results, message: "users list." })
      })
    })
    

app.listen(3000, function () {
  console.log("Node app is running on port 3000")
})

module.exports = app
