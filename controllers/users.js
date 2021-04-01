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
	const { email, password, confirmpassword, firstname, lastname } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			res.status(402).json({ message: 'User Already Exist' });
		}
		if (password !== confirmpassword) {
			res.status(401).json({ message: "Password don't match" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await User.create({ email, password: hashedPassword, name: `${firstname} ${lastname}` });
		const token = jwt.sign({ email: user.email, id: user._id }, 'secrettoken', { expiresIn: '1h' });
		res.status(200).json({ result: user, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'something went wrong' });
	}
};
