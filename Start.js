const app = require('./App.js')
app.listen(process.env.PORT || 5000, () => {
    console.log('App hosted on port');
  });