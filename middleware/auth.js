const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];

	if (!token) {
		res.status(404).json({ message: 'Token not found' });
	}
	try {
		const decodedData = jwt.verify(token, 'secrettoken');

		if (!decodedData) {
			throw new Error('Not Authenticated');
		}

		req.userId = decodedData.userId;
		next();
	} catch (error) {
		console.log(error);
	}
};
