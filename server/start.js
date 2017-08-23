// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Require app with config
const app = require('./app');

// Set the port
app.set('port', process.env.PORT || 7777);

// Listen on the port
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});