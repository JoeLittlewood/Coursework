var sqlite3 = require("sqlite3");
var express = require("express");
var BodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var bcrypt = require("bcrypt");
var expressSession = require("express-session");

var app = express();

app.use(express.static('static'))
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(expressSession({
    secret: 'ohadfhdsgKSXHG38h30dkn',
    resave: false,
    saveUninitialized: false
}))

app.listen(5000);

var db = new sqlite3.Database("notes.sqlite", (err) => {
    if (err) {
        console.log('Error when creating database', err);
    } else {
        db.run("CREATE TABLE IF NOT EXISTS `users`(`userid` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `username` TEXT, `password` TEXT);");
        db.run("CREATE TABLE IF NOT EXISTS `notes`(`noteid` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `userid` INTEGER, `title` TEXT, `content` TEXT);");
    }
});

app.get("/", (request, response) => {
    if (request.session.loggedin) {
        return response.redirect("/notes");
    }
    response.render("login");
})

app.post("/signup", (request, response) => {
    var username = request.body.username;
    var password = request.body.pass;
    var confPass = request.body.confirmPass;

    if (username && password && confPass) {
        if (password != confPass) {
            return response.render("login", { errormessagesignup: "Passwords don't match" })
        }
        return db.all("SELECT * FROM users WHERE username = ?;", [username], function(err, rows) {
            if (err) {
                console.log(err);
            }
            if (rows.length > 0) {
                return response.render("login", { errormessagesignup: "User Exists" })
            }
            password = bcrypt.hashSync(password, 12);
            return db.run("INSERT INTO users (username, password) VALUES (?,?)", [username, password], function(err) {
                if (err) {
                    console.log(err);
                }
                request.session.loggedin = true;
                request.session.username = username;
                request.session.userid = this.lastID;
                return response.redirect("/notes");
            })
        });
    }
})

app.post("/signin", (request, response) => {
    var username = request.body.username;
    var password = request.body.pass;

    if (username && password) {
        return db.all("SELECT * FROM users WHERE username = ?;", [username], function(err, rows) {
            if (err) {
                console.log(err);
            }
            if (rows.length == 1 && bcrypt.compareSync(password, rows[0].password)) {
                request.session.loggedin = true;
                request.session.username = username;
                request.session.userid = rows[0].userid;
                return response.redirect("/notes");
            } else {
                return response.render("login", { errormessage: "Username or password is wrong" })
            }
        })
    }
})

app.get("/notes", (request, response) => {
    if (request.session.loggedin) {
        return response.render("notes", { username: request.session.username });
    } else {
        return response.render("login", { errormessage: "You're not logged in!" })
    }
})

app.get("/logout", (request, response) => {
    request.session.destroy();
    return response.redirect("/");
})

app.post("/new-note", (request, response) => {
    var title = request.body.title;
    var content = request.body.content;
    if (request.session.loggedin && title && content) {
        db.run("INSERT INTO notes (userid, title, content) VALUES (?,?,?)", [request.session.userid, title, content]);
        return response.send(" ");
    } else {
        return response.render("login", { errormessage: "You're not logged in!" })
    }
})

app.get("/get-notes", (request, response) => {
    if (request.session.loggedin) {
        db.all("SELECT * FROM notes WHERE userid = ?", [request.session.userid], (err, rows) => {
            response.send(rows);
        });
    } else {
        return response.render("login", { errormessage: "You're not logged in!" })
    }
})

app.post("/del-note", (request, response) => {
    var noteid = request.body.noteid;
    if (noteid && request.session.loggedin) {
        db.run("DELETE FROM notes WHERE userid = ? AND noteid = ?", [request.session.userid, noteid]);
        return response.send(" ");
    } else {
        return response.render("login", { errormessage: "You're not logged in!" })
    }
})

app.post("/edit-note", (request, response) => {
    var noteid = request.body.noteid;
    var title = request.body.title;
    var content = request.body.content;
    if (request.session.loggedin) {
        db.run("UPDATE notes SET title = ?, content = ? WHERE userid = ? AND noteid = ?;", [title, content, request.session.userid, noteid]);
        return response.send(" ");
    } else {
        return response.render("login", { errormessage: "You're not logged in!" })
    }
})