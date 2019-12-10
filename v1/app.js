var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// The array is now accessible by all route
var campground = [
    {title: "Trees", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcW-4VCCDvydd9JZmfIoERJiadk6-2kGiDb5o4ys3vVZ3hR4X2&s"},
    {title: "Forest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLcubrLpDuQMBbPsVHEiDiN8R9FlZ7m0wb-N1tv9dXPoEKRN4&s"},
    {title: "UK Park", image: "https://live.staticflickr.com/4567/37514240304_1a744f1fce_z.jpg"},
    {title: "Mount Rainier National Park ", image: "https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false"},
    {title: "Learnx", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c722b7bd7964dc65b_340.jpg"},
    {title: "Natural Beauty", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c722b7bd7964dc65b_340.jpg"}
]

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {campgrounds: campground});
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
})

app.listen(4000, function () {
    console.log("Your Yelpcamp app is listening on port 4000!!!");
    
});