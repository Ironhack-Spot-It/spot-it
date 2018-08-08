const hbs = require('hbs');
const path = require('path');

require('../helpers/time.helpers.js')(hbs)

hbs.registerPartials(path.join(__dirname, '../views/partials'));