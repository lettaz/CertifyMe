const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const institutionRoutes = require('./routes/institutionRoutes');
const studentRoutes = require('./routes/studentRoutes');
const { sequelize } = require('./models');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes and origins
app.use(cors());

// Alternatively, you can configure CORS for specific origins
app.use(cors({
  origin: 'http://localhost:4200' // Replace with the URL of your frontend application
}));

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/certificates', certificateRoutes);
app.use('/institutions', institutionRoutes);
app.use('/students', studentRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
