const express = require('express');
const router = (module.exports = express.Router());
const {
  handleJoi,
  getLinkById,
  rateLimit,
  generateLinkId
} = require('../util.js');
const { r } = require('../index.js');
const Joi = require('joi');

const newLinkSchema = Joi.object()
  .required()
  .keys({
    long: Joi.string()
      .uri({
        scheme: ['https', 'http']
      })
      .required(),
    short: Joi.string()
      .alphanum()
      .max(20)
      .min(1)
      .allow(null)
  });

router.use(rateLimit);

router.post('/', async (req, res) => {
  if (!(await handleJoi(newLinkSchema, req, res))) return;
  if (req.body.short && (await getLinkById(req.body.short)))
    return res
      .status(400)
      .json({
        ok: false,
        error: 'LinkCreationError',
        details: ['Short link already exists']
      });
  if (!req.body.short) req.body.short = await generateLinkId();
  const link = {
    id: req.body.short,
    long: req.body.long,
    createdAt: Date.now(),
    totalViews: 0
  };
  await r.table('links').insert(link);
  res.json({ ok: true, link });
});

router.get('/:id', async (req, res) => {
  const link = await getLinkById(req.params.id);
  if (!link)
    return res
      .status(404)
      .json({
        ok: false,
        error: 'LinkRetrievalError',
        details: ['Invalid link id']
      });
  res.json({ ok: true, link });
  await r
    .table('links')
    .get(req.params.id)
    .update({ totalViews: r.row('totalViews').add(1) })
    .run();
});
