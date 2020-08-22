const mongoose = require("mongoose");

var albumSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  Genre: { type: String, required: true },
  Artist: { type: String, required: true },
  ImagePath: String,
});

var userSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  OwnList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Albums" }],
  WantList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Albums" }],
});

var Album = mongoose.model("Album", albumSchema);
var User = mongoose.model("User", userSchema);

module.exports.Album = Album;
module.exports.User = User;
