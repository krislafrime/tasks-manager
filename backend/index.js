const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/usersRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())

app.use('/api/users',usersRoutes);
app.use('/api/tasks',tasksRoutes)

mongoose.connect('mongodb://localhost:27017/manage_tasks',)
.then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  });