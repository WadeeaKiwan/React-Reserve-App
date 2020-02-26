import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Ensure that the database is connected while posting a request
connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1) Check if the user exists with the provided email
    const user = await User.findOne({ email }).select("+password");

    // 2) --if not, return an error
    if (!user) {
      return res.status(404).send("No user exists with that email");
    }

    // 3) Check to see if the user's password matches the one in db
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).send("Password do not match!");
    }

    // 4) -- if so, generate a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // 5) Send the token to the client
    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user!");
  }
};
