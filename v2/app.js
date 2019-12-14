var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });

//SCHEMA SET UP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String, 
   description: String
});

//Compile the Schema into Model 
var Campground = mongoose.model("Campground", campgroundSchema);

//Creating a campground from the backend

// Campground.create({
//    name: "Us Park", 
//    image: "https://live.staticflickr.com/4567/37514240304_1a744f1fce_z.jpg",
//    description: "A Recreation center with exciting and awesome views"
// }, function (err, campground) {
//    if(err){
//       console.log(err)
//    }else{
//       console.log("NEWLY CREATED CAMPGROUND ");
//       console.log(campground)
//    }
// });


app.get("/", function (req, res) {
    res.render("landing");
});

// INDEX Route - show all campground
app.get("/campgrounds", function (req, res) {
   // Get campground from the DB
   Campground.find({}, function (err, allCampgrounds) {
      if (err){
         console.log(err);
      } else{
        res.render("index", {campgrounds: allCampgrounds});
      }
   });
   //res.render("campgrounds", {campgrounds: campground});
});

// Create Route - Add new campground to database 
app.post("/campgrounds", function (req, res) {
    // get data from form and add to campgrounds array
    var nameb = req.body.title;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: nameb, image: image, description: desc};
    //campground.push(newCampground)
    // Create a new campground and save to database
    Campground.create(newCampground, function (err, newCamp) {
       if (err){
          console.log(err);
       } else {
            // redirect back to campground page
            res.redirect("/campgrounds");
       }
    })
    
});

//NEW Route - Show form to add new campground
app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

//SHOW Route - Show more info about one campground
app.get("/campgrounds/:id", function (req, res) {
   //Find the campground with provide ID
   Campground.findById(req.params.id, function (err, reqCampground) {
      if (err){
         console.log(err)
      } else{
         //Render the show template 
         res.render("show", {camp: reqCampground});
      }
   });

});

//DELETE Route - Show form to remove campground from database
app.get("/campgrounds/delete", function (req, res) {
   res.render("delete");
});

app.get("*", function (req, res) {
    res.send("The site cannot be reached check the url and try again!!!")
});

app.listen(3000, function () {
   console.log("Your yelpcamp App is listening on the 3000 Server");
});