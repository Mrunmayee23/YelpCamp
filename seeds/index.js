const mongoose = require('mongoose')
const cities = require('./cities')
const {descriptors, places} = require('./seedHelpers')
const Campground = require('../models/campgrounds')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {useNewUrlParser : true})
.then(() =>{
    console.log('CONNECTION OPEN')
})
.catch(err =>{
    console.log("OH NO!! ERROR!!")
    console.log(err)
})

const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++)
    {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 40) + 10
        const camp = new Campground({
            author : '6507e410e1091a528aec1281',
            location : `${cities[random1000].city}, ${cities[random1000].state} `, 
            title : `${sample(descriptors)}, ${sample(places)}`,
            description : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad impedit nemo eveniet error corporis. Id, incidunt cumque iure sed praesentium autem architecto delectus aliquid quo laudantium numquam minima blanditiis saepe.', 
            price,
            images :  [
                {
                  url: 'https://res.cloudinary.com/dtfytyvlb/image/upload/v1695537725/YelpCamp/zhvplxmzejdy7at7okwp.jpg',
                  filename: 'YelpCamp/zhvplxmzejdy7at7okwp',
                },
                {
                  url: 'https://res.cloudinary.com/dtfytyvlb/image/upload/v1695537726/YelpCamp/ye0welf2ozc5xiwstesd.jpg',
                  filename: 'YelpCamp/ye0welf2ozc5xiwstesd',
                }
              ]
        })
        await camp.save()
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
})

