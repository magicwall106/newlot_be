const async = require('async');
const nodemailer = require('nodemailer');
const Recommendation = require('../models/Recommendation');

/**
 * GET /recommendation
 * Recommendation Index Page.
 */
exports.getRecommendation = (req, res) => {
  Recommendation.find({},function(err,data){
      if (err) {
        res.render('error', {
            status: 500
        });
      } else {
        res.render('recommendation/index', {
          title: 'Recommendation',
          listRecommendation: data
        });
      }
  });
};

/**
 * GET /recommendation/add
 * Recommendation Add recommendation Page.
 */
exports.getAddRecommendation = (req, res) => {
  res.render('recommendation/add', {
    title: 'Add New Recommendation'
  });
};


/**
 * GET /api/recommendation
 * Recommendation Json: Get all recommendations
 */
exports.getApiRecommendation = (req, res) => {
  Recommendation.find({},function(err,data){
      if (err) {
        res.render('error', {
            status: 500
        });
      } else {
        res.jsonp(data);
      }
  });
};

/**
 * POST /recommendation
 * Add single||multiple recommendation.
 */

exports.postApiRecommendation = (req, res, next) => {
  req.assert('user', 'User is required').notEmpty();
  req.assert('condition', 'Condition is required').notEmpty();
  req.assert('num1', 'Number 1 is invalid').notEmpty().isInt();
  req.assert('rate1', 'Rating of Number 1 is invalid').isInt();
  req.assert('num2', 'Number 2 is invalid').notEmpty().isInt();
  req.assert('rate2', 'Rating of Number 2 is invalid').isInt();
  req.assert('num3', 'Number 3 is invalid').notEmpty().isInt();
  req.assert('rate3', 'Rating of Number 3 is invalid').isInt();
  req.assert('num4', 'Number 4 is invalid').notEmpty().isInt();
  req.assert('rate4', 'Rating of Number 4 is invalid').isInt();
  req.assert('num5', 'Number 5 is invalid').notEmpty().isInt();
  req.assert('rate5', 'Rating of Number 5 is invalid').isInt();
  req.assert('num6', 'Number 6 is invalid').notEmpty().isInt();
  req.assert('rate6', 'Rating of Number 6 is invalid').isInt();
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/recommendation/add');
  }

  if(req.user){
    const recommendation = new Recommendation({
      user: req.body.user,
      condition: req.body.condition,
      nums: {
        num1: {
          value: req.body.num1,
          rate: req.body.rate1
        },
        num2: {
          value: req.body.num2,
          rate: req.body.rate2
        },
        num3: {
          value: req.body.num3,
          rate: req.body.rate3
        },
        num4: {
          value: req.body.num4,
          rate: req.body.rate4
        },
        num5: {
          value: req.body.num5,
          rate: req.body.rate5
        },
        num6: {
          value: req.body.num6,
          rate: req.body.rate6
        }
      }
    });
    recommendation.save((err) => {
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
 * PUT /recommendation
 * Update Recommendation.
 */
exports.putApiRecommendation = (req, res, next) => {
  req.assert('condition', 'Condition is required').notEmpty();
  req.assert('num1', 'Number 1 is invalid').notEmpty().isInt();
  req.assert('rate1', 'Rating of Number 1 is invalid').isInt();
  req.assert('num2', 'Number 2 is invalid').notEmpty().isInt();
  req.assert('rate2', 'Rating of Number 2 is invalid').isInt();
  req.assert('num3', 'Number 3 is invalid').notEmpty().isInt();
  req.assert('rate3', 'Rating of Number 3 is invalid').isInt();
  req.assert('num4', 'Number 4 is invalid').notEmpty().isInt();
  req.assert('rate4', 'Rating of Number 4 is invalid').isInt();
  req.assert('num5', 'Number 5 is invalid').notEmpty().isInt();
  req.assert('rate5', 'Rating of Number 5 is invalid').isInt();
  req.assert('num6', 'Number 6 is invalid').notEmpty().isInt();
  req.assert('rate6', 'Rating of Number 6 is invalid').isInt();

  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.send(JSON.stringify(errors));
  }
  const id = req.body.id;
  if(req.user && id){
    Recommendation.update({_id: id}, {$set: {
      condition: req.body.condition,
      nums: {
        num1: {
          value: req.body.num1,
          rate: req.body.rate1
        },
        num2: {
          value: req.body.num2,
          rate: req.body.rate2
        },
        num3: {
          value: req.body.num3,
          rate: req.body.rate3
        },
        num4: {
          value: req.body.num4,
          rate: req.body.rate4
        },
        num5: {
          value: req.body.num5,
          rate: req.body.rate5
        },
        num6: {
          value: req.body.num6,
          rate: req.body.rate6
        }
      }
    }}, function(err) {
        if (!err) {
          res.send('notification!');
        }
        else {
          res.send(err);
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
 * DELETE /recommendation
 * delete recommendation.
 */
exports.deleteApiRecommendation = (req, res, next) => {
  const id = req.params.id;
  if(req.user && id){
    Recommendation.remove({ _id: id }, function(err) {
      if (!err) {
        res.send('notification!');
      }
      else {
        res.send(err);
      }
    });
    //res.send("asdasdas");
  } else {
    res.render('account/login', {
      title: 'Login',
      message: "Login first! You don't have permission to access this URL!"
    });
  }
};