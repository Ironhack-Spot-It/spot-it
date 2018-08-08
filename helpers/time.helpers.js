const moment = require('moment');

module.exports = (hbs) => {
  hbs.registerHelper('datetime', function(date) {
    return moment().to(date)
  });
}
