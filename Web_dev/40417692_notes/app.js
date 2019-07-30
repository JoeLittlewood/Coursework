// ====================================================================================================================
// SET08702 2018-9 TR2 001 - Web Technologies
// Joe L - 40417692
// Coursework Part 2 submission.
// Javascript document to run SQL database for my Notes application.
// ====================================================================================================================
// References:
// https://www.codecademy.com/articles/sql-commands
// https://www.w3schools.com/sql/
// ====================================================================================================================

var sqlite3 = require("sqlite3");
var express = require("express");
var BodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var bcrypt = require("bcrypt");
var expressSession = require("express-session");

var app = express();

app.use(express.static('static'))
app.use(BodyParser.json());

app.use(BodyParser.urlencoded({
    extended: true
}));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(expressSession({
    secret: 'ohadfhdsgKSXHG38h30dkn',
    resave: false,
    saveUninitialized: false
}))

// Hosted on local host port 5000
app.listen(5000);

// Databases is created if it does not yet exist
var db = new sqlite3.Database("notes.sqlite", (err) => {

    if (err) {

        console.log('Error when creating database', err);

    } else {

        db.run("CREATE TABLE IF NOT EXISTS `users`(`userid` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `username` TEXT, `password` TEXT);");
        db.run("CREATE TABLE IF NOT EXISTS `notes`(`noteid` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `userid` INTEGER, `title` TEXT, `content` TEXT);");

    }

});

// If there is a session already, this means a user is logged in so the notes page for that user is brought up immediately upon reload of the browser
app.get("/", (request, response) => {

    if (request.session.loggedin) {

        return response.redirect("/notes");

    }

    response.render("login");

})

// When a user signs up this function sends their data to the database and logs them in
app.post("/signup", (request, response) => {

    var username = request.body.username;
    var password = request.body.pass;
    var confPass = request.body.confirmPass;

    // If all fields have been filled and the two passwords match then the data can be sent for the new user
    if (username && password && confPass) {

        if (password != confPass) {

            return response.render("login", {
                errormessagesignup: "Passwords don't match"
            })

        }

        return db.all("SELECT * FROM users WHERE username = ?;", [username], function(err, rows) {

            if (err) {

                console.log(err);

            }
            if (rows.length > 0) {

                return response.render("login", {
                    errormessagesignup: "User Exists"
                })

            }
            // The password is hashed with bcrypt before it is pasted into the database. It is re-hashed 12 times for extra security.
            password = bcrypt.hashSync(password, 12);
            return db.run("INSERT INTO users (username, password) VALUES (?,?)", [username, password], function(err) {

                if (err) {

                    console.log(err);

                }

                request.session.loggedin = true;
                request.session.username = username;
                request.session.userid = this.lastID;

                // Once the user has signed up, they can then start using the application.
                return response.redirect("/notes");

            })
        });
    }
})

// If the user has already signed up then their username and password will already be stored in the database. Therefore they can login with this function.
app.post("/signin", (request, response) => {

    var username = request.body.username;
    var password = request.body.pass;

    // If the username and password have both been input into the form then the data can be sent to the database
    if (username && password) {

        return db.all("SELECT * FROM users WHERE username = ?;", [username], function(err, rows) {
            if (err) {

                console.log(err);

            }
            // The password that has been entered and the password that has been stored are both compared for the username that has been input
            if (rows.length == 1 && bcrypt.compareSync(password, rows[0].password)) {

                // The user starts a new session and then is logged in to the notes application.
                request.session.loggedin = true;
                request.session.username = username;
                request.session.userid = rows[0].userid;
                return response.redirect("/notes");

            } else {

                return response.render("login", {
                    errormessage: "Username or password is wrong"
                })

            }
        })
    }
})

app.get("/notes", (request, response) => {

    if (request.session.loggedin) {

        return response.render("notes", {
            username: request.session.username
        });

    } else {

        return response.render("login", {
            errormessage: "You're not logged in!"
        })

    }
})

// The session is destroyed and the user is "logged out". They would have to log back in in order to access their notes.
app.get("/logout", (request, response) => {

    request.session.destroy();
    return response.redirect("/");

})

// This is a function that creates a new note. The userid, title and content are all pasted into the database where a unique noteid is also created.
app.post("/new-note", (request, response) => {

    var title = request.body.title || "New note";
    var content = request.body.content;

    if (request.session.loggedin && title && content) {

        db.run("INSERT INTO notes (userid, title, content) VALUES (?,?,?)", [request.session.userid, title, content]);
        return response.send(" ");

    } else {

        return response.render("login", {
            errormessage: "You're not logged in!"
        })

    }
})

// When the user navigates through the menu of their saved notes, this function is ran in order to fetch the data that is stored for that note.
app.get("/get-notes", (request, response) => {

    if (request.session.loggedin) {

        db.all("SELECT * FROM notes WHERE userid = ?", [request.session.userid], (err, rows) => {
            response.send(rows);
        });

    } else {

        return response.render("login", {
            errormessage: "You're not logged in!"
        })

    }
})

// When the user wishes to delete a note, this function is ran and the note data is removed from the database.
app.post("/del-note", (request, response) => {

    var noteid = request.body.noteid;

    if (noteid && request.session.loggedin) {

        db.run("DELETE FROM notes WHERE userid = ? AND noteid = ?", [request.session.userid, noteid]);
        return response.send(" ");

    } else {

        return response.render("login", {
            errormessage: "You're not logged in!"
        })

    }
})

// To edit an already saved note, this function must be ran. It updates the current information for that note in the database.
app.post("/edit-note", (request, response) => {

    var noteid = request.body.noteid;
    var title = request.body.title;
    var content = request.body.content;

    if (request.session.loggedin) {

        db.run("UPDATE notes SET title = ?, content = ? WHERE userid = ? AND noteid = ?;", [title, content, request.session.userid, noteid]);
        return response.send(" ");

    } else {

        return response.render("login", {
            errormessage: "You're not logged in!"
        })

    }
})