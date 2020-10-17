require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const serveStatic = require('serve-static')
const fileUpload = require('express-fileupload')

/* Defining port */
const port = process.env.PORT || 3000

/* Mongo DB */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_TYRAWEB_TEST, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

/* Defining routes */
var userRouter = require('./routes/user')
var breedRouter = require('./routes/breed')
var clientRouter = require('./routes/client')
var petRouter = require('./routes/pet')
var serviceRouter = require('./routes/service')
var dayScheduleRouter = require('./routes/daySchedule')

/* Defining app */
const app = express()

/* Defining middlewares */
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: true }))
app.use(cors())

/* Static Folder */
app.use(serveStatic(__dirname + '../client/dist'))
app.use(express.static('uploads', { etag: false }))

/* Upload Files */
app.use(fileUpload({ createParentPath: true }))

/* Using routes */
app.use(process.env.TYRAWEB_ROUTE_USERS, userRouter)
app.use(process.env.TYRAWEB_ROUTE_BREED, breedRouter)
app.use(process.env.TYRAWEB_ROUTE_CLIENTS, clientRouter)
app.use(process.env.TYRAWEB_ROUTE_PETS, petRouter)
app.use(process.env.TYRAWEB_ROUTE_SERVICES, serviceRouter)
app.use(process.env.TYRAWEB_ROUTE_DAY_SCHEDULES, dayScheduleRouter)

app.listen(port, error => {
	if(error)
		return console.log(error)

	return console.log('Server is listening on ' + port)
})

module.exports = app
