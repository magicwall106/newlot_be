const Result = require('../models/Result');
/**
 * GET /result
 * Result Index Page.
 */
exports.getResult = (req, res) => {
  Result.find().exec(function (err, data) {
    if (err) {
      res.render('error', {
        status: 400
      });
    } else {
      res.render('result/index', {
        title: 'Result',
        listResult: data
      });
    }
  });
};

/**
 * GET /result
 * Result Index Page.
 */
exports.getAddResult = (req, res) => {
  res.render('result/add', {
    title: 'Add New Result'
  });
};

/**
 * POST /result
 * API Add single||multiple results.
 */

exports.postApiResult = (req, res, next) => {
  req.assert('code', 'Code is required').notEmpty();
  req.assert('budget', 'Budget is invalid').notEmpty().isInt();
  req.assert('resultDate', 'Result Date is invalid').notEmpty().isDate();
  req.assert('num1', 'Number 1 is invalid').notEmpty().isInt();
  req.assert('num2', 'Number 2 is invalid').notEmpty().isInt();
  req.assert('num3', 'Number 3 is invalid').notEmpty().isInt();
  req.assert('num4', 'Number 4 is invalid').notEmpty().isInt();
  req.assert('num5', 'Number 5 is invalid').notEmpty().isInt();
  req.assert('num6', 'Number 6 is invalid').notEmpty().isInt();
  req.assert('award1', 'Award 1 is invalid').isInt();
  req.assert('award2', 'Award 2 is invalid').isInt();
  req.assert('award3', 'Award 3 is invalid').isInt();
  req.assert('award4', 'Award 4 is invalid').isInt();
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/result/add');
  }

  if (req.user) {
    const result = new Result({
      code: req.body.code,
      budget: req.body.budget,
      resultDate: req.body.resultDate,
      nums: {
        num1: req.body.num1,
        num2: req.body.num2,
        num3: req.body.num3,
        num4: req.body.num4,
        num5: req.body.num5,
        num6: req.body.num6,
      },
      awards: {
        award1: req.body.award1,
        award2: req.body.award2,
        award3: req.body.award3,
        award4: req.body.award4
      }
    });
    //res.jsonp(result);
    result.save((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });

  } else {
    res.render('account/login', {
      title: 'Login',
      message: "Login first! You don't have permission to access this URL!"
    });
  }
};

/**
 * PUT /result
 * Update result.
 */
exports.putApiResult = (req, res, next) => {
  req.assert('id', 'Did not found ID result').notEmpty();
  req.assert('budget', 'Budget is invalid').isInt();
  req.assert('resultDate', 'Result Date is invalid').isDate();
  req.assert('num1', 'Number 1 is invalid').isInt();
  req.assert('num2', 'Number 2 is invalid').isInt();
  req.assert('num3', 'Number 3 is invalid').isInt();
  req.assert('num4', 'Number 4 is invalid').isInt();
  req.assert('num5', 'Number 5 is invalid').isInt();
  req.assert('num6', 'Number 6 is invalid').isInt();
  req.assert('award1', 'Award 1 is invalid').isInt();
  req.assert('award2', 'Award 2 is invalid').isInt();
  req.assert('award3', 'Award 3 is invalid').isInt();
  req.assert('award4', 'Award 4 is invalid').isInt();

  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.status(400).json(errors);
  }
  const id = req.body.id;
  if (req.user && id) {
    Result.update({ _id: id }, {
      $set: {
        resultDate: req.body.resultDate,
        budget: req.body.budget,
        nums: {
          num1: req.body.num1,
          num2: req.body.num2,
          num3: req.body.num3,
          num4: req.body.num4,
          num5: req.body.num5,
          num6: req.body.num6,
        },
        awards: {
          award1: req.body.award1,
          award2: req.body.award2,
          award3: req.body.award3,
          award4: req.body.award4
        }
      }
    }, function (err) {
      if (!err) {
        res.status(200).send('notification!');
      }
      else {
        res.status(400).json(err);
      }
    });
  } else {
    res.render('account/login', {
      title: 'Login',
      message: "Login first! You don't have permission to access this URL!"
    });
  }
};

/**
 * DELETE /result
 * delete result.
 */
exports.deleteApiResult = (req, res, next) => {
  const id = req.params.id;
  if (req.user && id) {
    Result.remove({ _id: id }, function (err) {
      if (!err) {
        res.status(200).send('notification!');
      }
      else {
        res.status(400).json(err);
      }
    });
  } else {
    res.render('account/login', {
      title: 'Login',
      message: "Login first! You don't have permission to access this URL!"
    });
  }
};

/**
 * GET /api/result
 * Result Json: Get all results
 */
exports.getApiResult = (req, res) => {
  const limit = Math.max(1, +req.query.limit || 0);
  const page = Math.max(0, +req.query.page - 1 || 0);
  const sort = { resultDate: 'desc' };
  Result.paginate({}, { offset: limit * page, limit: limit, sort: sort }, function (err, result) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};
