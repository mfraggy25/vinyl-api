const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

const Albums = Models.Album;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/vinyl", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
// use morgan logger middleware
app.use(morgan("common"));
// routes all requests for static files to 'public' folder
app.use(express.static("public"));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// ---------------------  GET REQUESTS ---------------------//

// Welcome message
app.get("/", function (req, res) {
  res.send("Album Database");
});
// GET list of data about all albums
app.get("/albums", function (req, res) {
  Albums.find()
    .then(function (albums) {
      res.status(201).json(albums);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET albums by title
app.get("/albums/:Title", (req, res) => {
  Albums.findOne({
    Title: req.params.Title,
  })
    .then(function (album) {
      res.status(201).json(album);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET list of all albums from one artist
app.get("/:Artist", (req, res) => {
  Albums.find({
    Artist: req.params.Artist,
  })
    .then(function (albums) {
      res.status(201).json(albums);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET list of data about genres
app.get("/:Genre", (req, res) => {
  Albums.find({
    Genre: req.params.Genre,
  })
    .then(function (albums) {
      res.status(201).json(albums);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET album by release year
app.get("/:Year", (req, res) => {
  Albums.find({
    Year: req.params.Year,
  })
    .then(function (albums) {
      res.status(201).json(albums);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
// ---------------------- USERS ---------------------------

// Gets the list of data about ALL users

app.get("/users", function (req, res) {
  Users.find()
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Add new user
app.post("/users", function (req, res) {
  Users.findOne({ Name: req.body.Name })
    .then(function (user) {
      if (user) {
        return res.status(400).send(req.body.Name + "already exists");
      } else {
        Users.create({
          Name: req.body.Name,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then(function (user) {
            res.status(201).json(user);
          })
          .catch(function (error) {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Update the user info
app.put("/users/:Name", function (req, res) {
  Users.findOneAndUpdate(
    {
      Name: req.params.Name,
    },
    {
      $set: {
        Name: req.body.Name,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }, // This makes sure the updated document is returned
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Add album to list of already own
app.post("/users/:Name/albums/:AlbumID", function (req, res) {
  Users.findOneAndUpdate(
    {
      Name: req.params.Name,
    },
    { $push: { OwnList: req.params.AlbumID } },
    { new: true }, // This makes sure the updated document is returned
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Delete album from list of already own
app.delete("/users/:name/albums/:AlbumID", function (req, res) {
  Users.findOneAndUpdate(
    { Name: req.params.Name },
    { $pull: { OwnList: req.params.AlbumID } },
    { new: true }, // This line makes sure that the updated document is returned
    (error, updatedUser) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Add album to wishlist
app.post("/users/:Name/albums/:AlbumID", function (req, res) {
  Users.findOneAndUpdate(
    {
      Name: req.params.Name,
    },
    { $push: { WantList: req.params.AlbumID } },
    { new: true }, // This makes sure the updated document is returned
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Delete album from wishlist
app.delete("/users/:name/albums/:AlbumID", function (req, res) {
  Users.findOneAndUpdate(
    { Name: req.params.Name },
    { $pull: { WantList: req.params.AlbumID } },
    { new: true }, // This line makes sure that the updated document is returned
    (error, updatedUser) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Deregister a user from our list by Username
app.delete("/users/:Name", function (req, res) {
  Users.findOneAndRemove({
    Name: req.params.Name,
  })
    .then(function (user) {
      if (!user) {
        res.status(400).send(req.params.Name + " not found!");
      } else {
        res.status(200).send(req.params.Name + " successfully deleted!");
      }
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.listen(8080, () => {
  //Listen for requests
  console.log("My Movies API is running on port 8080.");
});
