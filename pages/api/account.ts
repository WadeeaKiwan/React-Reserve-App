import User from "../../models/User";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

import { IUser } from "../../models/User";

// Ensure that the database is connected while posting a request
connectDb();

export default async (req: any, res: any): Promise<void> => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetRequest = async (req: any, res: any): Promise<void> => {
  // !req.headers.authorization
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId }: { userId: string } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const user: IUser = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};

const handlePutRequest = async (req: any, res: any): Promise<void> => {
  const { _id, role }: { _id: string; role: string } = req.body;
  try {
    await User.findOneAndUpdate({ _id }, { role });

    res.status(203).send("User Updated");
  } catch (error) {
    res.status(403).send("Error updating user's role");
  }
};
