const hbs = require('hbs');
const path = require('path');

//require('../helpers/misc.helpers.js')(hbs)

hbs.registerPartials(path.join(__dirname, '../views/partials'));
// require('../helpers/user.helpers')(hbs);