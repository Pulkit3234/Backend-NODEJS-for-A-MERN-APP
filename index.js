const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postsRoutes = require('./routes/posts');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const helmet = require('helmet');

const app = express();
app.use(helmet());
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/posts', postsRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;
console.log(PORT);

mongoose
	.connect(process.env.CONNECTION_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then((result) => app.listen(PORT, () => console.log('running')))
	.catch((err) => console.log(err));
