const express = require('express');
const router = express.Router()
const campgrounds = require('../controllers/campgrounds')
const {campgroundSchema} = require('../schemas')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campgrounds');
const {isLoggedIn, validateCampground, isAuthor} = require('../middlewear')


router.get('/', catchAsync (campgrounds.index))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.post('/', isLoggedIn, validateCampground, catchAsync (campgrounds.createCampground))

router.get('/:id', catchAsync(campgrounds.showCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync (campgrounds.renderEdit))

router.put('/:id',isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))

router.delete('/:id', isLoggedIn, catchAsync(campgrounds.deleteCampground))

module.exports = router