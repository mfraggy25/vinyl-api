const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");
const passport = require("passport");
require("./passport");

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

var auth = require("./auth")(app);

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
app.get("/albums", passport.authenticate("jwt", { session: false }), function (
  req,
  res
) {
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
app.get(
  "/albums/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// GET list of all albums from one artist
app.get(
  "/:Artist",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// GET list of data about genres
app.get(
  "/:Genre",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

//GET album by release year
app.get(
  "/:Year",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);
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
  Users.findOne({ Username: req.body.Username })
    .then(function (user) {
      if (user) {
        return res.status(400).send(req.body.Name + " already used!");
      } else {
        Users.create({
          Username: req.body.Username,
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
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndUpdate(
      {
        Username: req.params.Username,
      },
      {
        $set: {
          Username: req.body.Username,
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
  }
);

// Add album to list of already own
app.post(
  "/users/:Username/albums/:albumID",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndUpdate(
      {
        Username: req.params.Username,
      },
      { $push: { OwnList: req.params.albumID } },
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
  }
);

// Delete album from list of already own
app.delete(
  "/users/:Username/albums/:albumID",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { OwnList: req.params.albumID } },
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
  }
);

// Add album to wishlist
app.post(
  "/users/:Username/albums/:albumID",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndUpdate(
      {
        Username: req.params.Username,
      },
      { $push: { WantList: req.params.albumID } },
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
  }
);

// Delete album from wishlist
app.delete(
  "/users/:Username/albums/:albumID",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { WantList: req.params.albumID } },
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
  }
);

// Deregister a user from our list by Username
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndRemove({
      Username: req.params.Username,
    })
      .then(function (user) {
        if (!user) {
          res.status(400).send(req.params.Username + " not found!");
        } else {
          res.status(200).send(req.params.Username + " successfully deleted!");
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.listen(8080, () => {
  //Listen for requests
});
