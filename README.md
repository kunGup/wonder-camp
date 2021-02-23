# Wonder Camp
> A Node.js web application project from the Udemy course (originally the project was named YelpCamp but I tweaked it a bit and named it WonderCamp) - [The Web Developer Bootcamp by Colt Steele](https://www.udemy.com/the-web-developer-bootcamp/)


## Live Demo

To see the app in action, go to [here](https://wonder-camp.herokuapp.com/)

## Features

* Authentication:
  
  * User login with username and password

  * Admin sign-up with admin code

* Authorization:

  * One cannot manage posts and view user profile without being authenticated

  * One cannot edit or delete posts and comments created by other users

  * Admin can manage all posts and comments

* Manage campground posts with basic functionalities:

  * Create, edit and delete posts and comments

  * Upload campground photos

  * Display campground location on Mapbox

* Flash messages responding to users' interaction with the app

* Responsive web design (still more work to do)
  
## Run it locally

1. Install [mongodb](https://www.mongodb.com/) and in terminal run the following:
   
```
git clone https://github.com/kunbeg/wonder-camp.git
cd wonder-camp
npm install
```
2. Create a cloudinary account to get an API key and secret code

3. Create a mapbox account to get its public access token.
    
4. Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  

```
CLOUD_NAME= <cloud name>
CLOUD_API_KEY= <api key>
CLOUD_SECRET= <api secret>
SECRET= <secret key for session store>
MAPBOX_TOKEN= <mapbox access token>
```

5. Run ```mongod``` in another terminal and ```node app.js``` in the terminal with the project.  

5. (Optional) Run ```node seeds/index``` to seed some dummy data into the website. 
6. Then go to [localhost:3000](http://localhost:3000/).


## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [helmet](https://helmetjs.github.io/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [cloudinary](https://cloudinary.com/)
* [geocoder](https://github.com/wyattdanger/geocoder#geocoder)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [Cloudinary](https://cloudinary.com/)
* [Heroku](https://www.heroku.com/)
* [Mapbox](https://www.mapbox.com/)

  


