const moment = require('moment');

module.exports = (hbs) => {
  hbs.registerHelper('datetime', function(date) {
    return moment().to(date)
  });

  hbs.registerHelper('isMyMessage', function(msg, user, options){
    if(msg.from === user.name){
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })

  hbs.registerHelper('noMyMessage', function(msg, user, options){
    if(msg.from !== user.name){
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
}
