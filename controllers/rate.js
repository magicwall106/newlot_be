const Rate = require('../models/Rate');

const queryRateField = '-_id result rates createdAt';

/**
 * GET /api/rate
 * Rate Json: Get all rates
 */
exports.getApiRate = (req, res) => {
  const limit = Math.max(1, +req.query.limit || 0);
  const page = Math.max(0, +req.query.page - 1 || 0);
  const sort = { createdAt: 'desc' };
  Rate.paginate({}, { offset: limit * page, limit: limit, sort: sort, select: queryRateField }, function (err, rate) {
    if (err) { return res.status(400).json(err); }
    return res.status(200).json(rate);
  });
};

/**
 * POST /api/rate
 * API Add single||multiple rates.
 */
exports.postApiRate = (req, res, next) => {
  req.assert('result', 'Result is required').notEmpty();
  req.assert('rates', 'Rates is not an Array').isArray();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(401).json(errors);
  }
  if (req.user) {
    const rate = new Rate({
      result: req.body.result,
      rates: req.body.rates
    });

    rate.save((err) => {
      if (err) { return res.status(400).json(err); }
      return res.status(200).send('saved');
    });
  } else {
    res.status(400).json({
      title: 'Login',
      msg: "Login first! You don't have permission to access this URL!"
    });
  }
};

/**
 * PUT /api/rate
 * Update rate.
 */
exports.putApiRate = (req, res, next) => {
  req.assert('result', 'Result is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(401).json(errors);
  }
  const id = req.body.id;
  if (req.user && id) {
    Rate.update({ _id: id }, {
      $set: {
        result: req.body.result,
        rates: req.body.rates
      }
    }, function (err) {
      if (err) { return res.status(400).json(err); }
      return res.status(200).send('updated!');
    });
  } else {
    res.status(400).json({
      title: 'Login',
      msg: "Login first! You don't have permission to access this URL!"
    });
  }
};

/**
 * DELETE /api/rate
 * delete rate.
 */
exports.deleteApiRate = (req, res, next) => {
  const id = req.params.id;
  if (req.user && id) {
    Rate.remove({ _id: id }, function (err) {
      if (err) { return res.status(400).json(err); }
      return res.status(200).send('deleted!');
    });
  } else {
    res.status(400).json({
      title: 'Login',
      msg: "Login first! You don't have permission to access this URL!"
    });
  }
};