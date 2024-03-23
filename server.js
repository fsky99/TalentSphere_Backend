var express = require("express")
var app = express()
var cors = require("cors")
var mysql = require("mysql")
var bcrypt = require("bcrypt")
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
//get requests
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
app.get("/users/:id", function (req, res) {
  let id = req.params.id
  if (!id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide UserID" })
  }
  dbConn.query(
    "SELECT * FROM users where id=?",
    id,
    function (error, results, fields) {
      if (error) throw error
      return res.send({
        error: false,
        data: results[0],
        message: "users list.",
      })
    }
  )
})
app.get("/employee/:userID", function (req, res) {
  let userID = req.params.userID
  if (!userID) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide userID" })
  }
  dbConn.query(
    "SELECT * FROM employee where userID=?",
    userID,
    function (error, results, fields) {
      if (error) throw error
      return res.send({
        error: false,
        data: results[0],
        message: "users list.",
      })
    }
  )
})

// insert req
app.post("/addUser", function (req, res) {
  const {
    id,
    fname,
    lname,
    username,
    email,
    password,
    type,
    dob,
    phoneno,
    country,
    address,
    gender,
    picture,
  } = req.body

  if (
    !id ||
    !fname ||
    !lname ||
    !username ||
    !email ||
    !password ||
    !type ||
    !dob ||
    !phoneno ||
    !country ||
    !address ||
    !gender
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required user details",
    })
  }

  bcrypt.hash(password, 10, function (err, hashedPassword) {
    if (err) {
      return res
        .status(500)
        .send({ error: true, message: "Error hashing password" })
    }

    dbConn.query(
      "INSERT INTO users SET ?",
      {
        id,
        fname,
        lname,
        username,
        email,
        password: hashedPassword,
        type,
        dob,
        phoneno,
        country,
        address,
        gender,
        picture,
      },
      function (error, results, fields) {
        if (error) {
          return res.status(500).send({
            error: true,
            message: "Error inserting user into database",
          })
        }
        return res.send({
          error: false,
          data: results,
          message: "New user has been created successfully.",
        })
      }
    )
  })
})

app.post("/addEvent", function (req, res) {
  const { userID, eventName, eventDate, eventTime, picture } = req.body

  if (!userID || !eventName || !eventDate || !eventTime) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required event details",
    })
  }

  dbConn.query(
    "INSERT INTO eventss (userID, eventName, eventDate, eventTime, picture) VALUES (?, ?, ?, ?, ?)",
    [userID, eventName, eventDate, eventTime, picture],
    function (error, results, fields) {
      if (error) {
        return res
          .status(500)
          .send({ error: true, message: "Error inserting event into database" })
      }
      return res.send({
        error: false,
        data: results,
        message: "New event has been created successfully.",
      })
    }
  )
})

app.post("/addSalary", function (req, res) {
  const { userID, salary } = req.body

  if (!userID || !salary) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required salary details",
    })
  }

  dbConn.query(
    "INSERT INTO salary (userID, salary) VALUES (?, ?)",
    [userID, salary],
    function (error, results, fields) {
      if (error) {
        return res.status(500).send({
          error: true,
          message: "Error inserting salary into database",
        })
      }
      return res.send({
        error: false,
        data: results,
        message: "New salary record has been created successfully.",
      })
    }
  )
})

app.post("/addBonus", function (req, res) {
  const { userID, salaryID, bonus, bonusDate } = req.body

  if (!userID || !salaryID || !bonus || !bonusDate) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required bonus details",
    })
  }

  dbConn.query(
    "INSERT INTO bonus (userID, salaryID, bonus, bonusDate) VALUES (?, ?, ?, ?)",
    [userID, salaryID, bonus, bonusDate],
    function (error, results, fields) {
      if (error) {
        return res
          .status(500)
          .send({ error: true, message: "Error inserting bonus into database" })
      }
      return res.send({
        error: false,
        data: results,
        message: "New bonus record has been created successfully.",
      })
    }
  )
})
app.post("/addEmployee", function (req, res) {
  const { userID, emprank, reports_to, job_id, department, account_no } =
    req.body

  if (!userID || !emprank || !job_id || !department) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required employee details",
    })
  }

  dbConn.query(
    "INSERT INTO employee (userID, emprank, reports_to, job_id, department, account_no) VALUES (?, ?, ?, ?, ?, ?)",
    [userID, emprank, reports_to, job_id, department, account_no],
    function (error, results, fields) {
      if (error) {
        return res.status(500).send({
          error: true,
          message: "Error inserting employee into database",
        })
      }
      return res.send({
        error: false,
        data: results,
        message: "New employee record has been created successfully.",
      })
    }
  )
})

app.post("/addTimeSheet", function (req, res) {
  const { userID, checkinTime, checkoutTime, projectName, taskName, status } =
    req.body

  if (
    !userID ||
    !checkinTime ||
    !checkoutTime ||
    !projectName ||
    !taskName ||
    !status
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required timeSheet details",
    })
  }

  dbConn.query(
    "INSERT INTO timeSheet (userID, checkinTime, checkoutTime, projectName, taskName, status) VALUES (?, ?, ?, ?, ?, ?)",
    [userID, checkinTime, checkoutTime, projectName, taskName, status],
    function (error, results, fields) {
      if (error) {
        return res.status(500).send({
          error: true,
          message: "Error inserting timeSheet into database",
        })
      }
      return res.send({
        error: false,
        data: results,
        message: "New timeSheet record has been created successfully.",
      })
    }
  )
})

app.post("/addEmployeeJobInfo", function (req, res) {
  const {
    userID,
    jobName,
    joiningDate,
    cv,
    passport,
    healthCheck,
    visa,
    jobContract,
    reportsTo,
  } = req.body

  if (
    !userID ||
    !jobName ||
    !joiningDate ||
    !cv ||
    !passport ||
    !healthCheck ||
    !visa ||
    !jobContract ||
    !reportsTo
  ) {
    return res.status(400).send({
      error: true,
      message: "Please provide all required employeejobinfo details",
    })
  }

  dbConn.query(
    "INSERT INTO employeejobinfo (userID, jobName, joiningDate, cv, passport, healthCheck, visa, jobContract, reportsTo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      userID,
      jobName,
      joiningDate,
      cv,
      passport,
      healthCheck,
      visa,
      jobContract,
      reportsTo,
    ],
    function (error, results, fields) {
      if (error) {
        return res.status(500).send({
          error: true,
          message: "Error inserting employeejobinfo into database",
        })
      }
      return res.send({
        error: false,
        data: results,
        message: "New employeejobinfo record has been created successfully.",
      })
    }
  )
})
app.post("/addEmployeeLeave", function (req, res) {
  const { userID, date, status } = req.body

  if (!userID || !date || !status) {
    return res
      .status(400)
      .send({
        error: true,
        message: "Please provide all required empleave details",
      })
  }

  dbConn.query(
    "INSERT INTO empleave (userID, date, status) VALUES (?, ?, ?)",
    [userID, date, status],
    function (error, results, fields) {
      if (error) {
        return res
          .status(500)
          .send({
            error: true,
            message: "Error inserting empleave into database",
          })
      }
      return res.send({
        error: false,
        data: results,
        message: "New empleave record has been created successfully.",
      })
    }
  )
})

app.post("/addAnonymousMessage", function (req, res) {
  const { RecieveID, title, message, attachments } = req.body

  if (!RecieveID || !title || !message) {
    return res
      .status(400)
      .send({
        error: true,
        message: "Please provide all required anonymousMessages details",
      })
  }

  dbConn.query(
    "INSERT INTO anonymousMessages (RecieveID, title, message, attachments) VALUES (?, ?, ?, ?)",
    [RecieveID, title, message, attachments],
    function (error, results, fields) {
      if (error) {
        return res
          .status(500)
          .send({
            error: true,
            message: "Error inserting anonymousMessages into database",
          })
      }
      return res.send({
        error: false,
        data: results,
        message: "New anonymousMessages record has been created successfully.",
      })
    }
  )
})
app.post("/addDirectMessage", function (req, res) {
      const { senderID, RecieveID, title, message, attachments } = req.body;
    
      if (!senderID || !RecieveID || !title || !message) {
        return res.status(400).send({ error: true, message: "Please provide all required DirectMessages details" });
      }
    
      dbConn.query(
        "INSERT INTO DirectMessages (senderID, RecieveID, title, message, attachments) VALUES (?, ?, ?, ?, ?)",
        [senderID, RecieveID, title, message, attachments],
        function (error, results, fields) {
          if (error) {
            return res.status(500).send({ error: true, message: "Error inserting DirectMessages into database" });
          }
          return res.send({
            error: false,
            data: results,
            message: "New DirectMessages record has been created successfully.",
          });
        }
      );
    });


// update request

app.put("/updateUser", function (req, res) {
      const {
            id,
            fname,
            lname,
            username,
            email,
            password,
            type,
            dob,
            phoneno,
            country,
            address,
            gender,
            picture,
          } = req.body
      
    
      if (!id) {
        return res.status(400).send({ error: true, message: "Please provide user ID" });
      }
    
      dbConn.query(
        "UPDATE users SET fname = ?, lname = ?, username = ?, email = ?, password = ?, type = ?, dob = ?, phoneno = ?, country = ?, address = ?, gender = ?, picture = ? WHERE id = ?",
        [fname, lname, username, email, password, type, dob, phoneno, country, address, gender, picture, id],
        function (error, results, fields) {
          if (error) {
            return res.status(500).send({ error: true, message: "Error updating user in the database" });
          }
          return res.send({ error: false, data: results, message: "User has been updated successfully." });
        }
      );
    });
    

















    
// delete request
app.delete("/deleteUser", function (req, res) {
  const { id } = req.query

  if (!id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" })
  }
  dbConn.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    function (error, results, fields) {
      if (error) throw error
      return res.send({
        error: false,
        data: results,
        message: "User has been updated successfully.",
      })
    }
  )
})

app.listen(3000, function () {
  console.log("Node app is running on port 3000")
})

module.exports = app
