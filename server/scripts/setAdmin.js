const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(async () => {
  const res = await User.findOneAndUpdate(
    { email: 'baby@example.com' },
    { isAdmin: true },
    { new: true }
  );
  console.log('✅ Admin Set:', res);
  mongoose.disconnect();
});
