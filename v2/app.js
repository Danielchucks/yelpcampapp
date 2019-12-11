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
   image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//    name: "Us Park", 
//    image: "https://live.staticflickr.com/4567/37514240304_1a744f1fce_z.jpg"
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

app.get("/campgrounds", function (req, res) {
   // Get campground from the DB
   Campground.find({}, function (err, allCampgrounds) {
      if (err){
         console.log(err)
      } else{
        res.render("campgrounds", {campgrounds: allCampgrounds})
      }
   });
   //res.render("campgrounds", {campgrounds: campground});
});

app.post("/campgrounds", function (req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.title;
    var image = req.body.image;
    var newCampground = {title: name, image: image};
    campground.push(newCampground)
    // redirect back to campground page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new")
});

app.get("*", function (req, res) {
    res.send("The site cannot be reached check the url and try again!!!")
});


app.listen(3000, function () {
   console.log("Your yelpcamp App is listening on the 3000 Server");
});