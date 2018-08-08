const moment = require('moment');

module.exports = (hbs) => {
  hbs.registerHelper('datetime', function() {
    // console.log('DATE', date);
    return moment().to()
  });
}
