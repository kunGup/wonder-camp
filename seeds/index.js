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
    for(let i=0; i<200; i++){
        const rand = Math.floor(Math.random()*100)
        const price = Math.floor(Math.random()*20)+10
        const newCamp = new Campground({
            author :'602a8eb924850a1bd0c59e73',
            location:`${cities100[rand].city}, ${cities100[rand].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities100[rand].longitude,
                    cities100[rand].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                }
            ]
        })
        await newCamp.save()
    }

}

seedDB().then(()=>{
    mongoose.connection.close()
})