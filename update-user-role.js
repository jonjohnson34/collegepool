const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/collegepool')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import User model
const User = require('./models/User');

async function updateUserToAdmin() {
  try {
    const email = 'jr2034@gmail.com';
    
    console.log(`Updating user ${email} to admin role...`);
    
    const user = await User.findOneAndUpdate(
      { email: email },
      { role: 'admin' },
      { new: true }
    );
    
    if (user) {
      console.log('✅ User updated successfully!');
      console.log('Email:', user.email);
      console.log('Username:', user.username);
      console.log('Role:', user.role);
    } else {
      console.log('❌ User not found with email:', email);
    }
    
  } catch (error) {
    console.error('❌ Error updating user:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

// Run the script
updateUserToAdmin(); 