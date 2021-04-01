const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];

	if (!token) {
		res.status(404).json({ message: 'Token not found' });
	} else {
		const decodedDat = jwt.decode(token);
		req.userId = decodedDat.sub;
	}
	try {
		const decodedData = jwt.verify(token, 'secrettoken');

		if (!decodedData) {
			res.send('Not Authenticated');
		}

		console.log(decodedData);
		req.userId = decodedData.id;
		next();
	} catch (error) {
		console.log(error);
	}
};
