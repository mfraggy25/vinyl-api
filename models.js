const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var albumSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  Genre: { type: String, required: true },
  Artist: { type: String, required: true },
  ImagePath: String,
});

var userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  OwnList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Albums" }],
  WantList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Albums" }],
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

var Album = mongoose.model("Album", albumSchema);
var User = mongoose.model("User", userSchema);

module.exports.Album = Album;
module.exports.User = User;
