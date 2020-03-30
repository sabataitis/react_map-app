require('dotenv').config();
const mongoose = require('mongoose');

const connect = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected to mongodb succesfully');
  } catch (error) {
    console.log({
      error,
      message: 'failed to connect to mongodb',
    });
  }
};
module.exports = connect;
