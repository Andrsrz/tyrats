const bcryptjs = require('bcryptjs')
const User = require('../models/user.js')

/* Find User to LogIn */
exports.post_find_user = (req, res, next) => {
	const username = req.body.username
	const password = req.body.password

	User.findOne({ username }).then(user => {
		if(!user)
			res.status(404).json({ msg: 'User does not exists' }).send()

		bcryptjs.compare(password, user.password, (err, data) => {
			if(err)
				throw err

			if(data)
				res.status(200).json({ msg: 'LogIn Success', user: user }).send()
			else
				res.status(401).json({ msg: 'Invalid Credentials' }).send()
		})
	})
}

/* Create User */
exports.post_create_user = (req, res, next) => {
	bcryptjs.hash(req.body.password, 10, (err, hashedPassword) => {
		if(err)
			res.sendStatus(401)

		/* Success */
		const user = new User({
			username: req.body.username,
			password: hashedPassword
		}).save(err => {
			if(err)
				return next(err)
			/* Success */
			res.sendStatus(201).json(user)
		})
	})
}