const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities100 = require('./cities')
const {descriptors,places} = require('./seedHelpers')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = arr => arr[Math.floor(Math.random()*arr.length)]
const seedDB = async ()=>{
    await Campground.deleteMany({})
    for(let i=0; i<50; i++){
        const rand = Math.floor(Math.random()*100)
        const price = Math.floor(Math.random()*20)+10
        const newCamp = new Campground({
            location:`${cities100[rand].city}, ${cities100[rand].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            img:'https://source.unsplash.com/collection/483251',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await newCamp.save()
    }

}

seedDB().then(()=>{
    mongoose.connection.close()
})