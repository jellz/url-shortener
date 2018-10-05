const Joi = require('joi');
const { r } = require('./index.js');
const RateLimit = require('express-rate-limit');

exports.handleJoi = (schema, req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error) {
      if (!result.error.isJoi) {
          console.error(`Error while running Joi at ${Date.now()}: ${result.error}`);
          res.sendStatus(500);
          return false;
      }
      res.status(400).json({ ok: false, error: result.error.name, details: result.error.details.map(item => item.message) });
      return false;
  } else return true;
}

exports.shortUrlExists = async (shortUrl) => {
  const link = await r.table('links').get(shortUrl).run();
  if (!link) return false;
  return true;
}

exports.generateLinkId = async () => {
  async function gen(length) {
    id = require('randomstring').generate(length);
    if (await exports.shortUrlExists(id)) return gen(length);
    return id;
  }
  var length = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
  var id = await gen(length);
  return id;
}

exports.rateLimit = new RateLimit({
  windowMs: 2000,
  max: 10,
  delayMs: 0
});