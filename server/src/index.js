// urlapipublic.jlz.fun

const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;
const r = (module.exports.r = require('rethinkdbdash')({ db: 'urlshortener' }));

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/links', require('./routes/links.js'));

app.listen(port, () => console.log('url-shortener-api listening on ' + port));
