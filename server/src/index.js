// api.jlz.fun

const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;
const r = module.exports.r = require('rethinkdbdash')({ db: 'jlzfun' });

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(cors({ origin: 'https://jlz.fun' }));

app.use('/api/links', require('./routes/links.js'));

app.listen(port, () => console.log('jlz.fun-api listening on ' + port));