/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
PORT = 8234;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
// app.js

app.get('/', function (req, res) {
    // Declare Query 1
    let query1;

    if (req.query.lastName === undefined) {
        query1 = "SELECT * FROM Users;";
    } else {
        query1 = `SELECT * FROM Users WHERE lastName LIKE "${req.query.lastName}%"`;
    }

    db.pool.query(query1, function (error, rows, fields) {
        // Execute the query
        // let users = rows;

        return res.render("index", { data: rows }); // Render the .hbs file, and also send the renderer
    }); // an object where 'data' is equal to the 'rows' we
});

// app.js - ROUTES section

app.post('/add-user-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // // Capture NULL values
    // let homeworld = parseInt(data.homeworld);
    // if (isNaN(homeworld)) {
    //     homeworld = 'NULL'
    // }

    // let age = parseInt(data.age);
    // if (isNaN(age)) {
    //     age = 'NULL'
    // }

    // Create the query and run it on the database
    query1 = `INSERT INTO Users (firstName, lastName, email, currentAddress) VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.currentAddress}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Users
            query2 = `SELECT * FROM Users;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete("/delete-user-ajax", function (req, res, next) {
    let data = req.body;
    let usersID = parseInt(data.usersID);
    let deleteUsers = `DELETE FROM Users WHERE usersID = ?`;

    // Run the query
    db.pool.query(deleteUsers, [usersID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put("/update-user-ajax", function (req, res, next) {
    let data = req.body;
    let usersID = parseInt(data.usersID);
    let updatedFirstName = data.updatedFirstName;
    let updatedLastName = data.updatedLastName;
    let queryUpdateUser = `UPDATE Users SET firstName = ?, lastName = ? WHERE usersID = ?`;
    let selectUser = `SELECT * FROM Users WHERE usersID = ?`;

    // Run the 1st query
    db.pool.query(
        queryUpdateUser,
        [updatedFirstName, updatedLastName, usersID],
        function (error, rows, fields) {
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else {
                // Run the second query
                db.pool.query(selectUser, [usersID], function (error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                });
            }
        }
    );
});


/*
    LISTENER
*/
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});