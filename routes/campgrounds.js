const express = require('express');
const router = express.Router()
const campgrounds = require('../controllers/campgrounds')
const {campgroundSchema} = require('../schemas')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campgrounds');
const {isLoggedIn, validateCampground, isAuthor} = require('../middlewear')
const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage})

router.route('/')
    .get(catchAsync (campgrounds.index))
    // .post(isLoggedIn, validateCampground, catchAsync (campgrounds.createCampground))
    .post(upload.array('image'), (req, res) =>{
        console.log(req.body)
    })

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync (campgrounds.renderEdit))


module.exports = router