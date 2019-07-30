# Installation instructions

Firstly, make sure node is installed. It can be installed via this link: https://nodejs.org/en/

To check it has installed correctly these following commands can be ran:

```sh
node --version
npm --version
```

Once installed, run

```sh
npm install
```

To run the server run the following command:

```sh
node app
```

If SQLite3 and bcrypt fail to install, run thse following commands:

## Linux

```sh
npm install sqlite3 --save
npm install bcrypt --save
```

## Windows

```sh
npm install --global --production windows-build-tools
npm install bcrypt --save
npm install sqlite3 --save
npm install
node app
```