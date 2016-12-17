var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var saveSurveyQuestionsPointer=require('../controllers/createSurvey.js');
var ctrlGetdata=require('../controllers/getdata.js');
var sql=require('../controllers/sql.js');
// Hotel routes
router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll)
  .post(ctrlHotels.hotelsAddOne);


//Save survey questions
router
    .route('/users/surveySave')
    .post(saveSurveyQuestionsPointer.saveSurveyQuestions);


router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelsUpdateOne);


// Review routes
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlUsers.authenticate, ctrlReviews.reviewsAddOne);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlReviews.reviewsUpdateOne);

// Authentication
router
  .route('/users/register')
  .post(ctrlUsers.register);

  router
    .route('/users/login')
    .post(ctrlUsers.login);

  router
      .route('/users/getdata')
      .get(ctrlGetdata.getdata);

  //mysql changes
  router
      .route('/users/postFormResponse')
      .post(sql.postFormData);
 router
     .route('/users/getPreviousSurveys')
     .get(sql.getPreviousSurveys);

 router
     .route('/users/getSurveyResponse')
     .post(sql.getUserResponse);



module.exports = router;
