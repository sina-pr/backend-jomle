const userModel = require("./model");

const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await userModel.findOne({
      userName,
      password,
    });
    if (user) return res.status(200).send(user._id);
    else {
      return res.status(400).send("Invalid username or password");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const signUpUser = async (req, res) => {
  const { userName, password } = req.body;

  const newUser = new userModel({
    userName,
    password,
  });
  newUser
    .save()
    .then((user) => {
      return res.send(user._id);
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
};
module.exports = { loginUser, signUpUser };
