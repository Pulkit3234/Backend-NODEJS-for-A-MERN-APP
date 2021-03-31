const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signin = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			res.status(404).json({ message: 'User not found' });
		}

		const correct = await bcrypt.compare(password, existingUser.password);
		if (!correct) {
			res.status(400).json({
				message: 'Login Failed',
			});
		}

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secrettoken', { expiresIn: '1h' });
		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		console.log(error);
	}
};

exports.signup = async (req, res, next) => {
	const { email, password, confirmPassword, firstName, lastName } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			res.status(400).json({ message: 'User Already Exist' });
		}
		if (password !== confirmPassword) {
			res.status(400).json({ message: "Password don't match" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await User.create({ email, password, name: `${firstName} ${lastName}` });
		const token = await jwt.sign({ email: result.email, id: user._id }, 'secrettoken', { expiresIn: '1h' });
		res.status(200).json({ result: user, token });
	} catch (e) {
		res.status(500).json({ message: 'something went wrong' });
	}
};
