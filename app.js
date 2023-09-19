//REQUIRED PACKAGES AND FILES

const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')
const ExpressError = require('./utils/ExpressError')
const methhodOverride = require('method-override')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')


//ROUTING
const userRoutes = require('./routes/user')
const campgroundsRoutes = require('./routes/campgrounds')
const reviewsRoutes = require('./routes/reviews')

//DATEBASE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser : true
})
.then(() =>{
    console.log('CONNECTION OPEN')
})
.catch(err =>{
    console.log("OH NO!! ERROR!!")
    console.log(err)
})

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.urlencoded({extended : true}))
app.use(methhodOverride('_method'))
app.use(express.static(path.join(__dirname, '/public')))

//  SESSION

const sessionConfig = {
    secret : 'thisshouldbeabettersecret', 
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true,
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7, 
        maxAge : 1000 * 60 * 60 * 24 * 7
    }
}


//APP.USE       

app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
   res.locals.success =  req.flash('success')
   res.locals.error = req.flash('error')
   next()
})

app.use('/', userRoutes)
app.use('/campgrounds', campgroundsRoutes)
app.use('/campgrounds/:id/reviews', reviewsRoutes)


//ROUTES
app.get('/', (req, res) => {
    res.render('home')
})


app.all('*', (req, res, next) =>{
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next ) =>{
    const {statusCode = 500} = err
    if(!err.message) err.message = 'Oh no, something went wrong!'
    res.status(statusCode).render('error', {err})
})


//  LOCAL HOST
app.listen(3000, ()=>{
    console.log("LISTENING ON PORT 3000...")
})