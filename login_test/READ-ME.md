# Setup

```
npm init -y

npm install express --save // Framework
npm install body-parser --save // Allows us to handle request bodies with Express
npm install mongodb --save // database driver

node app.js

Create new entry:
curl -X Pn/json' -d '{"username":"<username>","password":"<password>"}' http://localhost:5000/person

All users:
curl -X GET http://localhost:3000/people

One user by ID:
curl -X GET http://localhost:3000/person/<id>

https://programmingmentor.com/post/save-form-nodejs-mongodb/

```