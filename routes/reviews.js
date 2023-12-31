const express = require('express');
const router = express.Router({mergeParams : true})
const reviews = require('../controllers/reviews')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campgrounds');
const Review = require('../models/review')
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middlewear')



router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router