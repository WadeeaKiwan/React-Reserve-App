import User from "../../models/User";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

import { IUser } from "../../models/User";

// Ensure that the database is connected while posting a request
connectDb();

export default async (req: any, res: any): Promise<void> => {
  try {
    const { userId }: { userId: string } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const users: IUser[] = await User.find({ _id: { $ne: userId } }).sort({ role: "asc" }); // same as sort({ role: 1 })

    res.status(200).json(users);
  } catch (error) {
    res.status(403).send("Please login again");
  }
};
