const hbs = require('hbs');
const path = require('path');

require('../helpers/hbs.helpers.js')(hbs)

hbs.registerPartials(path.join(__dirname, '../views/partials'));

