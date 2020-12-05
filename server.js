const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// dotenv config
dotenv.config();

// body parser config
app.use(express.json());

// mongoose configuration
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to DB'))

// routes config
app.use('/api/transactions', require('./routes/api.js'));
app.use('/auth/', require('./routes/auth'));
app.use('/api/users', require('./routes/UserAPI'))

// Heroku Deployment.... Serve static assets if we are in production
if (process.env.NODE_ENV === 'production') {
  // Set a static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



app.listen(process.env.PORT || 8080, () => console.log(`The server is up and running in PORT 3000`))


